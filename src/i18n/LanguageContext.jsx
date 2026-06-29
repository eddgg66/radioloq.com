import { createContext, useContext, useState } from 'react';
import translations from './translations.json';
import modalTranslations from './modalTranslations.json';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = (key) => translations[lang]?.[key] ?? translations.en[key] ?? key;
  const mt = (key) => modalTranslations[lang]?.[key] ?? modalTranslations.en[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, mt }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
