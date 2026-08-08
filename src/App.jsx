import { useEffect, useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import StatBar from './components/StatBar';
import LanguageToolbar from './components/LanguageToolbar';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import About from './components/About';
import PullQuote from './components/PullQuote';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import { CtaBand, Footer } from './components/CtaBandFooter';
import CookieBar from './components/CookieBar';
import UploadModal from './components/UploadModal';

const PKG_MAP = {
  basic: 'Basic — €49',
  standard: 'Standard — €89',
  premium: 'Premium — €99',
};

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pkg, setPkg] = useState('Basic — €49');
  const [initialStep, setInitialStep] = useState(null);

  // Detect return from Stripe/PayPal payment (?paid=1&pkg=standard) and
  // auto-resume the modal directly at the upload step — no manual "I've paid" click needed.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('paid') === '1') {
      const code = params.get('pkg');
      const fullPkg = PKG_MAP[code];
      if (fullPkg) {
        setPkg(fullPkg);
        setInitialStep('upload');
        setModalOpen(true);
        window.gtag && window.gtag('event', 'payment_redirect_resume', { event_category: 'funnel', event_label: fullPkg });
      }
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const openModal = (p) => { setPkg(p); setInitialStep(null); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  return (
    <LanguageProvider>
      <Nav onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <StatBar />
      <LanguageToolbar />
      <HowItWorks />
      <Pricing onOpenModal={openModal} />
      <About />
      <PullQuote />
      <FAQ />
      <Contact />
      <CtaBand />
      <Footer />
      <CookieBar />
      <UploadModal isOpen={modalOpen} pkg={pkg} initialStep={initialStep} onClose={closeModal} />
    </LanguageProvider>
  );
}
