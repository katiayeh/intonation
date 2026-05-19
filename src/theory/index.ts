import {
  A4_FREQUENCY,
  TEMPERED_SEMITONE_RATIO,
  PYTHAGOREAN_RATIOS,
  NOTE_NAMES,
  type NoteName,
  type IntonationSystem,
  type ScaleNote,
} from './constants';

export function midiToFrequency(midi: number): number {
  return A4_FREQUENCY * Math.pow(2, (midi - 69) / 12);
}

export function noteToMidi(name: NoteName, octave: number): number {
  const noteIndex = NOTE_NAMES.indexOf(name);
  const semitone = (noteIndex + 9) % 12;
  return (octave + 1) * 12 + semitone;
}

export function getFrequency(
  name: NoteName,
  octave: number,
  system: IntonationSystem,
  rootName: NoteName = 'A',
  rootOctave: number = 4,
  baseFrequency?: number,
): number {
  const rootMidi = noteToMidi(rootName, rootOctave);
  const noteMidi = noteToMidi(name, octave);
  const semitones = noteMidi - rootMidi;
  const rootFreq = baseFrequency ?? (system === 'tempered'
    ? midiToFrequency(rootMidi)
    : (() => {
        const rootSemitonesFromA4 = rootMidi - noteToMidi('A', 4);
        const rootOctaveShift = Math.floor(rootSemitonesFromA4 / 12);
        const rootRemainder = ((rootSemitonesFromA4 % 12) + 12) % 12;
        const rootRatio = PYTHAGOREAN_RATIOS[rootRemainder] ?? 1;
        return A4_FREQUENCY * rootRatio * Math.pow(2, rootOctaveShift);
      })());

  if (system === 'tempered') {
    return rootFreq * Math.pow(TEMPERED_SEMITONE_RATIO, semitones);
  }

  const octaveShift = Math.floor(semitones / 12);
  const remainder = ((semitones % 12) + 12) % 12;
  const ratio = PYTHAGOREAN_RATIOS[remainder] ?? 1;
  return rootFreq * ratio * Math.pow(2, octaveShift);
}

export function getScale(
  rootName: NoteName,
  rootOctave: number,
  system: IntonationSystem,
  semitonePattern: number[] = [2, 2, 1, 2, 2, 2, 1],
  baseFrequency?: number,
): ScaleNote[] {
  const notes: ScaleNote[] = [];
  let currentSemitones = 0;

  const rootFreq = baseFrequency ?? getFrequency(rootName, rootOctave, system);

  notes.push({
    name: rootName,
    octave: rootOctave,
    frequency: rootFreq,
    semitonesFromRoot: 0,
  });

  const rootIndex = NOTE_NAMES.indexOf(rootName);
  const rootMidi = noteToMidi(rootName, rootOctave);

  for (const step of semitonePattern) {
    currentSemitones += step;
    const noteIndex = (rootIndex + currentSemitones) % 12;
    const noteMidi = rootMidi + currentSemitones;
    const noteName = NOTE_NAMES[noteIndex];
    const octave = Math.floor(noteMidi / 12) - 1;

    notes.push({
      name: noteName,
      octave,
      frequency: getFrequency(noteName, octave, system, rootName, rootOctave, rootFreq),
      semitonesFromRoot: currentSemitones,
    });
  }

  return notes;
}

export function getBeatFrequency(freq1: number, freq2: number): number {
  return Math.abs(freq1 - freq2);
}

export function getBeatsPerSecond(freq1: number, freq2: number): number {
  return getBeatFrequency(freq1, freq2);
}

export function getBeatPeriod(freq1: number, freq2: number): number {
  const bps = getBeatsPerSecond(freq1, freq2);
  return bps === 0 ? Infinity : 1 / bps;
}

export function getHarmonics(frequency: number, count: number = 8): number[] {
  return Array.from({ length: count }, (_, i) => frequency * (i + 1));
}

export const INTERVAL_NAMES: Record<number, string> = {
  0: 'Unisson',
  1: 'Seconde mineure',
  2: 'Seconde majeure',
  3: 'Tierce mineure',
  4: 'Tierce majeure',
  5: 'Quarte juste',
  6: 'Triton',
  7: 'Quinte juste',
  8: 'Sixte mineure',
  9: 'Sixte majeure',
  10: 'Septième mineure',
  11: 'Septième majeure',
  12: 'Octave',
};
