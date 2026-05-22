import { useState } from 'react';
import { NOTE_NAMES, type NoteName } from '../theory/constants';
import { getScale, getFrequency, noteToMidi } from '../theory';
import { playScale, playTwoFrequencies, playFrequency } from '../audio';
import { useI18n } from '../i18n/hooks';
import type { TranslationKey } from '../i18n/translations';

const SCALE_KEYS: Record<string, { pattern: number[]; key: TranslationKey }> = {
  'Majeure': { pattern: [2, 2, 1, 2, 2, 2, 1], key: 'scaleMajor' },
  'Mineure naturelle': { pattern: [2, 1, 2, 2, 1, 2, 2], key: 'scaleNaturalMinor' },
  'Mineure harmonique': { pattern: [2, 1, 2, 2, 1, 3, 1], key: 'scaleHarmonicMinor' },
  'Mineure mélodique': { pattern: [2, 1, 2, 2, 2, 2, 1], key: 'scaleMelodicMinor' },
  'Pentatonique majeure': { pattern: [2, 2, 3, 2, 3], key: 'scalePentatonicMajor' },
  'Blues': { pattern: [3, 2, 1, 1, 3, 2], key: 'scaleBlues' },
};

const INTERVAL_ROWS = [
  { key: 'intervalMinorThird' as TranslationKey, semitones: 3 },
  { key: 'intervalMajorThird' as TranslationKey, semitones: 4 },
  { key: 'intervalPerfectFourth' as TranslationKey, semitones: 5 },
  { key: 'intervalPerfectFifth' as TranslationKey, semitones: 7 },
];

export function Scales() {
  const [rootName, setRootName] = useState<NoteName>('C');
  const [rootOctave, setRootOctave] = useState(4);
  const [patternName, setPatternName] = useState('Majeure');
  const { t, tInterval } = useI18n();

  const pattern = SCALE_KEYS[patternName].pattern;
  const tempered = getScale(rootName, rootOctave, 'tempered', pattern);
  const pythagorean = getScale(rootName, rootOctave, 'pythagorean', pattern);

  return (
    <section className="scales">
      <h2>{t('scalesTitle')}</h2>

      <div className="controls">
        <label>
          {t('root')}
          <select value={rootName} onChange={(e) => setRootName(e.target.value as NoteName)}>
            {NOTE_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>

        <label>
          {t('octave')}
          <input
            type="number"
            min={1} max={8}
            value={rootOctave}
            onChange={(e) => setRootOctave(Number(e.target.value))}
          />
        </label>

        <label>
          {t('scale')}
          <select value={patternName} onChange={(e) => setPatternName(e.target.value)}>
            {Object.keys(SCALE_KEYS).map((name) => (
              <option key={name} value={name}>{t(SCALE_KEYS[name].key)}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="scale-columns">
        <div className="scale-column">
          <h3>{t('tempered')}</h3>
          <table>
            <thead>
              <tr>
                <th>{t('thNote')}</th>
                <th>{t('thFrequencyHz')}</th>
                <th>{t('thInterval')}</th>
                <th>{t('thSemitones')}</th>
              </tr>
            </thead>
            <tbody>
              {tempered.map((note, i) => (
                <tr key={i}>
                  <td>{note.name}{note.octave}</td>
                  <td>{note.frequency.toFixed(2)}</td>
                  <td>{tInterval(note.semitonesFromRoot)}</td>
                  <td>{note.semitonesFromRoot}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => playScale(tempered.map((n) => n.frequency))}>
            {t('listenScale')}
          </button>
        </div>

        <div className="scale-column">
          <h3>{t('pythagorean')}</h3>
          <table>
            <thead>
              <tr>
                <th>{t('thNote')}</th>
                <th>{t('thFrequencyHz')}</th>
                <th>{t('thInterval')}</th>
                <th>{t('thSemitones')}</th>
              </tr>
            </thead>
            <tbody>
              {pythagorean.map((note, i) => (
                <tr key={i}>
                  <td>{note.name}{note.octave}</td>
                  <td>{note.frequency.toFixed(2)}</td>
                  <td>{tInterval(note.semitonesFromRoot)}</td>
                  <td>{note.semitonesFromRoot}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => playScale(pythagorean.map((n) => n.frequency))}>
            {t('listenScale')}
          </button>
        </div>
      </div>

      <h3>{t('intervals')}</h3>
      <table>
        <thead>
          <tr>
            <th>{t('thInterval')}</th>
            <th>{t('thTemperedHz')}</th>
            <th>{t('thPythagoreanHz')}</th>
            <th>{t('thBeatTempered')}</th>
            <th>{t('thPeriod')}</th>
            <th>{t('thBeatPythagorean')}</th>
            <th>{t('thPeriod')}</th>
            <th>{t('thListen')}</th>
          </tr>
        </thead>
        <tbody>
          {INTERVAL_ROWS.map(({ key, semitones }) => {
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
                <td>{t(key)}</td>
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
