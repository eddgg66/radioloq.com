import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function Hero({ onOpenModal }) {
  const { t } = useLanguage();

  return (
    <div style={{ position: 'relative', background: 'var(--navy-deep)', overflow: 'hidden' }}>
      {/* Soft breathing glow — no grid, no hard edges */}
      <div style={{
        position: 'absolute', top: -320, left: '50%', transform: 'translateX(-50%)',
        width: 1100, height: 1100, pointerEvents: 'none',
      }} className="calm-glow" />

      <section style={{
        position: 'relative', zIndex: 2, padding: '150px 48px 0',
        textAlign: 'center', maxWidth: 900, margin: '0 auto',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 13, fontWeight: 400,
            color: 'var(--blue-whisper)', marginBottom: 36, background: 'rgba(255,255,255,.06)',
            padding: '9px 20px', borderRadius: 99, border: '1px solid rgba(255,255,255,.1)',
          }}
        >
          <motion.span
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue-soft)' }}
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span>{t('h-badge')}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600,
            fontSize: 'clamp(38px, 5.6vw, 64px)', lineHeight: 1.18, color: '#fff',
            maxWidth: 760, margin: '0 auto 28px', letterSpacing: '-0.015em',
          }}
          dangerouslySetInnerHTML={{ __html: t('h-title').replace(/<em>/g, '<em style="font-style:normal;font-weight:800;color:var(--blue-soft)">') }}
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: 18, color: 'rgba(255,255,255,.55)', maxWidth: 520, margin: '0 auto 48px', fontWeight: 300, lineHeight: 1.75 }}
        >
          {t('h-sub')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}
        >
          <motion.a
            whileHover={{ y: -2, boxShadow: '0 24px 48px -10px rgba(59,130,246,.6)' }}
            whileTap={{ scale: 0.97 }}
            href="#pricing"
            style={{
              display: 'inline-block', textAlign: 'center',
              background: 'var(--blue)', color: '#fff', border: 'none', padding: '17px 38px',
              borderRadius: 99, fontWeight: 600, fontSize: 15.5,
              boxShadow: '0 20px 40px -10px rgba(59,130,246,.5)',
            }}
          >
            {t('h-cta1')}
          </motion.a>
          <motion.a
            whileHover={{ y: -1, borderColor: 'rgba(255,255,255,.3)' }}
            href="#how"
            style={{
              display: 'inline-block', background: 'transparent', color: 'rgba(255,255,255,.9)',
              padding: '16px 34px', borderRadius: 99, fontWeight: 500, fontSize: 15.5,
              border: '1px solid rgba(255,255,255,.16)',
            }}
          >
            {t('h-cta2')}
          </motion.a>
        </motion.div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          href="https://calendly.com/adalat-ganjali/15min"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', marginBottom: 90, color: 'var(--blue-whisper)', fontSize: 13.5, fontWeight: 400,
            borderBottom: '1px solid rgba(199,219,251,.35)', paddingBottom: 1,
          }}
        >
          {t('h-cta3')}
        </motion.a>

        {/* Soft glass proof card — scan / plain-language preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'relative', zIndex: 2, maxWidth: 640, margin: '0 auto',
            background: 'rgba(255,255,255,.04)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,.08)', borderRadius: 28,
            padding: '36px 40px', textAlign: 'left',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32,
          }}
        >
          <div>
            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--blue-whisper)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 16, display: 'block', opacity: 0.7 }}>
              {t('h-badge') ? 'Your Scan' : 'Your Scan'}
            </span>
            <div style={proofLine(100)} />
            <div style={proofLine(80)} />
            <div style={proofLine(55)} />
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--blue-whisper)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 16, display: 'block', opacity: 0.7 }}>
              Plain-Language Read
            </span>
            <div style={proofLine(100)} />
            <div style={proofLine(100)} />
            <div style={proofLine(65)} />
          </div>
        </motion.div>
      </section>

      {/* Smooth fade from dark hero into white content below */}
      <div style={{
        height: 160, background: 'linear-gradient(180deg, var(--navy-deep) 0%, #fff 100%)',
        position: 'relative', zIndex: 2, marginTop: -80,
      }} />

      <style>{`
        .calm-glow{
          background:
            radial-gradient(circle at 35% 40%, rgba(59,130,246,.22) 0%, transparent 60%),
            radial-gradient(circle at 65% 55%, rgba(143,184,245,.14) 0%, transparent 55%);
          filter:blur(60px);
          animation: calmBreathe 11s ease-in-out infinite;
        }
        @keyframes calmBreathe{
          0%,100%{transform:translateX(-50%) scale(1);opacity:.75}
          50%{transform:translateX(-48%) scale(1.12);opacity:1}
        }
        @media(max-width:600px){
          .calm-glow{width:700px!important;height:700px!important}
        }
      `}</style>
    </div>
  );
}

function proofLine(widthPct) {
  return {
    height: 8, borderRadius: 4, background: 'rgba(255,255,255,.06)',
    marginBottom: 10, width: `${widthPct}%`,
  };
}
