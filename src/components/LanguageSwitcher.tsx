import { useI18n } from '../i18n/hooks';
import './LanguageSwitcher.css';

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="lang-switcher">
      <button
        className={lang === 'fr' ? 'active' : ''}
        onClick={() => setLang('fr')}
      >
        FR
      </button>
      <button
        className={lang === 'en' ? 'active' : ''}
        onClick={() => setLang('en')}
      >
        EN
      </button>
    </div>
  );
}
