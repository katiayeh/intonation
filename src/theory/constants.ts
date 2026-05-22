export const NOTE_NAMES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

export type IntonationSystem = 'tempered' | 'pythagorean';

export const A4_FREQUENCY = 440;

function buildPythagoreanRatios(): Record<number, number> {
  const ratios: Record<number, number> = {};
  // be in the right octave
  for (let n = 0; n <= 6; n++) {
    const semitones = (n * 7) % 12;
    let ratio = Math.pow(3 / 2, n);
    while (ratio >= 2) ratio /= 2;
    ratios[semitones] = ratio;
  }
  for (let n = 1; n <= 5; n++) {
    const semitones = (((-n * 7) % 12) + 12) % 12;
    let ratio = Math.pow(2 / 3, n);
    while (ratio < 1) ratio *= 2;
    ratios[semitones] = ratio;
  }
  return ratios;
}

export const PYTHAGOREAN_RATIOS: Record<number, number> = buildPythagoreanRatios();

export const TEMPERED_SEMITONE_RATIO = Math.pow(2, 1 / 12);

export interface ScaleNote {
  name: NoteName;
  octave: number;
  frequency: number;
  semitonesFromRoot: number;
}

export interface Interval {
  name: string;
  semitones: number;
  ratioTempered: number;
  ratioPythagorean: number;
}
