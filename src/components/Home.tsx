import { useI18n } from '../i18n/hooks';

export function Home() {
  const { t } = useI18n();

  const features = [
    { label: t('tabScales'), text: t('homeFeatureScales') },
    { label: t('tabComparison'), text: t('homeFeatureComparison') },
    { label: t('tabBeats'), text: t('homeFeatureBeats') },
    { label: t('tabOvertones'), text: t('homeFeatureOvertones') },
    { label: t('tabMethodology'), text: t('homeFeatureMethodology') },
  ];

  return (
    <section className="methodology">
      <h2>{t('homeTitle')}</h2>
      <p>{t('homeText')}</p>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1.5rem' }}>
        {features.map((f) => (
          <li key={f.label} style={{ marginBottom: '0.75rem' }}>
            <strong>{f.label}</strong> — {f.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
