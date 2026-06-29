import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function PullQuote() {
  const { t } = useLanguage();
  return (
    <section style={{ background: '#fff', padding: '0 32px 96px' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            padding: '32px 36px', borderRadius: 20,
            background: 'linear-gradient(100deg, var(--teal-tint), var(--cream3))',
          }}
        >
          <p style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 600,
            color: 'var(--ink)', lineHeight: 1.55, letterSpacing: '-.3px',
          }}>
            {t('pq-text')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
