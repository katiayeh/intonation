let audioContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playPianoNote(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
): void {
  const harmonics = [1, 2, 3, 4, 5, 6, 7, 8];
  const amplitudes = [1, 0.5, 0.3, 0.2, 0.12, 0.08, 0.04, 0.02];
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);

  masterGain.gain.setValueAtTime(0.001, startTime);
  masterGain.gain.linearRampToValueAtTime(0.35, startTime + 0.005);
  masterGain.gain.setValueAtTime(0.35, startTime + duration - 0.02);
  masterGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  for (let i = 0; i < harmonics.length; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency * harmonics[i], startTime);

    gain.gain.setValueAtTime(amplitudes[i], startTime);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }
}

export function playFrequency(frequency: number, duration: number = 1): void {
  const ctx = getAudioContext();
  playPianoNote(ctx, frequency, ctx.currentTime, duration);
}

export function playTwoFrequencies(
  freq1: number,
  freq2: number,
  duration: number = 2,
): void {
  playFrequency(freq1, duration);
  playFrequency(freq2, duration);
}

export function playScale(frequencies: number[]): void {
  const ctx = getAudioContext();
  const noteDuration = 1;
  let startTime = ctx.currentTime;

  for (const freq of frequencies) {
    playPianoNote(ctx, freq, startTime, noteDuration);
    startTime += noteDuration;
  }
}

export function playMetronome(bpm: number, beats: number = 4): void {
  const ctx = getAudioContext();
  const interval = 60 / bpm;
  let startTime = ctx.currentTime;

  for (let i = 0; i < beats; i++) {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(i === 0 ? 1000 : 800, startTime);

    gainNode.gain.setValueAtTime(0.2, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.05);

    startTime += interval;
  }
}
