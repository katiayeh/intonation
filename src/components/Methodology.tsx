import { useI18n } from '../i18n/hooks';
import type { TranslationKey } from '../i18n/translations';

const CONSONANT_INTERVALS: { key: TranslationKey; ratio: string}[] = [
  { key: 'consonanceOctave', ratio: '2/1'},
  { key: 'consonanceFifth', ratio: '3/2'},
  { key: 'consonanceFourth', ratio: '4/3'},
  { key: 'consonanceMajorThird', ratio: '5/4'},
  { key: 'consonanceMinorThird', ratio: '6/5'},
];

const REF_URL = 'https://laum.univ-lemans.fr/fr/actualites/agenda2025/juin-2025/pourquoi-la-musique-sonne-t-elle-juste-ou-faux.html';

export function Methodology() {
  const { t } = useI18n();

  return (
    <section className="methodology">
      <h2>{t('methodologyTitle')}</h2>

      <h3>{t('definitions')}</h3>

      <div className="definition">
        <h4>{t('defBeatsTitle')}</h4>
        <p>{t('defBeatsText')}</p>
        <p style={{ marginTop: 12 }}>{t('defBeatsConsonance')}</p>
        <table>
          <thead>
            <tr>
              <th>{t('thInterval')}</th>
              <th>{t('thRatio')}</th>
            </tr>
          </thead>
          <tbody>
            {CONSONANT_INTERVALS.map(({ key, ratio}) => (
              <tr key={ratio}>
                <td>{t(key)}</td>
                <td>{ratio}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <sup>[1]</sup>
      </div>

      <h3>{t('references')}</h3>
      <ol className="references">
        <li>
          <a href={REF_URL} target="_blank" rel="noopener noreferrer">
            {t('ref1Text')}
          </a>
        </li>
      </ol>
    </section>
  );
}
