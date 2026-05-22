import { useState } from 'react';
import { NOTE_NAMES, type NoteName } from '../theory/constants';
import { getScale, midiToFrequency, noteToMidi } from '../theory';
import { playScale, playFrequency, playTwoFrequencies } from '../audio';
import { useI18n } from '../i18n/hooks';

export function Comparison() {
  const [rootName, setRootName] = useState<NoteName>('C');
  const [rootOctave, setRootOctave] = useState(4);
  const { t, tInterval } = useI18n();

  const tempered = getScale(rootName, rootOctave, 'tempered');
  const temperedRootFreq = midiToFrequency(noteToMidi(rootName, rootOctave));
  const pythagorean = getScale(rootName, rootOctave, 'pythagorean', [2, 2, 1, 2, 2, 2, 1], temperedRootFreq);

  return (
    <section className="comparison">
      <h2>{t('comparisonTitle')}</h2>

      <div className="controls">
        <label>
          {t('root')}
          <select value={rootName} onChange={(e) => setRootName(e.target.value as NoteName)}>
            {NOTE_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>
          {t('octave')}
          <input type="number" min={1} max={8} value={rootOctave}
            onChange={(e) => setRootOctave(Number(e.target.value))} />
        </label>

        <button onClick={() => playScale(tempered.map((n) => n.frequency))}>
          {t('playTempered')}
        </button>
        <button onClick={() => playScale(pythagorean.map((n) => n.frequency))}>
          {t('playPythagorean')}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>{t('thNote')}</th>
            <th>{t('thTemperedHz')}</th>
            <th>{t('thPythagoreanHz')}</th>
            <th>{t('thDiffCents')}</th>
            <th>{t('thInterval')}</th>
            <th>{t('thListen')}</th>
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
                <td>{tInterval(tNote.semitonesFromRoot)}</td>
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
