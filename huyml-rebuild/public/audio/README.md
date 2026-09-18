# Hero 音乐卡片

当前歌曲为 **《轻轻的回应》— Zora Studio**，由用户提供完整 MP3 和中文歌词。
`qing-qing-de-hui-ying.mp3` 是原文件的直接副本，没有重新编码或截取。

`src/data/music-demo.json` 保存歌名、歌手、音频路径、逐句歌词时间和 80 根真实波形柱。
波形按整首音频的双声道 RMS 能量计算。播放器的歌词、波形进度与拖动跳转均跟随
HTMLAudioElement.currentTime；黑胶唱片只在播放时转动。

歌词按用户提供的中文原文保留。句首时间通过本地 Whisper 识别结果对齐，属于逐句同步，
不是逐字卡拉 OK；如需微调，可直接编辑 JSON 中各行的 time（单位：秒）。

更换歌曲时，先更新 JSON 的 title、artist、src 与歌词时间，再运行：

```sh
python scripts/build-music-demo.py /path/to/song.mp3
```

该脚本需要 soundfile 和 numpy（仅开发时使用），保留原 MP3 并重新计算时长及波形。

## 保留的旧演示素材

`amazing-grace-demo.mp3` 是此前的《Amazing Grace》57 秒演示片段，由美国空军乐队
Airmen of Note 演奏，MSgt. Alan Baylock 编曲。现有播放器不再使用此文件。
原始来源及公有领域说明：
https://commons.wikimedia.org/wiki/File:Amazing_Grace_(USAFB_jazz_vocal).ogg
