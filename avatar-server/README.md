# 小Z 数字人语音服务

课程页「师资团队」里的数字人小Z：访客打字或按住麦克风提问，服务把问题转给阿里云百炼实时语音模型，流式返回文字和语音。回答只依据 `knowledge.md`（与 zoratv.cn 课程页内容一致），**改了课程页内容时记得同步改它**，然后重启服务。

## 链路

- 模型：`qwen-audio-3.0-realtime-flash`，音色 `longanqian`，北京节点（专属 MaaS 域名）。
- 浏览器只连本站 `wss://zoratv.cn/api/avatar/ws`，阿里密钥只在服务端 env 文件里，不进仓库、不进前端。
- 文字问题：`conversation.item.create` 文本输入；语音：16 kHz PCM16 流式上传，松开后 commit。回复为 24 kHz PCM16，边收边播，播放音量驱动口型（`src/lib/avatarFace.ts`）。
- 服务不可用或 10 秒无回复时，前端自动退回预设问答（`FacultySection.tsx` 的 `answerFor`）。
- 不保存用户音频和聊天记录；同一连接保留最近 10 轮上下文，空闲 3 分钟断开，下次提问自动重连。

## 部署（canvas_server）

- 代码：`~/ray/zora-studio/avatar-server`（随仓库 `git pull` 更新）。
- 密钥与配置：`~/ray/zora-avatar.env`（0600，格式见 `.env.example`）。
- Python 环境：`~/ray/zora-avatar-venv`（`pip install -r requirements.txt`）。
- 服务：`zora-avatar.service`，监听 `127.0.0.1:17866`；nginx 把 `/api/avatar/` 代理过去（含 WebSocket 升级）。

```sh
sudo systemctl restart zora-avatar.service      # 改了 knowledge.md / server.py 后
sudo journalctl -u zora-avatar.service -n 50 --no-pager
curl http://127.0.0.1:17866/api/avatar/health
```

`probe_realtime.py --env <env 文件> --audio <16k 单声道 wav>` 可直接测模型连接与首包延迟。

## 本地开发

`npm run dev` 时 vite 把 `/api/avatar` 代理到线上 zoratv.cn（服务端已放行 localhost:5173 来源），无需本地起 Python 服务。
