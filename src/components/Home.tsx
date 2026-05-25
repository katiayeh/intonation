import { useI18n } from '../i18n/hooks';


export function Home() {
  const { t } = useI18n();

  return (
    <section className="methodology">
      <h2>{t('homeTitle')}</h2>

        <p>{t('homeText')}</p>
        
    </section>
  );
}
