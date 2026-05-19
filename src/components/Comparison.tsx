import { useState } from 'react';
import { NOTE_NAMES, type NoteName } from '../theory/constants';
import { getScale, INTERVAL_NAMES, midiToFrequency, noteToMidi } from '../theory';
import { playScale, playFrequency, playTwoFrequencies } from '../audio';

export function Comparison() {
  const [rootName, setRootName] = useState<NoteName>('C');
  const [rootOctave, setRootOctave] = useState(4);

  const tempered = getScale(rootName, rootOctave, 'tempered');
  const temperedRootFreq = midiToFrequency(noteToMidi(rootName, rootOctave));
  const pythagorean = getScale(rootName, rootOctave, 'pythagorean', [2, 2, 1, 2, 2, 2, 1], temperedRootFreq);

  return (
    <section className="comparison">
      <h2>Comparaison Tempéré vs Pythagoricien</h2>

      <div className="controls">
        <label>
          Tonique :
          <select value={rootName} onChange={(e) => setRootName(e.target.value as NoteName)}>
            {NOTE_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>
          Octave :
          <input type="number" min={1} max={8} value={rootOctave}
            onChange={(e) => setRootOctave(Number(e.target.value))} />
        </label>

        <button onClick={() => playScale(tempered.map((n) => n.frequency))}>
          ▶ Tempéré
        </button>
        <button onClick={() => playScale(pythagorean.map((n) => n.frequency))}>
          ▶ Pythagoricien
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Note</th>
            <th>Tempéré (Hz)</th>
            <th>Pythagoricien (Hz)</th>
            <th>Différence (cents)</th>
            <th>Intervalle</th>
            <th>Écouter</th>
          </tr>
        </thead>
        <tbody>
          {tempered.map((tNote, i) => {
            const pNote = pythagorean[i];
            const centsDiff = 1200 * Math.log2(pNote.frequency / tNote.frequency);
            return (
              <tr key={i}>
                <td>{tNote.name}{tNote.octave}</td>
                <td>
                  <button className="inline-play" onClick={() => playFrequency(tNote.frequency)}>
                    {tNote.frequency.toFixed(2)}
                  </button>
                </td>
                <td>
                  <button className="inline-play" onClick={() => playFrequency(pNote.frequency)}>
                    {pNote.frequency.toFixed(2)}
                  </button>
                </td>
                <td>{centsDiff.toFixed(2)}</td>
                <td>{INTERVAL_NAMES[tNote.semitonesFromRoot] ?? '—'}</td>
                <td>
                  <button className="inline-play" onClick={() => playTwoFrequencies(tNote.frequency, pNote.frequency)}>
                    ▶
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
