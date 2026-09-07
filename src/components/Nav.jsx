import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Nav({ onOpenModal }) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  // Hero background is dark navy — nav text starts light, flips to dark ink once scrolled past it
  const textColor = scrolled ? 'var(--ink)' : '#fff';
  const mutedColor = scrolled ? 'var(--muted)' : 'rgba(255,255,255,.65)';

  return (
    <motion.nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, height: 68,
        display: 'flex', alignItems: 'center', padding: '0 48px',
        background: scrolled ? 'rgba(255,255,255,.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background .4s, backdrop-filter .4s, border-color .4s, color .4s',
      }}
    >
      <a href="#" style={{
        fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 20, color: textColor,
        marginRight: 'auto', letterSpacing: '-.3px', display: 'flex', alignItems: 'center', gap: 8,
        transition: 'color .4s',
      }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: scrolled ? 'var(--grad)' : 'var(--blue-soft)' }} />
        Radioloq
      </a>

      <div style={{ display: 'flex', gap: 2, marginRight: 16 }} className="nav-links-desktop">
        <a href="#how" className="nav-link" style={{ color: mutedColor }}>{t('nl-how')}</a>
        <a href="#pricing" className="nav-link" style={{ color: mutedColor }}>{t('nl-price')}</a>
        <a href="#about" className="nav-link" style={{ color: mutedColor }}>{t('nl-about')}</a>
      </div>

      <motion.a
        whileHover={{ y: -1 }}
        href="#pricing"
        style={{
          display: 'inline-block',
          background: scrolled ? 'var(--grad)' : 'rgba(255,255,255,.1)',
          color: '#fff', border: scrolled ? 'none' : '1px solid rgba(255,255,255,.18)',
          padding: '10px 22px', borderRadius: 99, fontSize: 13.5, fontWeight: 600,
          boxShadow: scrolled ? '0 8px 20px rgba(59,130,246,.22)' : 'none',
          transition: 'background .4s, box-shadow .4s, border-color .4s',
        }}
      >
        {t('nl-cta')}
      </motion.a>

      <style>{`
        .nav-link{font-size:13.5px;font-weight:500;padding:8px 14px;border-radius:99px;transition:color .4s,background .2s}
        .nav-link:hover{background:rgba(120,120,120,.08)}
        @media(max-width:860px){.nav-links-desktop{display:none!important}}
      `}</style>
    </motion.nav>
  );
}
