import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const ChatIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 20l1.4-4.2a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12 3.5a8.38 8.38 0 0 1 9 8z"/>
    <path d="M8.5 12h7M8.5 9h4"/>
  </svg>
);

export default function FirstAssessment() {
  const { t } = useLanguage();

  return (
    <section id="first-assessment" style={{ background: '#fff', padding: '52px 32px' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'relative', width: '100%', maxWidth: 720, margin: '0 auto',
            textAlign: 'center', overflow: 'hidden',
            background: 'linear-gradient(180deg, var(--cream2) 0%, #fff 100%)',
            border: '1px solid var(--border2)', borderRadius: 28,
            padding: '56px 48px 52px',
            boxShadow: '0 24px 60px -30px rgba(10,35,63,.28)',
          }}
        >
          {/* symmetric soft glow, centered top */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: -140, left: '50%', transform: 'translateX(-50%)',
            width: 460, height: 460, pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(59,130,246,.12) 0%, transparent 70%)',
          }} />

          <div style={{ position: 'relative' }}>
            {/* centered medallion */}
            <div style={{
              width: 58, height: 58, borderRadius: 18, margin: '0 auto 22px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--grad)', boxShadow: '0 14px 30px -6px rgba(59,130,246,.5)',
            }}>
              <ChatIcon />
            </div>

            <div className="eyebrow" style={{ marginBottom: 12 }}>{t('fa-lbl')}</div>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(25px,3.4vw,34px)',
              fontWeight: 800, letterSpacing: '-.5px', lineHeight: 1.2, marginBottom: 16,
              maxWidth: 520, marginLeft: 'auto', marginRight: 'auto',
            }}>
              {t('fa-head')}
            </h2>
            <p style={{ fontSize: 15.5, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 500, margin: '0 auto 30px' }}>
              {t('fa-sub')}
            </p>
            <motion.a
              whileHover={{ y: -2, boxShadow: '0 22px 44px -10px rgba(59,130,246,.5)' }}
              whileTap={{ scale: 0.97 }}
              href="https://calendly.com/adalat-ganjali/15min"
              target="_blank"
              rel="noreferrer"
              onClick={() => window.gtag && window.gtag('event', 'free_intro_click', { event_category: 'funnel', event_label: 'first_assessment' })}
              style={{
                display: 'inline-block', background: 'var(--grad)', color: '#fff',
                padding: '16px 38px', borderRadius: 99, fontWeight: 600, fontSize: 15,
                boxShadow: '0 16px 32px -8px rgba(59,130,246,.42)',
              }}
            >
              {t('fa-btn')}
            </motion.a>
            <div style={{ fontSize: 12.5, color: 'var(--faint)', marginTop: 18, fontWeight: 500 }}>
              {t('fa-note')}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
