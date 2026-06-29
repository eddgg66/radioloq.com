import { useLanguage } from '../i18n/LanguageContext';

const LANGS = ['en', 'tr', 'az', 'de', 'ru'];

export default function LanguageToolbar() {
  const { lang, setLang } = useLanguage();

  return (
    <div style={{
      background: '#fff', borderBottom: '1px solid var(--border)',
      padding: '14px 16px', display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap',
    }}>
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            fontSize: 12.5, fontWeight: 600, padding: '7px 16px', borderRadius: 20,
            border: `1px solid ${lang === l ? 'var(--ink)' : 'var(--border2)'}`,
            background: lang === l ? 'var(--ink)' : 'transparent',
            color: lang === l ? '#fff' : 'var(--muted)',
            transition: 'all .15s',
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
