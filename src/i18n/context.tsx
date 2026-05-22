import { useState, type ReactNode } from 'react';
import translations, { type Lang, type TranslationKey } from './translations';
import { I18nContext } from './hooks';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');

  const t = (key: TranslationKey) => translations[lang][key] as string;

  const tInterval = (semitones: number) =>
    translations[lang].intervalNames[semitones] ?? '—';

  return (
    <I18nContext.Provider value={{ lang, setLang, t, tInterval }}>
      {children}
    </I18nContext.Provider>
  );
}
