import { useState, useMemo } from 'react';
import { NOTE_NAMES, type NoteName } from '../theory/constants';
import { midiToFrequency, noteToMidi } from '../theory';
import { useI18n } from '../i18n/hooks';
import type { TranslationKey } from '../i18n/translations';

const NUM_OVERTONES = 5;

const NOTE_NAMES_LIST = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function getOvertones(baseFreq: number, count: number) {
  const result: { n: number; freq: number }[] = [];
  for (let i = 1; i <= count + 1; i++) {
    result.push({ n: i, freq: baseFreq * i });
  }
  return result;
}

function freqToNoteLabel(freq: number): string {
  const midi = Math.round(12 * Math.log2(freq / 440) + 69);
  const noteIndex = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${NOTE_NAMES_LIST[noteIndex]}${octave}`;
}

const FUND_KEY: TranslationKey = 'fundamental';
const OVERTONE_KEY: TranslationKey = 'overtone';

function HarmonicLineChart({
  overtones1,
  overtones2,
  note1Label,
  note2Label,
  freqLabel,
}: {
  overtones1: { n: number; freq: number }[];
  overtones2: { n: number; freq: number }[];
  note1Label: string;
  note2Label: string;
  freqLabel: string;
}) {
  const allFreqs = [...overtones1, ...overtones2].map((o) => o.freq);
  const minFreq = Math.min(...allFreqs) / 1.4;
  const maxFreq = Math.max(...allFreqs) * 1.4;

  const logMin = Math.log2(minFreq);
  const logMax = Math.log2(maxFreq);

  const toY = (freq: number, chartHeight: number) =>
    chartHeight - ((Math.log2(freq) - logMin) / (logMax - logMin)) * chartHeight;

  const viewW = 800;
  const viewH = 400;
  const pad = { top: 10, right: 100, bottom: 30, left: 90 };
  const cw = viewW - pad.left - pad.right;
  const ch = viewH - pad.top - pad.bottom;
  const midX = cw / 2;

  const tickFreqs = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1500, 2000, 2500, 3000, 3500, 4000, 5000]
    .filter((f) => f >= minFreq && f <= maxFreq);

  return (
    <svg viewBox={`0 0 ${viewW} ${viewH}`} style={{ width: '100%', height: 'auto', fontFamily: 'system-ui, sans-serif' }}>
      {tickFreqs.map((f) => {
        const y = pad.top + toY(f, ch);
        return (
          <g key={`grid-${f}`}>
            <line x1={pad.left} y1={y} x2={pad.left + cw} y2={y} stroke="var(--border, #e5e4e7)" strokeWidth={0.5} />
            <text x={pad.left - 6} y={y + 4} textAnchor="end" fontSize={11} fill="var(--text, #6b6375)">{f}</text>
          </g>
        );
      })}

      <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + ch} stroke="var(--text, #6b6375)" strokeWidth={1} />
      <text x={20} y={pad.top + ch / 2} fontSize={12} fill="var(--text, #6b6375)" textAnchor="middle" transform={`rotate(-90,20,${pad.top + ch / 2})`}>{freqLabel}</text>

      <text x={pad.left + midX / 2} y={viewH - 4} fontSize={12} fill="#4a90d9" textAnchor="middle" fontWeight={600}>{note1Label}</text>
      <text x={pad.left + midX + midX / 2} y={viewH - 4} fontSize={12} fill="#e8924a" textAnchor="middle" fontWeight={600}>{note2Label}</text>

      {overtones1.map((o) => {
        const y = pad.top + toY(o.freq, ch);
        const label = freqToNoteLabel(o.freq);
        return (
          <g key={`n1-${o.n}`}>
            <line x1={pad.left} y1={y} x2={pad.left + midX} y2={y} stroke="#4a90d9" strokeWidth={2.5} />
            <text x={pad.left + midX + 4} y={y + 4} fontSize={10} fill="#4a90d9">{o.freq.toFixed(0)} Hz ({label})</text>
          </g>
        );
      })}

      {overtones2.map((o) => {
        const y = pad.top + toY(o.freq, ch);
        const label = freqToNoteLabel(o.freq);
        return (
          <g key={`n2-${o.n}`}>
            <line x1={pad.left + midX} y1={y} x2={pad.left + cw} y2={y} stroke="#e8924a" strokeWidth={2.5} />
            <text x={pad.left + cw + 4} y={y + 4} fontSize={10} fill="#e8924a">{o.freq.toFixed(0)} Hz ({label})</text>
          </g>
        );
      })}
    </svg>
  );
}

export function Overtones() {
  const [note1Name, setNote1Name] = useState<NoteName>('A');
  const [note1Octave, setNote1Octave] = useState(4);
  const [note2Name, setNote2Name] = useState<NoteName>('E');
  const [note2Octave, setNote2Octave] = useState(4);
  const { t } = useI18n();

  const note1Label = `${note1Name}${note1Octave}`;
  const note2Label = `${note2Name}${note2Octave}`;

  const freq1 = midiToFrequency(noteToMidi(note1Name, note1Octave));
  const freq2 = midiToFrequency(noteToMidi(note2Name, note2Octave));

  const overtones1 = useMemo(() => getOvertones(freq1, NUM_OVERTONES), [freq1]);
  const overtones2 = useMemo(() => getOvertones(freq2, NUM_OVERTONES), [freq2]);

  const beatFreq = Math.abs(freq2 - freq1);

  return (
    <section className="overtones">
      <h2>{t('overtonesTitle')}</h2>

      <div className="controls">
        <label>
          {t('overtonesNote1')}
          <select value={note1Name} onChange={(e) => setNote1Name(e.target.value as NoteName)}>
            {NOTE_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <input
            type="number"
            min={1} max={8}
            value={note1Octave}
            onChange={(e) => setNote1Octave(Number(e.target.value))}
          />
        </label>

        <label>
          {t('overtonesNote2')}
          <select value={note2Name} onChange={(e) => setNote2Name(e.target.value as NoteName)}>
            {NOTE_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <input
            type="number"
            min={1} max={8}
            value={note2Octave}
            onChange={(e) => setNote2Octave(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="chart">
        <HarmonicLineChart
          overtones1={overtones1}
          overtones2={overtones2}
          note1Label={note1Label}
          note2Label={note2Label}
          freqLabel={t('thFrequencyHz')}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>{t('thHarmonic')}</th>
            <th>{note1Label} — {t('thNote')}</th>
            <th>{note1Label} — {t('thFrequencyHz')}</th>
            <th>{note2Label} — {t('thNote')}</th>
            <th>{note2Label} — {t('thFrequencyHz')}</th>
          </tr>
        </thead>
        <tbody>
          {overtones1.map((o1, i) => {
            const o2 = overtones2[i];
            return (
              <tr key={i}>
                <td>{o1.n === 1 ? t(FUND_KEY) : `${t(OVERTONE_KEY)} ${o1.n - 1}`}</td>
                <td>{freqToNoteLabel(o1.freq)}</td>
                <td>{o1.freq.toFixed(1)}</td>
                <td>{freqToNoteLabel(o2.freq)}</td>
                <td>{o2.freq.toFixed(1)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2>{t('undertone')}</h2>

      <table>
        <thead>
          <tr>
            <th>{t('thF1Hz')}</th>
            <th>{t('thNote')}</th>
            <th>{t('thF2Hz')}</th>
            <th>{t('thNote')}</th>
            <th>{t('undertone')}</th>
            <th>{t('thNote')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{freq1.toFixed(2)}</td>
            <td>{freqToNoteLabel(freq1)}</td>

            <td>{freq2.toFixed(2)}</td>
            <td>{freqToNoteLabel(freq2)}</td>

            <td>{beatFreq.toFixed(2)}</td>
            <td>{freqToNoteLabel(beatFreq)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
