class PCMCaptureProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.targetRate = options.processorOptions?.sampleRate || 16000;
    this.packetSize = Math.round(this.targetRate * 0.02);
    this.recording = false;
    this.epoch = '';
    this.reset();
    this.port.onmessage = ({ data }) => {
      if (data.type === 'start') {
        this.reset();
        this.epoch = data.epoch;
        this.recording = true;
      } else if (data.type === 'stop' && data.epoch === this.epoch) {
        this.recording = false;
        if (data.commit && this.packetOffset) this.flush(this.packetOffset);
        const rms = Math.sqrt(this.squareSum / Math.max(1, this.sentSamples));
        this.port.postMessage({ type: 'stopped', epoch: this.epoch,
          sentSamples: this.sentSamples, rms, peak: this.peak,
          hasSpeech: rms > 0.004 || this.peak > 0.018 });
        this.reset();
      }
    };
  }

  reset() {
    this.packet = new Int16Array(this.packetSize);
    this.packetOffset = 0;
    this.weightedSum = 0;
    this.weight = 0;
    this.squareSum = 0;
    this.peak = 0;
    this.sentSamples = 0;
  }

  send(packet) {
    this.sentSamples += packet.length;
    this.port.postMessage({ type: 'pcm', epoch: this.epoch, buffer: packet.buffer }, [packet.buffer]);
  }

  flush(length = this.packetSize) {
    const packet = length === this.packetSize ? this.packet : this.packet.slice(0, length);
    for (let i = 0; i < length; i++) {
      const value = packet[i] / 32768;
      this.squareSum += value * value;
      this.peak = Math.max(this.peak, Math.abs(value));
    }
    // Preserve pauses inside a held utterance; only idle microphone audio is omitted.
    this.send(packet);
    this.packet = new Int16Array(this.packetSize);
    this.packetOffset = 0;
  }

  process(inputs) {
    if (!this.recording) return true;
    const channels = inputs[0];
    if (!channels?.length || !channels[0]?.length) return true;
    const ratio = sampleRate / this.targetRate;
    for (let i = 0; i < channels[0].length; i++) {
      let sample = 0;
      for (const channel of channels) sample += channel[i] || 0;
      sample /= channels.length;
      let remaining = 1;
      while (remaining > 0.000001) {
        const amount = Math.min(remaining, ratio - this.weight);
        this.weightedSum += sample * amount;
        this.weight += amount;
        remaining -= amount;
        if (this.weight >= ratio - 0.000001) {
          const value = Math.max(-1, Math.min(1, this.weightedSum / ratio));
          this.packet[this.packetOffset++] = Math.round(value * (value < 0 ? 32768 : 32767));
          this.weightedSum = 0;
          this.weight = 0;
          if (this.packetOffset === this.packetSize) this.flush();
        }
      }
    }
    return true;
  }
}

registerProcessor('pcm-capture', PCMCaptureProcessor);
