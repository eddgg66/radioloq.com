import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const API_URL = 'https://radioloq-api.vercel.app';

const STRIPE = {
  'Basic — €52': 'https://buy.stripe.com/00w5kv7ji6nrh258nO8ww04',
  'Standard — €72': 'https://buy.stripe.com/fZu9AL6febHL1370Vm8ww05',
  'Premium — €83': 'https://buy.stripe.com/bJe3cn7ji3bf6nrdI88ww06',
};
const PAYPAL = {
  'Basic — €52': 'https://www.paypal.com/ncp/payment/FBBSBEV9XZQZ4',
  'Standard — €72': 'https://www.paypal.com/ncp/payment/MKFVEECTYTEDE',
  'Premium — €83': 'https://www.paypal.com/ncp/payment/KDWLGX32B8B28',
};

export default function UploadModal({ isOpen, pkg, initialStep, onClose }) {
  const { lang, mt } = useLanguage();
  const [step, setStep] = useState('payment'); // payment | pending | upload
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [priceChecked, setPriceChecked] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [stripeOpening, setStripeOpening] = useState(false);
  const [paypalOpening, setPaypalOpening] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [langPref, setLangPref] = useState('');
  const [note, setNote] = useState('');
  const [honey, setHoney] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const pollRef = useRef(null);

  // reset state every time modal opens for a (possibly new) package
  useEffect(() => {
    if (isOpen) {
      setStep(initialStep || 'payment');
      setTermsChecked(false);
      setPrivacyChecked(false);
      setShowErr(false);
      setStripeOpening(false);
      setPaypalOpening(false);
      setSubmitted(false);
      setNameErr(false);
      setEmailErr(false);
      document.body.style.overflow = 'hidden';
      window.gtag && window.gtag('event', 'modal_open', { event_category: 'funnel', event_label: pkg });
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, pkg, initialStep]);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // poll backend for Stripe session confirmation
  useEffect(() => {
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  const validate = () => {
    if (!termsChecked || !privacyChecked || !priceChecked) {
      setShowErr(true);
      return false;
    }
    return true;
  };

  const startPoll = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      const params = new URLSearchParams(window.location.search);
      const session = params.get('session');
      if (!session) return;
      try {
        const res = await fetch(`${API_URL}/verify?session=${session}`);
        const data = await res.json();
        if (data.valid) {
          clearInterval(pollRef.current);
          setStep('upload');
          window.history.replaceState({}, '', window.location.pathname);
        }
      } catch (e) { /* ignore */ }
    }, 2000);
  };

  const payStripe = () => {
    if (!validate()) return;
    window.gtag && window.gtag('event', 'payment_click', { event_category: 'funnel', event_label: pkg, payment_method: 'stripe' });
    const url = STRIPE[pkg];
    if (url) window.open(url, '_blank');
    setStripeOpening(true);
    setStep('pending');
    startPoll();
  };

  const payPayPal = () => {
    if (!validate()) return;
    window.gtag && window.gtag('event', 'payment_click', { event_category: 'funnel', event_label: pkg, payment_method: 'paypal' });
    const url = PAYPAL[pkg];
    if (url) window.open(url, '_blank');
    setPaypalOpening(true);
    setStep('pending');
    startPoll();
  };

  const confirmManually = () => setStep('upload');
  const goBack = () => setStep('payment');

  const submitForm = async () => {
    if (honey) return; // honeypot
    const nameMissing = !name.trim();
    const emailMissing = !email.trim();
    setNameErr(nameMissing);
    setEmailErr(emailMissing);
    if (nameMissing || emailMissing) return;
    setSubmitting(true);

    const payload = JSON.stringify({
      name, email, package: pkg || 'Not selected',
      language: langPref || 'Not selected',
      clinical_context: note || 'Not provided',
      _subject: `New scan request — Radioloq | ${pkg}`,
      _replyto: email,
    });

    const MAX_ATTEMPTS = 3;
    let lastError = null;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const res = await fetch('https://formspree.io/f/xrejnvok', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: payload,
        });
        if (res.ok) {
          window.gtag && window.gtag('event', 'upload_complete', { event_category: 'funnel', event_label: pkg });
          setSubmitted(true);
          setSubmitting(false);
          return;
        }
        lastError = new Error(`HTTP ${res.status}`);
      } catch (e) {
        lastError = e;
      }
      // wait briefly before retrying (skip wait after the last attempt)
      if (attempt < MAX_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
    }

    // all attempts failed — now show the error to the user
    console.error('Formspree submission failed after retries:', lastError);
    alert('Something went wrong — please try again or email info@radioloq.com directly.');
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(22,24,43,.55)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
            backdropFilter: 'blur(6px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            style={{
              background: '#fff', maxWidth: 560, width: '100%', maxHeight: '92vh', overflowY: 'auto',
              position: 'relative', borderRadius: 24, boxShadow: '0 40px 90px rgba(22,24,43,.25)',
            }}
          >
            <button onClick={onClose} style={{
              position: 'absolute', top: 18, right: 20, background: 'var(--cream2)', border: 'none',
              width: 30, height: 30, borderRadius: '50%', fontSize: 16, color: 'var(--muted)', zIndex: 2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>×</button>

            {step === 'payment' && (
              <>
                <div style={{ padding: '32px 32px 0' }}>
                  <h3 style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-.2px' }}>{mt('title')}</h3>
                  <p style={{ color: 'var(--teal-dark)', fontSize: 13, fontWeight: 600, marginTop: 4 }}>{pkg}</p>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginTop: 6 }}>{mt('sub')}</p>
                </div>
                <div style={{ padding: '20px 32px 32px' }}>
                  <div style={{ borderRadius: 14, background: '#FCEBEB', padding: '14px 18px', marginBottom: 20 }}>
                    <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.05em', color: '#A32D2D', fontWeight: 700, marginBottom: 4 }}>
                      {mt('discTitle')}
                    </div>
                    <div style={{ fontSize: 12.5, color: '#791F1F', lineHeight: 1.6 }}>{mt('discText')}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                    <label style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start', padding: '14px 16px',
                      border: `1px solid ${showErr && !termsChecked ? '#E24B4A' : 'var(--border)'}`,
                      background: showErr && !termsChecked ? '#FCEBEB' : 'var(--cream2)',
                      borderRadius: 14, cursor: 'pointer',
                    }}>
                      <input type="checkbox" checked={termsChecked} onChange={(e) => { setTermsChecked(e.target.checked); setShowErr(false); }} style={{ marginTop: 2, accentColor: 'var(--purple)' }} />
                      <span style={{ fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: mt('chk1') }} />
                    </label>
                    <label style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start', padding: '14px 16px',
                      border: `1px solid ${showErr && !privacyChecked ? '#E24B4A' : 'var(--border)'}`,
                      background: showErr && !privacyChecked ? '#FCEBEB' : 'var(--cream2)',
                      borderRadius: 14, cursor: 'pointer',
                    }}>
                      <input type="checkbox" checked={privacyChecked} onChange={(e) => { setPrivacyChecked(e.target.checked); setShowErr(false); }} style={{ marginTop: 2, accentColor: 'var(--purple)' }} />
                      <span style={{ fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: mt('chk2') }} />
                    </label>
                    <label style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start', padding: '14px 16px',
                      border: `1px solid ${showErr && !priceChecked ? '#E24B4A' : 'var(--border)'}`,
                      background: showErr && !priceChecked ? '#FCEBEB' : 'var(--cream2)',
                      borderRadius: 14, cursor: 'pointer',
                    }}>
                      <input type="checkbox" checked={priceChecked} onChange={(e) => { setPriceChecked(e.target.checked); setShowErr(false); }} style={{ marginTop: 2, accentColor: 'var(--purple)' }} />
                      <span style={{ fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: mt('chk3') }} />
                    </label>
                  </div>

                  {showErr && (
                    <div style={{ fontSize: 12.5, color: '#A32D2D', marginBottom: 14, padding: '10px 14px', background: '#FCEBEB', borderRadius: 12 }}>
                      {mt('payErr')}
                    </div>
                  )}

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--faint)', marginBottom: 12, fontWeight: 600 }}>
                      {mt('payLabel')}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <button onClick={payStripe} disabled={stripeOpening} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        padding: '14px 24px', border: 'none', borderRadius: 99, flex: 1, minWidth: 140,
                        background: '#635BFF', color: '#fff', fontSize: 13.5, fontWeight: 600,
                        opacity: stripeOpening ? 0.5 : 1, pointerEvents: stripeOpening ? 'none' : 'auto',
                      }}>
                        {stripeOpening ? 'Opening payment...' : mt('stripe')}
                      </button>
                      <div style={{ fontSize: 12, color: 'var(--faint)' }}>{mt('or')}</div>
                      <button onClick={payPayPal} disabled={paypalOpening} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: '14px 24px', border: 'none', borderRadius: 99, flex: 1, minWidth: 140,
                        background: '#FFC439', color: '#003087', fontSize: 13.5, fontWeight: 700,
                        opacity: paypalOpening ? 0.5 : 1, pointerEvents: paypalOpening ? 'none' : 'auto',
                      }}>
                        {mt('paypal')}
                      </button>
                    </div>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--faint)', textAlign: 'center', marginTop: 14 }}>{mt('secure')}</div>
                </div>
              </>
            )}

            {step === 'pending' && (
              <>
                <div style={{ padding: '32px 32px 0' }}>
                  <h3 style={{ fontSize: 21, fontWeight: 700 }}>{mt('pendingTitle')}</h3>
                  <p style={{ color: 'var(--teal-dark)', fontSize: 13, fontWeight: 600, marginTop: 4 }}>{pkg}</p>
                </div>
                <div style={{ padding: '20px 32px 32px', textAlign: 'center', paddingTop: 32, paddingBottom: 40 }}>
                  <div style={{ fontSize: 48, marginBottom: 20 }}>⏳</div>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 28 }}>{mt('pendingText')}</p>
                  <button onClick={confirmManually} className="btn-primary" style={{ marginBottom: 12, width: '100%' }}>
                    {mt('confirmBtn')}
                  </button>
                  <button onClick={goBack} style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--faint)', display: 'block', margin: '0 auto' }}>
                    {mt('backBtn')}
                  </button>
                </div>
              </>
            )}

            {step === 'upload' && (
              <>
                <div style={{ padding: '32px 32px 0' }}>
                  <h3 style={{ fontSize: 21, fontWeight: 700 }}>{mt('uploadTitle')}</h3>
                  <p style={{ color: 'var(--teal-dark)', fontSize: 13, fontWeight: 600, marginTop: 4 }}>{pkg}</p>
                  <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6, lineHeight: 1.65 }}>{mt('uploadSub')}</p>
                </div>
                <div style={{ padding: '20px 32px 32px' }}>
                  <div style={{ background: 'var(--teal-tint)', borderLeft: '3px solid var(--teal)', padding: '14px 16px', marginBottom: 20, fontSize: 13, color: 'var(--ink2)', lineHeight: 1.65 }}>
                    <strong>Step 1:</strong> Fill in your details below and click Submit.<br />
                    <strong>Step 2:</strong> Upload your scan files via the secure upload link that appears.
                  </div>

                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div key="upload-link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '28px 0' }}>
                        <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Details received!</div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.7 }}>
                          Now please upload your scan files using the button below.
                        </div>
                        <a href="https://sync.luckycloud.de/u/d/47c6a267df094a9a8e65/" target="_blank" rel="noreferrer" style={{
                          display: 'inline-block', padding: '14px 32px', background: 'var(--grad)', color: '#fff',
                          fontSize: 14, fontWeight: 500, borderRadius: 99,
                        }}>
                          Upload scan files →
                        </a>
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14,
                          fontSize: 12, color: 'var(--teal-dark)', fontWeight: 500,
                          background: 'var(--teal-tint)', padding: '7px 16px', borderRadius: 99,
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="11" width="16" height="10" rx="2"/>
                            <path d="M7 11V7a5 5 0 0110 0v4"/>
                          </svg>
                          {mt('uploadSecureNote')}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 4 }} className="modal-frow">
                          <input type="text" placeholder={mt('namePh')} value={name}
                            onChange={(e) => { setName(e.target.value); if (nameErr) setNameErr(false); }}
                            style={{ ...inputStyle, border: nameErr ? '1.5px solid #E24B4A' : inputStyle.border, background: nameErr ? '#FCEBEB' : '#fff' }} />
                          <input type="email" placeholder={mt('emailPh')} value={email}
                            onChange={(e) => { setEmail(e.target.value); if (emailErr) setEmailErr(false); }}
                            style={{ ...inputStyle, border: emailErr ? '1.5px solid #E24B4A' : inputStyle.border, background: emailErr ? '#FCEBEB' : '#fff' }} />
                        </div>
                        {(nameErr || emailErr) && (
                          <div style={{ fontSize: 11.5, color: '#A32D2D', marginBottom: 10 }}>
                            {nameErr && emailErr ? mt('fieldsRequiredBoth') : nameErr ? mt('fieldsRequiredName') : mt('fieldsRequiredEmail')}
                          </div>
                        )}
                        <div style={{ marginBottom: 12 }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }} className="modal-frow">
                          <select value={langPref} onChange={(e) => setLangPref(e.target.value)} style={inputStyle}>
                            <option value="">Language preference...</option>
                            <option>Türkçe</option><option>Azərbaycanca</option><option>Русский</option><option>Deutsch</option><option>English</option>
                          </select>
                          <select value={pkg} disabled style={inputStyle}>
                            <option>{pkg}</option>
                          </select>
                        </div>
                        <textarea placeholder={mt('notePh')} value={note} onChange={(e) => setNote(e.target.value)} style={{ ...inputStyle, minHeight: 80, resize: 'vertical', marginBottom: 12 }} />
                        <input type="text" value={honey} onChange={(e) => setHoney(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                        <div style={{ fontSize: 11.5, color: 'var(--faint)', marginBottom: 14, lineHeight: 1.6 }}>{mt('fnote')}</div>
                        <button onClick={submitForm} disabled={submitting} className="btn-primary" style={{ width: '100%', opacity: submitting ? 0.6 : 1 }}>
                          {submitting ? '⏳ Sending...' : mt('submitBtn')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.div>
          <style>{`@media(max-width:480px){.modal-frow{grid-template-columns:1fr!important}}`}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputStyle = {
  width: '100%', padding: '13px 16px', fontSize: 14, border: '1.5px solid var(--border2)',
  background: '#fff', color: 'var(--ink)', borderRadius: 12, outline: 'none',
};
