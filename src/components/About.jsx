import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" style={{ background: '#fff', padding: '96px 32px' }}>
      <div className="container">
        <div className="eyebrow">{t('s4-lbl')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 48, alignItems: 'center' }} className="about-grid">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              width: 260, height: 260, borderRadius: 24, border: '1px solid var(--border)',
              overflow: 'hidden', flexShrink: 0,
            }}
          >
            <img
              src="/photo.jpg"
              alt="Adalat Ganjali"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 30, fontWeight: 800, marginBottom: 5, letterSpacing: '-.4px' }}>
              {t('a-name')}
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--teal-dark)', fontWeight: 600, marginBottom: 20 }}>
              {t('a-role')}
            </div>
            <p style={{ fontSize: 15.5, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>{t('a-bio')}</p>
            <p style={{
              fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.7, padding: '14px 18px',
              borderRadius: 14, background: 'var(--cream2)',
            }}>
              {t('a-notice')}
            </p>
          </motion.div>
        </div>
      </div>
      <style>{`@media(max-width:700px){.about-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
