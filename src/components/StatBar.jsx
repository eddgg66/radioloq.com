import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function StatBar() {
  const { t } = useLanguage();
  const stats = [
    { num: '48h', key: 't1' },
    { num: '5', key: 't2' },
    { num: '100%', key: 't3' },
    { num: '🔒', key: 't4' },
  ];

  return (
    <div style={{ background: 'var(--cream2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{
        maxWidth: 1060, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
      }} className="statbar-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{ padding: '30px 18px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}
          >
            <div style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 30, fontWeight: 800, lineHeight: 1, marginBottom: 6,
              background: 'linear-gradient(100deg, var(--teal-dark), var(--purple))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>
              {s.num}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 500 }}>{t(s.key)}</div>
          </motion.div>
        ))}
      </div>
      <style>{`@media(max-width:760px){.statbar-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </div>
  );
}
