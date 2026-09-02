import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function FirstAssessment() {
  const { t } = useLanguage();

  return (
    <section id="first-assessment" style={{ background: '#fff', padding: '80px 32px 8px' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: 780, margin: '0 auto', textAlign: 'center',
            background: 'linear-gradient(160deg, var(--cream2), #fff)',
            border: '1.5px solid var(--purple)', borderRadius: 26,
            padding: '48px 40px',
          }}
        >
          <div className="eyebrow" style={{ marginBottom: 14 }}>{t('fa-lbl')}</div>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(24px,3.4vw,34px)',
            fontWeight: 800, letterSpacing: '-.4px', marginBottom: 14, lineHeight: 1.2,
          }}>
            {t('fa-head')}
          </h2>
          <p style={{ fontSize: 15.5, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 580, margin: '0 auto 28px' }}>
            {t('fa-sub')}
          </p>
          <motion.a
            whileHover={{ y: -2, boxShadow: '0 20px 40px -10px rgba(59,130,246,.42)' }}
            whileTap={{ scale: 0.97 }}
            href="https://calendly.com/adalat-ganjali/15min"
            target="_blank"
            rel="noreferrer"
            onClick={() => window.gtag && window.gtag('event', 'free_intro_click', { event_category: 'funnel', event_label: 'first_assessment' })}
            style={{
              display: 'inline-block', background: 'var(--grad)', color: '#fff',
              padding: '15px 34px', borderRadius: 99, fontWeight: 600, fontSize: 15,
              boxShadow: '0 14px 30px rgba(59,130,246,.28)',
            }}
          >
            {t('fa-btn')}
          </motion.a>
          <div style={{ fontSize: 12.5, color: 'var(--faint)', marginTop: 16, fontWeight: 500 }}>
            {t('fa-note')}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
