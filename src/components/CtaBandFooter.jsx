import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export function CtaBand() {
  const { t } = useLanguage();
  return (
    <section style={{
      background: 'linear-gradient(120deg,#0FBFA8,#7B61FF)', padding: '88px 32px',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(26px,4vw,44px)', color: '#fff', marginBottom: 14, letterSpacing: '-.5px', fontWeight: 800 }}>
          {t('cta-head')}
        </h2>
        <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,.85)', maxWidth: 460, margin: '0 auto 34px' }}>
          {t('cta-sub')}
        </p>
        <motion.a
          whileHover={{ y: -2 }}
          href="https://courses.radioloq.com"
          style={{
            display: 'inline-block', background: '#fff', color: 'var(--purple-dark)', padding: '15px 34px',
            borderRadius: 99, fontWeight: 600, fontSize: 15, boxShadow: '0 14px 30px rgba(0,0,0,.18)',
          }}
        >
          {t('cta-btn')}
        </motion.a>
      </motion.div>
    </section>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer style={{ background: '#fff', color: 'var(--muted)', padding: '48px 32px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 21, fontWeight: 800, color: 'var(--ink)', marginBottom: 14 }}>
        Radioloq
      </div>
      <div style={{ display: 'flex', gap: 22, justifyContent: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
        <a href="/terms.html" style={{ fontSize: 12.5, fontWeight: 500 }}>Terms</a>
        <a href="/privacy.html" style={{ fontSize: 12.5, fontWeight: 500 }}>Privacy</a>
        <a href="mailto:info@radioloq.com" style={{ fontSize: 12.5, fontWeight: 500 }}>info@radioloq.com</a>
      </div>
      <p style={{ fontSize: 11.5, maxWidth: 560, margin: '0 auto', lineHeight: 1.85, color: 'var(--faint)' }}>
        {t('footer-txt')}
      </p>
    </footer>
  );
}
