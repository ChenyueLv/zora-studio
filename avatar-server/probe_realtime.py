"""Probe the configured provider without logging credentials or audio payloads."""
import asyncio
import base64
import json
import os
import time
import wave
from pathlib import Path
from urllib.parse import urlencode
import aiohttp

def read_env(path):
    for line in Path(path).read_text().splitlines():
        if '=' in line and not line.startswith('#'):
            key,value=line.split('=',1);os.environ.setdefault(key,value)

async def main():
    import argparse
    parser=argparse.ArgumentParser();parser.add_argument('--env',default='.env');parser.add_argument('--audio');args=parser.parse_args()
    read_env(args.env)
    url=os.environ['ALIYUN_REALTIME_URL']+'?'+urlencode({'model':os.environ['ALIYUN_MODEL']})
    start=time.monotonic()
    async with aiohttp.ClientSession() as session:
        try:
            ws=await session.ws_connect(url,headers={'Authorization':'Bearer '+os.environ['DASHSCOPE_API_KEY']},heartbeat=20,timeout=aiohttp.ClientWSTimeout(ws_receive=30),compress=0)
        except aiohttp.WSServerHandshakeError as exc:
            print(json.dumps({'handshake_status':exc.status,'message':str(exc.message)}));return
        async with ws:
            print(json.dumps({'connected_ms':round((time.monotonic()-start)*1000),'model':os.environ['ALIYUN_MODEL']}))
            await ws.send_json({'type':'session.update','session':{'modalities':['text','audio'],'voice':os.environ.get('ALIYUN_VOICE','longanqian'),'instructions':'请用简体中文简短回答，通常一到两句。','input_audio_format':'pcm','output_audio_format':'pcm','turn_detection':None,'enable_search':False,'max_history_turns':10}})
            async for msg in ws:
                if msg.type!=aiohttp.WSMsgType.TEXT:break
                event=json.loads(msg.data);kind=event.get('type')
                if kind=='error':print(json.dumps({'event':kind,'error':event.get('error')},ensure_ascii=False));return
                if kind=='session.updated':
                    print(json.dumps({'event':kind,'ready_ms':round((time.monotonic()-start)*1000)}))
                    if not args.audio:return
                    break
            with wave.open(args.audio,'rb') as sound:
                assert sound.getframerate()==16000 and sound.getnchannels()==1 and sound.getsampwidth()==2
                pcm=sound.readframes(sound.getnframes())
            await ws.send_json({'type':'input_audio_buffer.clear'})
            for i in range(0,len(pcm),1280):
                await ws.send_json({'type':'input_audio_buffer.append','audio':base64.b64encode(pcm[i:i+1280]).decode()})
                await asyncio.sleep(.04)
            await ws.send_json({'type':'input_audio_buffer.commit'})
            await ws.send_json({'type':'response.create'})
            committed=time.monotonic(); first_audio=False; audio_bytes=0
            async for msg in ws:
                if msg.type!=aiohttp.WSMsgType.TEXT:break
                event=json.loads(msg.data);kind=event.get('type')
                if kind=='response.audio.delta':
                    audio_bytes+=len(base64.b64decode(event['delta']))
                    if not first_audio:
                        first_audio=True;print(json.dumps({'first_audio_ms':round((time.monotonic()-committed)*1000)}))
                elif kind in ('conversation.item.input_audio_transcription.completed','response.audio_transcript.done'):
                    print(json.dumps({'event':kind,'text':event.get('transcript')},ensure_ascii=False))
                elif kind=='response.done':
                    print(json.dumps({'event':kind,'status':event.get('response',{}).get('status'),'audio_bytes':audio_bytes}));break
                elif kind=='error':print(json.dumps({'event':kind,'error':event.get('error')},ensure_ascii=False));break

if __name__=='__main__':asyncio.run(main())
