"""小Z 数字人的实时语音中继：浏览器只连本服务，阿里云密钥只留在服务端。"""
from __future__ import annotations

import asyncio
import base64
from collections import Counter, deque
import contextlib
import json
import logging
import os
from pathlib import Path
import re
import time
from urllib.parse import urlencode
import uuid

import aiohttp
from aiohttp import web

ROOT = Path(__file__).resolve().parent
LOG = logging.getLogger('avatar')
MODEL = os.getenv('ALIYUN_MODEL', 'qwen-audio-3.0-realtime-flash')
VOICE = os.getenv('ALIYUN_VOICE', 'longanqian')
UPSTREAM = os.getenv('ALIYUN_REALTIME_URL', 'wss://dashscope.aliyuncs.com/api-ws/v1/realtime')
KEY = os.getenv('DASHSCOPE_API_KEY', '')
ORIGINS = set(os.getenv('ALLOWED_ORIGINS', 'https://zoratv.cn,https://www.zoratv.cn,http://localhost:5173,http://127.0.0.1:5173').split(','))
PERSONA = (
    '你是「小Z」，Zora Studio「AI 应用实战课」网站上的课程助手数字人，专门回答访客关于这门课的问题。'
    '这门课是国庆假期期间、为期三天的 AI 全方位零基础培训。'
    '只根据下面的课程知识库回答；知识库没有的信息（例如具体日期、地点、价格、报名方式、优惠、名额）不要编造，'
    '如实说目前待公布，建议先看课程大纲、留意页面后续通知。'
    '和课程无关的问题，可以简短友好地回应一句，再把话题带回课程。'
    '回答用简体中文，口语化、亲切、自信，像面对面聊天；通常两三句、八十字以内，直接回答，不加开场白，不复述问题，'
    '不用 Markdown、列表符号或表情。用户要求详细说明时再展开。不声称看到了摄像头、屏幕或你没收到的内容。'
)
KNOWLEDGE = (ROOT / 'knowledge.md').read_text(encoding='utf-8')
INSTRUCTIONS = PERSONA + '\n\n' + KNOWLEDGE
MAX_TEXT = 300
TURN_ID = re.compile(r'^[A-Za-z0-9_-]{1,80}$')
connections: Counter = Counter()


class Relay:
    def __init__(self, browser, provider):
        self.browser, self.provider = browser, provider
        self.current_turn = None
        self.recording = False
        self.bytes_received = 0
        self.turn_started = 0.0
        self.last_activity = time.monotonic()
        self.commit_queue = deque()
        self.item_turn = {}
        self.unbound_transcripts = {}
        self.response_turn = {}
        self.request_turn = None
        self.response_id = None
        self.cancel_requested = False
        self.finished = asyncio.Event()
        self.finished.set()
        self.ready = False
        self.cancelled = set()
        self.audio_started = set()
        self.text_sent = {}
        self.request_lock = asyncio.Lock()
        self.send_lock = asyncio.Lock()
        self.tasks = set()
        self.commit_at = {}

    async def up(self, kind, **fields):
        async with self.send_lock:
            await self.provider.send_json({'event_id': uuid.uuid4().hex, 'type': kind, **fields})

    async def down(self, kind, **fields):
        if not self.browser.closed:
            await self.browser.send_json({'type': kind, **fields})

    async def fail(self, message, retryable=True):
        await self.down('error', message=message, retryable=retryable)

    async def configure(self):
        await self.up('session.update', session={
            'modalities': ['text', 'audio'], 'voice': VOICE,
            'instructions': INSTRUCTIONS,
            'input_audio_format': 'pcm', 'output_audio_format': 'pcm',
            'turn_detection': None, 'enable_search': False, 'max_history_turns': 10,
        })

    async def cancel_response(self):
        if self.response_id:
            self.cancelled.add(self.response_id)
        if not self.finished.is_set() and not self.cancel_requested:
            self.cancel_requested = True
            await self.up('response.cancel')

    def spawn(self, coroutine):
        task = asyncio.create_task(coroutine)
        self.tasks.add(task)
        task.add_done_callback(self.tasks.discard)

    async def request_response(self, turn):
        try:
            async with self.request_lock:
                # A quick second press must not race the old cancellation ack.
                await asyncio.wait_for(self.finished.wait(), 8)
                if turn != self.current_turn or self.recording:
                    return
                self.request_turn = turn
                self.response_id = None
                self.cancel_requested = False
                self.finished.clear()
                await self.up('response.create')
        except asyncio.TimeoutError:
            await self.fail('连接响应超时，请再按住说一次。')
            await self.provider.close()
        except (ConnectionError, aiohttp.ClientError):
            await self.fail('连接已断开，请再试一次。')

    async def transcript(self, event):
        item_id = event.get('item_id')
        turn = self.item_turn.get(item_id)
        if not turn:
            # Never guess the current turn: a cancelled recording's late first
            # ASR event could otherwise be shown as the next user's sentence.
            if item_id:
                bucket = self.unbound_transcripts.setdefault(item_id, [])
                bucket.append(event)
                del bucket[:-8]
                if len(self.unbound_transcripts) > 32:
                    self.unbound_transcripts.pop(next(iter(self.unbound_transcripts)))
            return
        kind = event.get('type', '')
        if kind.endswith('.completed'):
            await self.down('user.transcript', turn_id=turn, text=event.get('transcript', ''), final=True)
        elif kind.endswith('.delta'):
            await self.down('user.transcript', turn_id=turn,
                            text=event.get('text', '') + event.get('stash', ''), final=False)
        elif kind.endswith('.failed'):
            await self.down('user.transcript', turn_id=turn, text='（未听清）', final=True)

    async def client(self):
        async for message in self.browser:
            if message.type == aiohttp.WSMsgType.BINARY:
                if not self.ready or not self.recording:
                    continue
                data = message.data
                if len(data) % 2 or len(data) > 16000:
                    await self.fail('音频格式异常，请刷新后重试。', False)
                    continue
                self.bytes_received += len(data)
                self.last_activity = time.monotonic()
                if self.bytes_received > 16000 * 2 * 60:
                    self.recording = False
                    await self.up('input_audio_buffer.clear')
                    await self.fail('这一段较长，请松开后分段说。')
                    continue
                await self.up('input_audio_buffer.append', audio=base64.b64encode(data).decode('ascii'))
            elif message.type == aiohttp.WSMsgType.TEXT:
                try:
                    event = json.loads(message.data)
                    if not isinstance(event, dict):
                        continue
                except (ValueError, TypeError):
                    continue
                kind, turn = event.get('type'), event.get('turn_id')
                if kind == 'ping':
                    await self.down('pong')
                    continue
                if not self.ready:
                    await self.fail('连接尚未就绪，请稍后再试。')
                    continue
                if not isinstance(turn, str) or not TURN_ID.fullmatch(turn):
                    continue
                self.last_activity = time.monotonic()
                if kind == 'start':
                    self.current_turn = turn
                    self.recording = True
                    self.bytes_received = 0
                    self.turn_started = time.monotonic()
                    await self.cancel_response()
                    await self.up('input_audio_buffer.clear')
                    await self.down('turn.started', turn_id=turn)
                elif kind == 'commit' and turn == self.current_turn and self.recording:
                    self.recording = False
                    if self.bytes_received < 3200:  # Avoid provider errors on <100ms taps.
                        await self.up('input_audio_buffer.clear')
                        await self.down('turn.empty', turn_id=turn)
                        continue
                    self.commit_queue.append(turn)
                    self.commit_at[turn] = time.monotonic()
                    await self.up('input_audio_buffer.commit')
                    self.spawn(self.request_response(turn))
                elif kind == 'text':
                    text = event.get('text')
                    if not isinstance(text, str) or not text.strip():
                        continue
                    self.current_turn = turn
                    self.recording = False
                    self.commit_at[turn] = time.monotonic()
                    await self.cancel_response()
                    await self.up('input_audio_buffer.clear')
                    await self.up('conversation.item.create', item={
                        'type': 'message', 'role': 'user',
                        'content': [{'type': 'input_text', 'text': text.strip()[:MAX_TEXT]}],
                    })
                    await self.down('turn.started', turn_id=turn)
                    self.spawn(self.request_response(turn))
                elif kind == 'cancel' and turn == self.current_turn:
                    self.recording = False
                    self.current_turn = None
                    await self.cancel_response()
                    await self.up('input_audio_buffer.clear')
                    await self.down('turn.cancelled', turn_id=turn)
            elif message.type in (aiohttp.WSMsgType.CLOSE, aiohttp.WSMsgType.ERROR):
                break

    async def events(self):
        async for message in self.provider:
            if message.type != aiohttp.WSMsgType.TEXT:
                if message.type in (aiohttp.WSMsgType.CLOSE, aiohttp.WSMsgType.ERROR):
                    break
                continue
            event = json.loads(message.data)
            kind = event.get('type', '')
            if kind == 'session.updated':
                if not self.ready:
                    self.ready = True
                    await self.down('ready', input_sample_rate=16000, output_sample_rate=24000)
            elif kind == 'input_audio_buffer.committed':
                if self.commit_queue:
                    item_id = event.get('item_id')
                    self.item_turn[item_id] = self.commit_queue.popleft()
                    for pending in self.unbound_transcripts.pop(item_id, []):
                        await self.transcript(pending)
            elif kind.startswith('conversation.item.input_audio_transcription.'):
                await self.transcript(event)
            elif kind == 'response.created':
                rid = event['response']['id']
                self.response_id = rid
                self.response_turn[rid] = self.request_turn
                if self.request_turn != self.current_turn:
                    self.cancelled.add(rid)
                    await self.cancel_response()
            elif kind == 'response.done':
                response = event.get('response', {})
                rid = response.get('id', self.response_id)
                self.finished.set()
                turn = self.response_turn.get(rid)
                if rid not in self.cancelled and turn == self.current_turn:
                    if response.get('status') == 'failed':
                        await self.fail('这次回复未完成，请再试一次。')
                    await self.down('assistant.done', turn_id=turn, response_id=rid)
                # Maps are session-local and bounded; no audio/transcript logs.
                if len(self.response_turn) > 60:
                    old = next(iter(self.response_turn))
                    self.response_turn.pop(old, None)
                    self.text_sent.pop(old, None)
                    self.cancelled.discard(old)
                    self.audio_started.discard(old)
            elif kind in ('response.audio.delta', 'response.audio_transcript.delta',
                          'response.audio_transcript.done', 'response.text.delta'):
                rid = event.get('response_id', self.response_id)
                turn = self.response_turn.get(rid)
                if not turn or turn != self.current_turn or rid in self.cancelled or self.recording:
                    continue
                if kind == 'response.audio.delta':
                    if rid not in self.audio_started:
                        self.audio_started.add(rid)
                        await self.down('audio.start', turn_id=turn, response_id=rid,
                                        item_id=event.get('item_id'), sample_rate=24000)
                        elapsed = (time.monotonic() - self.commit_at.get(turn, time.monotonic())) * 1000
                        LOG.info('first_audio_ms=%d', elapsed)
                    await self.browser.send_bytes(base64.b64decode(event['delta']))
                elif kind.endswith('transcript.done'):
                    text = event.get('transcript', '')
                    sent = self.text_sent.get(rid, '')
                    if text.startswith(sent) and len(text) > len(sent):
                        await self.down('assistant.delta', turn_id=turn, response_id=rid, text=text[len(sent):])
                        self.text_sent[rid] = text
                else:
                    text = event.get('delta', '')
                    self.text_sent[rid] = self.text_sent.get(rid, '') + text
                    await self.down('assistant.delta', turn_id=turn, response_id=rid, text=text)
            elif kind == 'error':
                error = event.get('error', {})
                code = str(error.get('code', error.get('type', 'unknown')))[:120]
                LOG.warning('upstream_event_error code=%s', code)
                # A cancellation can arrive just after generation naturally ends.
                description = str(error.get('message', '')).lower()
                if 'cancel' in description and ('no ' in description or 'not ' in description):
                    continue
                await self.fail('语音服务暂时不可用，请稍后重试。')
                # Reconnect after unexpected protocol/provider errors instead of
                # leaving a half-open response gate and wedging the next turn.
                await self.provider.close()
                break

    async def watchdog(self):
        start = time.monotonic()
        while not self.browser.closed:
            await asyncio.sleep(10)
            now = time.monotonic()
            if now - self.last_activity > 180 or now - start > 1800:
                await self.browser.close(code=1000, message=b'idle')
                break

    async def run(self):
        await self.configure()
        workers = [asyncio.create_task(self.client()), asyncio.create_task(self.events()),
                   asyncio.create_task(self.watchdog())]
        try:
            done, _ = await asyncio.wait(workers, return_when=asyncio.FIRST_COMPLETED)
            for task in done:
                task.result()
        finally:
            for task in workers + list(self.tasks):
                task.cancel()
            await asyncio.gather(*workers, *list(self.tasks), return_exceptions=True)
            await self.provider.close()
            await self.browser.close()


async def websocket(request):
    if request.headers.get('Origin', '') not in ORIGINS:
        raise web.HTTPForbidden(text='Origin not allowed')
    ip = request.headers.get('X-Real-IP', request.remote or '')
    if sum(connections.values()) >= 24 or connections[ip] >= 3:
        raise web.HTTPTooManyRequests(text='Please retry shortly')
    connections[ip] += 1
    browser = web.WebSocketResponse(heartbeat=25, max_msg_size=32768, compress=False)
    try:
        await browser.prepare(request)
        url = UPSTREAM + '?' + urlencode({'model': MODEL})
        provider = await request.app['http'].ws_connect(
            url, headers={'Authorization': 'Bearer ' + KEY},
            heartbeat=20, compress=0,
            timeout=aiohttp.ClientWSTimeout(ws_receive=210, ws_close=3),
        )
        await Relay(browser, provider).run()
    except (aiohttp.ClientError, asyncio.TimeoutError) as exc:
        LOG.warning('connection_failure type=%s', type(exc).__name__)
        if browser.prepared and not browser.closed:
            await browser.send_json({'type': 'error', 'message': '语音连接失败，请再按住重试。', 'retryable': True})
    except (ConnectionError, RuntimeError, ValueError) as exc:
        LOG.warning('relay_failure type=%s', type(exc).__name__)
    finally:
        connections[ip] -= 1
        if connections[ip] <= 0:
            connections.pop(ip, None)
        await browser.close()
    return browser


async def http_lifecycle(app):
    app['http'] = aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=None, connect=12))
    yield
    await app['http'].close()


def create_app():
    app = web.Application(client_max_size=32768)
    app.cleanup_ctx.append(http_lifecycle)
    async def health(request):
        return web.json_response({'status': 'ok', 'model': MODEL})
    app.router.add_get('/api/avatar/health', health)
    app.router.add_get('/api/avatar/ws', websocket)
    return app


if __name__ == '__main__':
    if not KEY:
        raise SystemExit('DASHSCOPE_API_KEY is required')
    logging.basicConfig(level=logging.INFO, format='%(asctime)s %(name)s %(levelname)s %(message)s')
    web.run_app(create_app(), host='127.0.0.1', port=int(os.getenv('PORT', '17866')), access_log=None)
