import { useState } from 'react';
import { playFrequency, playTwoFrequencies, playMetronome } from '../audio';
import { useI18n } from '../i18n/hooks';

export function Beats() {
  const [freq1, setFreq1] = useState(440);
  const [freq2, setFreq2] = useState(442);
  const { t } = useI18n();
  const [metronomeOn, setMetronomeOn] = useState(false);

  const beatFreq = Math.abs(freq2 - freq1);

  return (
    <section className="beats">
      <h2>{t('beatsTitle')}</h2>

      <div className="controls">
        <label>
          {t('f1Hz')}
          <input
            type="number"
            min={20} max={20000}
            value={freq1}
            onChange={(e) => setFreq1(Number(e.target.value))}
          />
        </label>

        <label>
          {t('f2Hz')}
          <input
            type="number"
            min={20} max={20000}
            value={freq2}
            onChange={(e) => setFreq2(Number(e.target.value))}
          />
        </label>

        <button onClick={() => playFrequency(freq1)}>▶ F1</button>
        <button onClick={() => playFrequency(freq2)}>▶ F2</button>
        <button onClick={() => playTwoFrequencies(freq1, freq2)}>▶ F1 + F2</button>
        <button disabled={beatFreq === 0} onClick={() => playMetronome(beatFreq * 60)}>🔔 Métronome</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>{t('thF1Hz')}</th>
            <th>{t('thF2Hz')}</th>
            <th>{t('thBeatHz')}</th>
            <th>{t('thPeriod')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{freq1.toFixed(2)}</td>
            <td>{freq2.toFixed(2)}</td>
            <td>{beatFreq.toFixed(2)}</td>
            <td>{beatFreq === 0 ? '∞' : (1 / beatFreq).toFixed(3)}</td>
          </tr>
        </tbody>
      </table>

      
    </section>
  );
}
