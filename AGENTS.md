# 项目协作约定

## Git 提交与同步

- 每次开始开发或修改文件前，先检查工作区状态，并拉取当前分支对应远程分支的最新代码；工作区干净时优先使用 `git pull --ff-only`。
- 如果存在未提交修改或分支分叉，先妥善保留本地工作，再安全同步远程更新；不要覆盖、丢弃他人或用户的修改，也不要强制推送。
- 用户要求：提交的代码都要及时 push 到 GitHub，不要只保留在本地。
- 每次完成修改并通过相应检查后，及时 commit，并 push 到当前分支对应的远程分支；无需重复询问是否推送。
- 推送后核对远程分支已包含本次提交，再向用户报告完成。
- 如果推送失败，明确说明原因及尚未同步的提交；不要强制推送或覆盖远程历史。

## 发版 / 上线

“发版”“上线”“部署”= 拉取 → 测试 → commit → push 到 origin/main → 服务器构建部署，每次都走完整流程。

1. `git pull --rebase`，然后在 `huyml-rebuild/` 里跑 `npx vitest run`，通过后再提交并 push。
2. 生产服务器是 ssh 别名 `canvas_server`（需要本机 `~/.ssh/config` 里配好）。在服务器上构建并同步：

   ```
   ssh canvas_server 'cd ~/ray/zora-studio && git -c http.proxy=http://127.0.0.1:7890 pull -q && cd huyml-rebuild && PATH=$HOME/.local/node/bin:$PATH npm ci --registry=https://registry.npmmirror.com && PATH=$HOME/.local/node/bin:$PATH npm run build && sudo rsync -a --delete dist/ /var/www/zora-studio/'
   ```

   - 服务器访问 GitHub 要走本地代理 127.0.0.1:7890；npm 用 npmmirror；Node 22 在 `~/.local/node`。
3. 如果改动涉及 `avatar-server/`（包括 `knowledge.md`），还要 `sudo systemctl restart zora-avatar.service`。
4. 验证：`https://zoratv.cn/` 返回 200；改了小Z 时检查 `https://zoratv.cn/api/avatar/health`。向用户报告部署的 commit hash。

- 在服务器上不要通过 ssh 用普通模式执行 `pkill -f` / `pgrep -f`，会匹配到 ssh 命令本身把会话杀掉；用 `[x]yz` 这类方括号写法或直接用 PID。
