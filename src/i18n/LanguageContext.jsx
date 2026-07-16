import { createContext, useContext, useEffect, useState } from 'react';
import translations from './translations.json';
import modalTranslations from './modalTranslations.json';

const LanguageContext = createContext(null);
const SUPPORTED = ['en', 'tr', 'az', 'de', 'ru'];
const STORAGE_KEY = 'radioloq-lang';

// Country → language mapping
const COUNTRY_LANG_OVERRIDE = {
  // Turkish
  TR: 'tr',
  // Azerbaijani
  AZ: 'az',
  // German (Germany, Austria, Switzerland)
  DE: 'de', AT: 'de', CH: 'de',
  // Russian (Russia + CIS + Baltic ex-Soviet states)
  RU: 'ru',
  UA: 'ru', // Ukraine
  KZ: 'ru', // Kazakhstan
  TJ: 'ru', // Tajikistan
  UZ: 'ru', // Uzbekistan
  GE: 'ru', // Georgia
  AM: 'ru', // Armenia
  EE: 'ru', // Estonia
  LV: 'ru', // Latvia
  BY: 'ru', // Belarus
  LT: 'ru', // Lithuania
};

function detectBrowserLanguage() {
  if (typeof navigator === 'undefined') return 'en';
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    const code = raw.toLowerCase().split('-')[0];
    if (SUPPORTED.includes(code)) return code;
  }
  return 'en';
}

function getSavedLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch (e) { /* localStorage unavailable */ }
  return null;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => getSavedLang() || detectBrowserLanguage());

  useEffect(() => {
    if (getSavedLang()) return;
    fetch('/api/geo')
      .then((res) => res.json())
      .then((data) => {
        const override = COUNTRY_LANG_OVERRIDE[data.country];
        if (override && !getSavedLang()) {
          setLangState(override);
        }
      })
      .catch(() => { /* keep browser-language result */ });
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch (e) { /* ignore */ }
  };

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
