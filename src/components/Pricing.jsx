import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function Pricing({ onOpenModal }) {
  const { t } = useLanguage();

  const tiers = [
    {
      pkg: 'Basic — €49', tierKey: 'p1-tier', nameKey: 'p1-name', amt: '€49', perKey: 'p1-per',
      descKey: 'p1-desc', feats: ['p1f1', 'p1f2', 'p1f3', 'p1f4'], btnKey: 'p1-btn', dot: '#0FBFA8',
    },
    {
      pkg: 'Standard — €89', tierKey: 'p2-tier', nameKey: 'p2-name', amt: '€89', perKey: 'p2-per', popular: true,
      badgeKey: 'p2-badge', descKey: 'p2-desc', feats: ['p2f1', 'p2f2', 'p2f3'], btnKey: 'p2-btn', dot: '#7B61FF',
    },
    {
      pkg: 'Premium — €99', tierKey: 'p3-tier', nameKey: 'p3-name', amt: '€99', perKey: 'p3-per',
      badgeKey: 'p3-badge', descKey: 'p3-desc', feats: ['p3f1', 'p3f2', 'p3f3', 'p3f4'], btnKey: 'p3-btn', dot: '#0FBFA8',
    },
  ];

  return (
    <section id="pricing" style={{ background: 'var(--cream2)', padding: '96px 32px' }}>
      <div className="container">
        <div className="eyebrow">{t('s2-lbl')}</div>
        <h2 className="section-title">{t('s2-head')}</h2>
        <p className="section-sub" style={{ marginBottom: 4 }}>{t('s2-sub')}</p>
        <p style={{ fontSize: 11, color: 'var(--faint)', marginBottom: 40 }}>{t('s2-vat')}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }} className="pricing-grid">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.pkg}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -4, boxShadow: '0 24px 48px rgba(22,24,43,.08)' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: tier.popular ? 'linear-gradient(180deg,#fff 0%,var(--cream3) 160%)' : '#fff',
                border: `1.5px solid ${tier.popular ? 'var(--purple)' : 'var(--border)'}`,
                borderRadius: 22, padding: '32px 26px', position: 'relative',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {tier.badgeKey && (
                <span style={{
                  position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                  fontSize: 11, padding: '6px 16px', whiteSpace: 'nowrap', fontWeight: 700, borderRadius: 99,
                  background: tier.popular ? 'var(--grad)' : 'var(--ink)', color: '#fff',
                }}>
                  {t(tier.badgeKey)}
                </span>
              )}
              <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--muted)', fontWeight: 600, marginBottom: 8 }}>
                {t(tier.tierKey)}
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 19, fontWeight: 700, marginBottom: 14, letterSpacing: '-.2px' }}>
                {t(tier.nameKey)}
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 38, fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>
                {tier.amt}<span style={{ fontSize: 13.5, fontFamily: "'Inter',sans-serif", color: 'var(--muted)', fontWeight: 500 }}>{t(tier.perKey)}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', margin: '12px 0 16px', paddingBottom: 16, borderBottom: '1px solid var(--border)', lineHeight: 1.65 }}>
                {t(tier.descKey)}
              </div>
              <ul style={{ listStyle: 'none', marginBottom: 24, flex: 1 }}>
                {tier.feats.filter(f => t(f)).map((f) => (
                  <li key={f} style={{ fontSize: 13.5, padding: '7px 0', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, marginTop: 6, background: tier.dot }} />
                    {t(f)}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenModal(tier.pkg)}
                style={{
                  width: '100%', padding: 14, fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 99,
                  background: tier.popular ? 'var(--grad)' : 'var(--ink)', color: '#fff',
                  boxShadow: tier.popular ? '0 10px 24px rgba(123,97,255,.26)' : 'none',
                }}
              >
                {t(tier.btnKey)}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.pricing-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
