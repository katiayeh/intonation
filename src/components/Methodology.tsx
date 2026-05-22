import { useI18n } from '../i18n/hooks';
import type { TranslationKey } from '../i18n/translations';

const CONSONANT_INTERVALS: { key: TranslationKey; ratio: string; value: string }[] = [
  { key: 'consonanceOctave', ratio: '2/1', value: '2' },
  { key: 'consonanceFifth', ratio: '3/2', value: '1.5' },
  { key: 'consonanceFourth', ratio: '4/3', value: '1.333…' },
  { key: 'consonanceMajorThird', ratio: '5/4', value: '1.25' },
  { key: 'consonanceMinorThird', ratio: '6/5', value: '1.2' },
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
              <th>{t('thRatioValue')}</th>
            </tr>
          </thead>
          <tbody>
            {CONSONANT_INTERVALS.map(({ key, ratio, value }) => (
              <tr key={ratio}>
                <td>{t(key)}</td>
                <td>{ratio}</td>
                <td>{value}</td>
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
