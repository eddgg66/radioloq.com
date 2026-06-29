import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const blobBase = {
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(55px)',
};

export default function Hero({ onOpenModal }) {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  // scroll-driven parallax + fade, scoped to this section's scroll progress
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const heroLift = useTransform(scrollY, [0, 420], [0, -70]);
  const heroScale = useTransform(scrollY, [0, 3600], [1, 0.93]);

  const blob1X = useTransform(scrollY, [0, 1000], [0, 180]);
  const blob1Y = useTransform(scrollY, [0, 1000], [0, -110]);
  const blob2X = useTransform(scrollY, [0, 1000], [0, -150]);
  const blob2Y = useTransform(scrollY, [0, 1000], [0, 80]);
  const blob3X = useTransform(scrollY, [0, 1000], [0, 100]);
  const blob3Y = useTransform(scrollY, [0, 1000], [0, -160]);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '130px 32px 80px',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* ── Breathing glow blobs (idle animation via Framer Motion) ── */}
      <div style={{ position: 'absolute', top: -100, left: 0, right: 0, height: 820, pointerEvents: 'none', overflow: 'visible', zIndex: 0 }}>
        <motion.div style={{ position: 'absolute', inset: 0, x: blob1X, y: blob1Y }}>
          <motion.div
            style={{ ...blobBase, width: 620, height: 620, left: '2%', top: -10, background: 'radial-gradient(circle, rgba(15,191,168,.55), transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.85, 1, 0.85], x: [0, 40, 0], y: [0, 50, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.div style={{ position: 'absolute', inset: 0, x: blob2X, y: blob2Y }}>
          <motion.div
            style={{ ...blobBase, width: 680, height: 680, right: '0%', top: 50, background: 'radial-gradient(circle, rgba(123,97,255,.50), transparent 70%)' }}
            animate={{ scale: [1, 1.16, 1], opacity: [0.8, 1, 0.8], x: [0, -50, 0], y: [0, -32, 0] }}
            transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.div style={{ position: 'absolute', inset: 0, x: blob3X, y: blob3Y }}>
          <motion.div
            style={{ ...blobBase, width: 580, height: 580, left: '32%', top: 165, background: 'radial-gradient(circle, rgba(15,191,168,.32), rgba(123,97,255,.32), transparent 72%)' }}
            animate={{ scale: [1, 1.24, 1], opacity: [0.7, 1, 0.7], x: [0, 28, 0], y: [0, -48, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* ── Hero content — fades/lifts/scales as user scrolls past ── */}
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
