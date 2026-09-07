import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();
  const steps = [
    { n: '01', title: 'st1', desc: 'sd1' },
    { n: '02', title: 'st2', desc: 'sd2' },
    { n: '03', title: 'st3', desc: 'sd3' },
    { n: '04', title: 'st4', desc: 'sd4' },
  ];

  return (
    <section id="how" style={{ background: '#fff', padding: '96px 32px' }}>
      <div className="container">
        <div className="eyebrow">{t('s1-lbl')}</div>
        <h2 className="section-title">{t('s1-head')}</h2>
        <p className="section-sub">{t('s1-sub')}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }} className="how-grid">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -5, boxShadow: '0 20px 44px rgba(22,24,43,.09)' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: '#fff', border: '1px solid var(--border)', borderRadius: 20, padding: '30px 26px',
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 12, marginBottom: 18,
                background: 'linear-gradient(135deg, var(--teal-tint), var(--cream3))',
                color: 'var(--purple-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 800,
              }}>
                {s.n}
              </div>
              <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 9, letterSpacing: '-.2px' }}>{t(s.title)}</h4>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{t(s.desc)}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.how-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
