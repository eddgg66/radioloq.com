import { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import StatBar from './components/StatBar';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import About from './components/About';
import PullQuote from './components/PullQuote';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import { CtaBand, Footer } from './components/CtaBandFooter';
import CookieBar from './components/CookieBar';
import UploadModal from './components/UploadModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pkg, setPkg] = useState('Basic — €49');

  const openModal = (p) => { setPkg(p); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  return (
    <LanguageProvider>
      <Nav onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <StatBar />
      <HowItWorks />
      <Pricing onOpenModal={openModal} />
      <About />
      <PullQuote />
      <FAQ />
      <Contact />
      <CtaBand />
      <Footer />
      <CookieBar />
      <UploadModal isOpen={modalOpen} pkg={pkg} onClose={closeModal} />
    </LanguageProvider>
  );
}
