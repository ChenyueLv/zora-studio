// 小Z 实时语音客户端：浏览器只连本站 /api/avatar/ws，密钥只在服务端。
// 文字提问与按住说话共用一条连接；回复音频边到边播，音量驱动口型。
const WORKLET = "/assets/avatar/pcm-capture-worklet.js";

export type AvatarVoiceEvents = {
  onUserText(turn: string, text: string, final: boolean): void;
  onDelta(turn: string, text: string): void;
  onDone(turn: string): void;
  /** The recording was too short or silent; nothing was sent. */
  onEmpty(turn: string): void;
  onError(message: string): void;
  onLevel(level: number): void;
  onPlaying(active: boolean): void;
};

export class VoiceError extends Error {}

const errorMessage = (error: unknown) => {
  const name = (error as { name?: string })?.name;
  if (name === "NotAllowedError") return "请允许使用麦克风，或直接输入问题。";
  if (name === "NotFoundError") return "没有找到麦克风，请连接后重试。";
  if (error instanceof VoiceError) return error.message;
  return "语音暂不可用，请直接输入问题。";
};

class PcmPlayer {
  private sources = new Set<AudioBufferSourceNode>();
  private nextTime = 0;
  private remainder: number | undefined;
  private frame = 0;
  private analyser: AnalyserNode;
  private gain: GainNode;
  private samples: Float32Array<ArrayBuffer>;

  constructor(
    private context: AudioContext,
    private onLevel: (level: number) => void,
    private onChange: (active: boolean) => void,
  ) {
    this.gain = context.createGain();
    this.gain.connect(context.destination);
    this.analyser = context.createAnalyser();
    this.analyser.fftSize = 1024;
    this.analyser.smoothingTimeConstant = 0;
    this.analyser.connect(this.gain);
    this.samples = new Float32Array(this.analyser.fftSize);
  }

  get active() {
    return this.sources.size > 0;
  }

  setMuted(muted: boolean) {
    this.gain.gain.value = muted ? 0 : 1;
  }

  enqueue(bytes: ArrayBuffer, sampleRate = 24000) {
    let data = new Uint8Array(bytes);
    if (this.remainder !== undefined) {
      const joined = new Uint8Array(data.length + 1);
      joined[0] = this.remainder;
      joined.set(data, 1);
      data = joined;
      this.remainder = undefined;
    }
    if (data.length % 2) {
      this.remainder = data[data.length - 1];
      data = data.subarray(0, data.length - 1);
    }
    if (!data.length) return;
    const audio = this.context.createBuffer(1, data.length / 2, sampleRate);
    const channel = audio.getChannelData(0);
    const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    for (let i = 0; i < channel.length; i++)
      channel[i] = view.getInt16(i * 2, true) / 32768;
    const source = this.context.createBufferSource();
    source.buffer = audio;
    source.connect(this.analyser);
    const now = this.context.currentTime;
    const start = this.nextTime > now ? this.nextTime : now + 0.03;
    this.nextTime = start + audio.duration;
    const wasActive = this.active;
    this.sources.add(source);
    source.onended = () => {
      this.sources.delete(source);
      source.disconnect();
      if (!this.active) {
        cancelAnimationFrame(this.frame);
        this.frame = 0;
        this.onLevel(0);
        this.onChange(false);
      }
    };
    source.start(start);
    if (!this.frame) this.tick();
    if (!wasActive) this.onChange(true);
  }

  private tick() {
    if (!this.active) {
      this.frame = 0;
      this.onLevel(0);
      return;
    }
    this.analyser.getFloatTimeDomainData(this.samples);
    let total = 0;
    for (const sample of this.samples) total += sample * sample;
    const rms = Math.sqrt(total / this.samples.length);
    this.onLevel(Math.min(1, Math.sqrt(Math.max(0, rms - 0.009) * 6.8)));
    this.frame = requestAnimationFrame(() => this.tick());
  }

  interrupt() {
    const wasActive = this.active;
    for (const source of this.sources) {
      source.onended = null;
      try {
        source.stop();
      } catch {
        /* Already ended. */
      }
      source.disconnect();
    }
    this.sources.clear();
    this.nextTime = 0;
    this.remainder = undefined;
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.onLevel(0);
    if (wasActive) this.onChange(false);
  }
}

type Capture = {
  stream: MediaStream;
  source: MediaStreamAudioSourceNode;
  node: AudioWorkletNode;
  sink: GainNode;
};

export class AvatarVoice {
  private socket?: WebSocket;
  private connecting?: Promise<void>;
  private ready = false;
  private context?: AudioContext;
  private player?: PcmPlayer;
  private capture?: Promise<Capture>;
  private recording?: {
    id: string;
    sent: number;
    stopping?: boolean;
    silent?: boolean;
    finish?: () => void;
  };
  private turn?: string;
  private acceptAudio = false;
  private muted = false;
  private closed = false;

  constructor(
    private events: AvatarVoiceEvents,
    private url = `${location.protocol === "https:" ? "wss:" : "ws:"}//${location.host}/api/avatar/ws`,
  ) {}

  static supported() {
    return typeof WebSocket !== "undefined";
  }

  static canRecord() {
    return Boolean(
      typeof navigator.mediaDevices?.getUserMedia === "function" &&
      (window.AudioContext ||
        (window as unknown as { webkitAudioContext?: unknown })
          .webkitAudioContext) &&
      window.AudioWorkletNode,
    );
  }

  get listening() {
    return Boolean(this.recording && !this.recording.stopping);
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    this.player?.setMuted(muted);
  }

  connect(): Promise<void> {
    if (this.closed) return Promise.reject(new VoiceError("closed"));
    if (this.ready && this.socket?.readyState === WebSocket.OPEN)
      return Promise.resolve();
    if (this.connecting) return this.connecting;
    const ws = new WebSocket(this.url);
    ws.binaryType = "arraybuffer";
    this.socket = ws;
    this.connecting = new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new VoiceError("连接超时"));
        ws.close();
      }, 10000);
      const fail = () => {
        clearTimeout(timeout);
        if (this.socket !== ws) return;
        const wasReady = this.ready;
        this.ready = false;
        this.connecting = undefined;
        reject(new VoiceError("连接失败"));
        if (wasReady && this.turn) {
          this.player?.interrupt();
          this.stopRecording(false);
          this.events.onError("连接断开了，请再试一次。");
        }
        this.turn = undefined;
      };
      ws.addEventListener("message", (event) => {
        if (this.socket !== ws) return;
        if (typeof event.data !== "string") {
          if (this.acceptAudio && !this.recording && this.turn)
            this.player?.enqueue(event.data as ArrayBuffer);
          return;
        }
        let data: Record<string, unknown>;
        try {
          data = JSON.parse(event.data);
        } catch {
          return;
        }
        if (data.type === "ready") {
          clearTimeout(timeout);
          this.ready = true;
          this.connecting = undefined;
          resolve();
        } else this.receive(data);
      });
      ws.addEventListener("close", fail);
      ws.addEventListener("error", () => {
        fail();
        ws.close();
      });
    });
    return this.connecting;
  }

  private send(message: Record<string, unknown>) {
    if (!this.ready || this.socket?.readyState !== WebSocket.OPEN)
      throw new VoiceError("连接已断开");
    this.socket.send(JSON.stringify(message));
  }

  private receive(data: Record<string, unknown>) {
    const turn = data.turn_id as string | undefined;
    if (data.type === "error") {
      const message =
        typeof data.message === "string" && data.message.length < 100
          ? data.message
          : "暂时没能回复，请再试一次。";
      this.player?.interrupt();
      this.acceptAudio = false;
      this.turn = undefined;
      this.events.onError(message);
      return;
    }
    if (!turn || turn !== this.turn) return;
    switch (data.type) {
      case "user.transcript":
        if (typeof data.text === "string")
          this.events.onUserText(turn, data.text, Boolean(data.final));
        break;
      case "audio.start":
        this.acceptAudio = true;
        break;
      case "assistant.delta":
        if (typeof data.text === "string") this.events.onDelta(turn, data.text);
        break;
      case "assistant.done":
        this.events.onDone(turn);
        break;
      case "turn.empty":
      case "turn.cancelled":
        this.turn = undefined;
        this.events.onEmpty(turn);
        break;
    }
  }

  /** AudioContext must be created/resumed inside the user's click. */
  private audio() {
    if (!this.context) {
      const Context =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.context = new Context({ latencyHint: "interactive" });
      this.player = new PcmPlayer(
        this.context,
        (level) => this.events.onLevel(level),
        (active) => this.events.onPlaying(active),
      );
      this.player.setMuted(this.muted);
    }
    return this.context.resume().catch(() => undefined);
  }

  /** Stop the current answer (audio and generation). */
  interrupt() {
    this.player?.interrupt();
    this.acceptAudio = false;
    const turn = this.turn;
    this.turn = undefined;
    if (turn && this.ready)
      try {
        this.send({ type: "cancel", turn_id: turn });
      } catch {
        /* Connection already gone. */
      }
  }

  async askText(text: string): Promise<string> {
    const resume = typeof AudioContext !== "undefined" ? this.audio() : null;
    this.interrupt();
    await Promise.all([this.connect(), resume]);
    const id = crypto.randomUUID();
    this.turn = id;
    this.acceptAudio = false;
    this.send({ type: "text", turn_id: id, text });
    return id;
  }

  private microphone(): Promise<Capture> {
    if (!this.capture) {
      const context = this.context!;
      this.capture = (async () => {
        const [stream] = await Promise.all([
          navigator.mediaDevices.getUserMedia({
            audio: {
              channelCount: 1,
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
            video: false,
          }),
          context.audioWorklet.addModule(WORKLET),
        ]);
        stream.getAudioTracks().forEach((track) => (track.enabled = false));
        const source = context.createMediaStreamSource(stream);
        const node = new AudioWorkletNode(context, "pcm-capture", {
          numberOfInputs: 1,
          numberOfOutputs: 1,
          outputChannelCount: [1],
          processorOptions: { sampleRate: 16000 },
        });
        const sink = context.createGain();
        sink.gain.value = 0;
        source.connect(node);
        node.connect(sink);
        sink.connect(context.destination);
        node.port.onmessage = ({ data }) => this.onCapture(data);
        stream.getAudioTracks().forEach((track) =>
          track.addEventListener("ended", () => {
            this.capture = undefined;
            this.stopRecording(false);
          }),
        );
        return { stream, source, node, sink };
      })().catch((error) => {
        this.capture = undefined;
        throw error;
      });
    }
    return this.capture;
  }

  private onCapture(data: {
    type: string;
    epoch: string;
    buffer?: ArrayBuffer;
    hasSpeech?: boolean;
  }) {
    const recording = this.recording;
    if (!recording || data.epoch !== recording.id) return;
    if (data.type === "pcm" && data.buffer) {
      if (this.socket?.readyState !== WebSocket.OPEN) return;
      recording.sent += data.buffer.byteLength / 2;
      this.socket.send(data.buffer);
    } else if (data.type === "stopped") {
      recording.silent = data.hasSpeech === false;
      recording.finish?.();
    }
  }

  /** Start push-to-talk; resolves with the turn id once the mic is live. */
  async startRecording(): Promise<string> {
    if (!AvatarVoice.canRecord())
      throw new VoiceError("当前浏览器不支持语音，请直接输入问题。");
    const resume = this.audio();
    this.interrupt();
    try {
      const [capture] = await Promise.all([
        this.microphone(),
        this.connect(),
        resume,
      ]);
      const id = crypto.randomUUID();
      this.turn = id;
      this.acceptAudio = false;
      this.send({ type: "start", turn_id: id });
      this.recording = { id, sent: 0 };
      capture.node.port.postMessage({ type: "start", epoch: id });
      capture.stream
        .getAudioTracks()
        .forEach((track) => (track.enabled = true));
      return id;
    } catch (error) {
      throw new VoiceError(errorMessage(error));
    }
  }

  /** Release the talk button: send (commit) or discard the recording. */
  stopRecording(commit = true) {
    const recording = this.recording;
    if (!recording || recording.stopping) return;
    recording.stopping = true;
    const cancel = () => {
      if (this.turn === recording.id) this.turn = undefined;
      try {
        this.send({ type: "cancel", turn_id: recording.id });
      } catch {
        /* Connection already gone. */
      }
    };
    if (!commit) {
      this.recording = undefined;
      cancel();
    }
    this.capture?.then(({ stream, node }) => {
      stream.getAudioTracks().forEach((track) => (track.enabled = false));
      node.port.postMessage({ type: "stop", epoch: recording.id, commit });
      if (!commit) return;
      let finished = false;
      // Keep forwarding the last packets until the worklet confirms the stop.
      const done = () => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        if (this.recording === recording) this.recording = undefined;
        // Under ~0.1 s the provider rejects the buffer; treat as not heard.
        if (recording.sent < 1600 || recording.silent) {
          cancel();
          this.events.onEmpty(recording.id);
          return;
        }
        try {
          this.send({ type: "commit", turn_id: recording.id });
        } catch {
          this.events.onError("连接断开了，请再试一次。");
        }
      };
      recording.finish = done;
      const timer = setTimeout(done, 800);
    });
  }

  close() {
    this.closed = true;
    this.stopRecording(false);
    this.interrupt();
    this.socket?.close();
    this.capture?.then(({ stream }) =>
      stream.getTracks().forEach((track) => track.stop()),
    );
    this.context?.close().catch(() => undefined);
  }
}
