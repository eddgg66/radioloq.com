import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState(null);

  const items = [1, 2, 3, 4, 5, 6];

  return (
    <section id="faq" style={{ background: 'var(--cream2)', padding: '96px 32px' }}>
      <div className="container">
        <div className="eyebrow">{t('faq-lbl')}</div>
        <h2 className="section-title">{t('faq-head')}</h2>

        <div style={{ maxWidth: 720, margin: '24px auto 0' }}>
          {items.map((i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{
                  borderRadius: 18, background: '#fff', marginBottom: 12, overflow: 'hidden',
                  border: '1px solid var(--border)',
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  style={{
                    width: '100%', background: 'none', border: 'none', padding: '22px 26px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    textAlign: 'left', gap: 20, fontSize: 15.5, fontWeight: 500,
                    color: isOpen ? 'var(--purple)' : 'var(--ink)',
                  }}
                >
                  <span>{t(`faq-q${i}`)}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 135 : 0, background: isOpen ? 'var(--grad)' : 'var(--teal-tint)', color: isOpen ? '#fff' : 'var(--teal-dark)' }}
                    transition={{ duration: 0.4, ease: [0.34, 1.2, 0.64, 1] }}
                    style={{
                      width: 26, height: 26, borderRadius: '50%', fontSize: 17,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 26px 24px', fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.85 }}>
                        {t(`faq-a${i}`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
