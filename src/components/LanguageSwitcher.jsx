import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'az', label: 'Azərbaycanca' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ru', label: 'Русский' },
];

const GlobeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.6 2.5 4 5.7 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.7-4-9s1.4-6.5 4-9z" />
    <path d="M4.6 7.5h14.8M4.6 16.5h14.8" />
  </svg>
);

export default function LanguageSwitcher({ color = 'var(--ink)' }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onEsc);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onEsc); };
  }, []);

  const current = LANGS.find((l) => l.code === lang) || LANGS[0];

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Select language"
        aria-expanded={open}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 7, color,
          background: 'transparent', border: 'none', padding: '8px 4px',
          fontSize: 13.5, fontWeight: 600, transition: 'color .4s',
        }}
      >
        <GlobeIcon />
        <span>{current.label}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 10px)', right: 0, minWidth: 176,
          background: '#fff', border: '1px solid var(--border)', borderRadius: 14,
          boxShadow: '0 18px 44px rgba(22,24,43,.16)', padding: 6, zIndex: 1000,
        }}>
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left',
                padding: '10px 12px', borderRadius: 10, border: 'none',
                background: l.code === lang ? 'var(--cream2)' : 'transparent',
                color: l.code === lang ? 'var(--ink)' : 'var(--muted)',
                fontSize: 13.5, fontWeight: l.code === lang ? 700 : 500, transition: 'background .15s',
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--faint)', width: 22, flexShrink: 0 }}>{l.code.toUpperCase()}</span>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
