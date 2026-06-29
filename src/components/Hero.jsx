import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function Hero({ onOpenModal }) {
  const { t } = useLanguage();

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const heroLift = useTransform(scrollY, [0, 420], [0, -70]);
  const heroScale = useTransform(scrollY, [0, 3600], [1, 0.93]);

  return (
    <section
      style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '130px 32px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Simple, proven background effect: soft pulse + scanning line ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="hero-pulse" />
        <div className="hero-scanline" />
      </div>

      <motion.div
        style={{ maxWidth: 740, position: 'relative', zIndex: 1, opacity: heroOpacity, y: heroLift, scale: heroScale }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600,
            color: 'var(--teal-dark)', marginBottom: 30, background: 'var(--teal-tint)',
            padding: '8px 18px', borderRadius: 99, border: '1px solid rgba(15,191,168,.18)',
          }}
        >
          <motion.span
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal), var(--purple))' }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span>{t('h-badge')}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: 'clamp(34px, 5.6vw, 62px)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: 22, letterSpacing: '-1px', fontWeight: 800 }}
          dangerouslySetInnerHTML={{ __html: t('h-title').replace(/<em>/g, '<em style="font-style:normal;background:linear-gradient(100deg,var(--teal),var(--purple));-webkit-background-clip:text;background-clip:text;color:transparent">') }}
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: 'clamp(15px,1.8vw,18px)', color: 'var(--muted)', maxWidth: 560, margin: '0 auto 42px', lineHeight: 1.75 }}
        >
          {t('h-sub')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ y: -2, boxShadow: '0 16px 36px rgba(123,97,255,.36)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOpenModal('Basic — €49')}
            className="btn-primary"
          >
            {t('h-cta1')}
          </motion.button>
          <motion.a
            whileHover={{ y: -1, borderColor: 'var(--purple)' }}
            href="#how"
            className="btn-outline"
            style={{ display: 'inline-block' }}
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
            display: 'inline-flex', marginTop: 18, color: 'var(--teal-dark)', fontSize: 13.5, fontWeight: 500,
            borderBottom: '1px solid rgba(15,191,168,.35)', paddingBottom: 1,
          }}
        >
          {t('h-cta3')}
        </motion.a>
      </motion.div>
    </section>
  );
}
