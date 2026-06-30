import { createContext, useContext, useEffect, useState } from 'react';
import translations from './translations.json';
import modalTranslations from './modalTranslations.json';

const LanguageContext = createContext(null);
const SUPPORTED = ['en', 'tr', 'az', 'de', 'ru'];
const STORAGE_KEY = 'radioloq-lang';

// Country code -> forced language. Only applied on first visit (no saved preference yet).
// These countries get their national language directly, regardless of browser language setting.
const COUNTRY_LANG_OVERRIDE = {
  AZ: 'az',
  TR: 'tr',
  RU: 'ru',
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

  // On first visit only (no saved preference), check visitor's country via Cloudflare edge geo
  // and override to a specific language where it makes sense (currently: Azerbaijan -> az).
  useEffect(() => {
    if (getSavedLang()) return; // user already has an explicit/detected preference, don't override
    fetch('/api/geo')
      .then((res) => res.json())
      .then((data) => {
        const override = COUNTRY_LANG_OVERRIDE[data.country];
        if (override && !getSavedLang()) {
          setLangState(override);
        }
      })
      .catch(() => { /* geo lookup unavailable — keep browser-language detection result */ });
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
