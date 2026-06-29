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

  return (
    <motion.nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, height: 68,
        display: 'flex', alignItems: 'center', padding: '0 48px',
        background: scrolled ? 'rgba(255,255,255,.88)' : 'rgba(255,255,255,0)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background .4s, backdrop-filter .4s, border-color .4s',
      }}
    >
      <a href="#" style={{
        fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 20, color: 'var(--ink)',
        marginRight: 'auto', letterSpacing: '-.3px', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal), var(--purple))' }} />
        Radioloq
      </a>

      <div style={{ display: 'flex', gap: 2, marginRight: 16 }} className="nav-links-desktop">
        <a href="#how" className="nav-link">{t('nl-how')}</a>
        <a href="#pricing" className="nav-link">{t('nl-price')}</a>
        <a href="#about" className="nav-link">{t('nl-about')}</a>
      </div>

      <motion.button
        whileHover={{ y: -1 }}
        onClick={() => onOpenModal('Basic — €49')}
        style={{
          background: 'var(--grad)', color: '#fff', border: 'none', padding: '10px 22px',
          borderRadius: 99, fontSize: 13.5, fontWeight: 600,
          boxShadow: '0 8px 20px rgba(123,97,255,.22)',
        }}
      >
        {t('nl-cta')}
      </motion.button>

      <style>{`
        .nav-link{color:var(--muted);font-size:13.5px;font-weight:500;padding:8px 14px;border-radius:99px;transition:all .2s}
        .nav-link:hover{color:var(--ink);background:var(--cream2)}
        @media(max-width:860px){.nav-links-desktop{display:none!important}}
      `}</style>
    </motion.nav>
  );
}
