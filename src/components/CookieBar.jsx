import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

function loadGA() {
  if (window.gaLoaded) return;
  window.gaLoaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-BVC0651H14';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-BVC0651H14');
}

function unloadGA() {
  // Best-effort: stop future tracking. Already-set gaLoaded flag prevents reloading
  // without a full page reload, which is acceptable for a reject-after-accept edge case.
  window['ga-disable-G-BVC0651H14'] = true;
}

export default function CookieBar() {
  const { t, lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      loadGA();
    } else if (!consent) {
      setVisible(true);
    }

    // Allow reopening from the footer "Cookie Settings" link at any time
    const reopen = () => setVisible(true);
    window.addEventListener('radioloq-open-cookie-settings', reopen);
    return () => window.removeEventListener('radioloq-open-cookie-settings', reopen);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    loadGA();
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    unloadGA();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', bottom: 16, left: 16, right: 16, maxWidth: 680, margin: '0 auto',
            background: '#fff', border: '1px solid rgba(22,24,43,.1)', borderRadius: 18,
            boxShadow: '0 20px 50px rgba(22,24,43,.18)', padding: '16px 22px', zIndex: 9999,
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          }}
        >
          <p style={{ fontSize: 12.5, color: '#5B6178', margin: 0, lineHeight: 1.5, flex: 1, minWidth: 200 }}>
            {t('cookie-text')}{' '}
            <a href={`/terms-${lang}.html`} style={{ color: '#16182B', textDecoration: 'underline' }}>{t('cookie-terms-link')}</a>{' '}
            {t('cookie-and')}{' '}
            <a href={`/privacy-${lang}.html`} style={{ color: '#16182B', textDecoration: 'underline' }}>{t('cookie-privacy-link')}</a>.
          </p>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button onClick={reject} style={{
              background: '#F7F6FD', color: '#16182B', border: '1px solid rgba(22,24,43,.13)',
              padding: '9px 18px', fontSize: 12.5, fontWeight: 600, borderRadius: 99,
            }}>
              {t('cookie-reject')}
            </button>
            <button onClick={accept} style={{
              background: 'linear-gradient(100deg,#0A233F,#3B82F6)', color: '#fff', border: 'none',
              padding: '9px 22px', fontSize: 12.5, fontWeight: 600, borderRadius: 99,
            }}>
              {t('cookie-accept')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
