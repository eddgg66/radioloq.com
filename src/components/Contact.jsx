import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/>
    <path d="M3.5 6.5l8.5 6.2 8.5-6.2"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="2.5"/>
    <path d="M3 9.5h18"/>
    <path d="M8 3v4M16 3v4"/>
    <circle cx="8" cy="14" r="1"/>
    <circle cx="12" cy="14" r="1"/>
    <circle cx="16" cy="14" r="1"/>
  </svg>
);

const NetworkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="2.4"/>
    <circle cx="18" cy="6" r="2.4"/>
    <circle cx="12" cy="18" r="2.4"/>
    <path d="M7.9 7.4L10.3 16M16.1 7.4L13.7 16M8.4 6h7.2"/>
  </svg>
);

export default function Contact() {
  const { t } = useLanguage();

  const cards = [
    { Icon: MailIcon, typeKey: 'c2-type', labelKey: 'c2-label', btnKey: 'c2-btn', href: 'mailto:info@radioloq.com' },
    { Icon: CalendarIcon, typeKey: 'c3-type', labelKey: 'c3-label', btnKey: 'c3-btn', href: 'https://calendly.com/adalat-ganjali/15min' },
    { Icon: NetworkIcon, typeKey: 'c4-type', labelKey: 'c4-label', btnKey: 'c4-btn', href: 'https://linkedin.com/in/adalatganjali' },
  ];

  return (
    <section id="contact" style={{ background: '#fff', padding: '96px 32px' }}>
      <div className="container">
        <div className="eyebrow">{t('s6-lbl')}</div>
        <h2 className="section-title" style={{ marginBottom: 48 }}>{t('s6-head')}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }} className="contact-grid">
          {cards.map((c, i) => (
            <motion.div
              key={c.typeKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(22,24,43,.08)' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 20, padding: '32px 26px' }}
            >
              <div style={{ color: 'var(--ink)', marginBottom: 16 }}>
                <c.Icon />
              </div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--faint)', fontWeight: 600, marginBottom: 5 }}>
                {t(c.typeKey)}
              </div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 18, letterSpacing: '-.1px' }}>
                {t(c.labelKey)}
              </div>
              <motion.a
                whileHover={{ opacity: 0.9 }}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                style={{
                  display: 'block', width: '100%', padding: 13, fontSize: 13.5, fontWeight: 600,
                  background: 'var(--ink)', color: '#fff', borderRadius: 99, textAlign: 'center',
                }}
              >
                {t(c.btnKey)}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
