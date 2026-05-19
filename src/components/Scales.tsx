import { useState } from 'react';
import { NOTE_NAMES, type NoteName } from '../theory/constants';
import { getScale, INTERVAL_NAMES, getFrequency, noteToMidi } from '../theory';
import { playScale, playTwoFrequencies, playFrequency } from '../audio';

const SCALE_PATTERNS: Record<string, number[]> = {
  'Majeure': [2, 2, 1, 2, 2, 2, 1],
  'Mineure naturelle': [2, 1, 2, 2, 1, 2, 2],
  'Mineure harmonique': [2, 1, 2, 2, 1, 3, 1],
  'Mineure mélodique': [2, 1, 2, 2, 2, 2, 1],
  'Pentatonique majeure': [2, 2, 3, 2, 3],
  'Blues': [3, 2, 1, 1, 3, 2],
};

const INTERVAL_ROWS = [
  { label: 'Tierce mineure', semitones: 3 },
  { label: 'Tierce majeure', semitones: 4 },
  { label: 'Quarte juste', semitones: 5 },
  { label: 'Quinte juste', semitones: 7 },
];

export function Scales() {
  const [rootName, setRootName] = useState<NoteName>('C');
  const [rootOctave, setRootOctave] = useState(4);
  const [patternName, setPatternName] = useState('Majeure');

  const pattern = SCALE_PATTERNS[patternName];
  const tempered = getScale(rootName, rootOctave, 'tempered', pattern);
  const pythagorean = getScale(rootName, rootOctave, 'pythagorean', pattern);

  return (
    <section className="scales">
      <h2>Gammes</h2>

      <div className="controls">
        <label>
          Tonique :
          <select value={rootName} onChange={(e) => setRootName(e.target.value as NoteName)}>
            {NOTE_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>
          Octave :
          <input
            type="number"
            min={1} max={8}
            value={rootOctave}
            onChange={(e) => setRootOctave(Number(e.target.value))}
          />
        </label>

        <label>
          Gamme :
          <select value={patternName} onChange={(e) => setPatternName(e.target.value)}>
            {Object.keys(SCALE_PATTERNS).map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="scale-columns">
        <div className="scale-column">
          <h3>Tempéré</h3>
          <table>
            <thead>
              <tr>
                <th>Note</th>
                <th>Fréquence (Hz)</th>
                <th>Intervalle</th>
                <th>Demi-tons</th>
              </tr>
            </thead>
            <tbody>
              {tempered.map((note, i) => (
                <tr key={i}>
                  <td>{note.name}{note.octave}</td>
                  <td>{note.frequency.toFixed(2)}</td>
                  <td>{INTERVAL_NAMES[note.semitonesFromRoot] ?? '—'}</td>
                  <td>{note.semitonesFromRoot}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => playScale(tempered.map((n) => n.frequency))}>
            ▶ Écouter la gamme
          </button>
        </div>

        <div className="scale-column">
          <h3>Pythagoricien</h3>
          <table>
            <thead>
              <tr>
                <th>Note</th>
                <th>Fréquence (Hz)</th>
                <th>Intervalle</th>
                <th>Demi-tons</th>
              </tr>
            </thead>
            <tbody>
              {pythagorean.map((note, i) => (
                <tr key={i}>
                  <td>{note.name}{note.octave}</td>
                  <td>{note.frequency.toFixed(2)}</td>
                  <td>{INTERVAL_NAMES[note.semitonesFromRoot] ?? '—'}</td>
                  <td>{note.semitonesFromRoot}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => playScale(pythagorean.map((n) => n.frequency))}>
            ▶ Écouter la gamme
          </button>
        </div>
      </div>

      <h3>Intervalles</h3>
      <table>
        <thead>
          <tr>
            <th>Intervalle</th>
            <th>Tempéré (Hz)</th>
            <th>Pythagoricien (Hz)</th>
            <th>Battement tempéré (Hz)</th>
            <th>Période (s)</th>
            <th>Battement pythagoricien (Hz)</th>
            <th>Période (s)</th>
            <th>Écouter</th>
          </tr>
        </thead>
        <tbody>
          {INTERVAL_ROWS.map(({ label, semitones }) => {
            const noteMidi = noteToMidi(rootName, rootOctave) + semitones;
            const noteIndex = (NOTE_NAMES.indexOf(rootName) + semitones) % 12;
            const noteName = NOTE_NAMES[noteIndex];
            const noteOctave = Math.floor(noteMidi / 12) - 1;

            const rootT = tempered[0].frequency;
            const rootP = pythagorean[0].frequency;
            const freqT = getFrequency(noteName, noteOctave, 'tempered', rootName, rootOctave);
            const freqP = getFrequency(noteName, noteOctave, 'pythagorean', rootName, rootOctave);

            const beatT = Math.abs(freqT - rootT);
            const periodT = beatT === 0 ? Infinity : 1 / beatT;
            const beatP = Math.abs(freqP - rootP);
            const periodP = beatP === 0 ? Infinity : 1 / beatP;

            return (
              <tr key={semitones}>
                <td>{label}</td>
                <td>
                  <button className="inline-play" onClick={() => playFrequency(freqT)}>
                    {freqT.toFixed(2)}
                  </button>
                </td>
                <td>
                  <button className="inline-play" onClick={() => playFrequency(freqP)}>
                    {freqP.toFixed(2)}
                  </button>
                </td>
                <td>{beatT.toFixed(2)}</td>
                <td>{periodT === Infinity ? '∞' : periodT.toFixed(3)}</td>
                <td>{beatP.toFixed(2)}</td>
                <td>{periodP === Infinity ? '∞' : periodP.toFixed(3)}</td>
                <td>
                  <button className="inline-play" onClick={() => playTwoFrequencies(rootT, freqT)}>T</button>
                  <button className="inline-play" onClick={() => playTwoFrequencies(rootP, freqP)}>P</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
