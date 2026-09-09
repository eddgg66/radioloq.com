import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 15V4" /><path d="M8.5 7.5L12 4l3.5 3.5" />
    <path d="M5 14v4.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V14" />
  </svg>
);
const LensIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4-4" />
  </svg>
);
const TogetherIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5.5h9A1.5 1.5 0 0 1 14.5 7v4A1.5 1.5 0 0 1 13 12.5H7L4 15V5.5z" />
    <path d="M10 12.5v.5A1.5 1.5 0 0 0 11.5 14.5H17l3 2.5V9A1.5 1.5 0 0 0 18.5 7.5H16" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l7 3v5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6l7-3z" /><path d="M9 11.5l2 2 4-4.5" />
  </svg>
);

const STEPS = [
  { n: '01', title: 'st1', desc: 'sd1', Icon: ShareIcon },
  { n: '02', title: 'st2', desc: 'sd2', Icon: LensIcon },
  { n: '03', title: 'st3', desc: 'sd3', Icon: TogetherIcon },
  { n: '04', title: 'st4', desc: 'sd4', Icon: ShieldIcon },
];

const MUTED = '#9498AC';
const BLUE = '#3B82F6';

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how" style={{ background: '#fff', padding: '96px 32px' }}>
      <div className="container">
        <div className="eyebrow">{t('s1-lbl')}</div>
        <h2 className="section-title">{t('s1-head')}</h2>
        <p className="section-sub">{t('s1-sub')}</p>

        <div className="hiw-grid">
          {STEPS.map((s, i) => {
            const delay = i * 0.14;
            return (
              <motion.div
                key={s.n}
                className="hiw-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.5, delay }}
                style={{ position: 'relative', padding: '4px 4px 0' }}
              >
                {/* premium linear accent — draws in, no connecting spine */}
                <motion.div
                  className="hiw-line"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ duration: 0.6, delay: delay + 0.1, ease: 'easeOut' }}
                  style={{
                    height: 2, width: 40, borderRadius: 2, transformOrigin: 'left',
                    background: 'linear-gradient(90deg, var(--navy), var(--blue))', marginBottom: 22,
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <motion.span
                    className="hiw-icon"
                    initial={{ color: MUTED }}
                    whileInView={{ color: BLUE }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={{ duration: 0.5, delay: delay + 0.15 }}
                    style={{ display: 'inline-flex' }}
                  >
                    <s.Icon />
                  </motion.span>
                  <motion.span
                    initial={{ color: '#E3E7EF' }}
                    whileInView={{ color: BLUE }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={{ duration: 0.5, delay: delay + 0.15 }}
                    style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 800, letterSpacing: '.04em', marginLeft: 'auto' }}
                  >
                    {s.n}
                  </motion.span>
                </div>

                <h4 style={{ fontSize: 17.5, fontWeight: 700, marginBottom: 9, letterSpacing: '-.2px' }}>{t(s.title)}</h4>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{t(s.desc)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .hiw-grid{
          display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-top:8px;
        }
        .hiw-card{
          border-radius:20px; border:1px solid var(--border); background:#fff;
          padding:28px 24px !important;
          transition:box-shadow .3s ease, border-color .3s ease;
        }
        .hiw-card:hover{
          box-shadow:0 22px 46px -18px rgba(10,35,63,.28);
          border-color:var(--border2);
        }
        /* hover micro-interactions */
        .hiw-card .hiw-line{ transition:width .3s ease; }
        .hiw-card:hover .hiw-line{ width:64px; }
        .hiw-card .hiw-icon{ transition:transform .3s ease; }
        .hiw-card:hover .hiw-icon{ transform:translateY(-2px); }
        @media(max-width:1000px){ .hiw-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:620px){ .hiw-grid{ grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}
