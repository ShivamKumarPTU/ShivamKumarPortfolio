import { ReactLenis, useLenis } from 'lenis/react';
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import TechStack from './components/TechStack';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        const currentPath = window.location.pathname;
        const targetPath = anchor.pathname;
        const isSamePage = targetPath === currentPath || targetPath === '/' || targetPath === '' || currentPath.endsWith(targetPath);
        
        if (isSamePage) {
          e.preventDefault();
          lenis.scrollTo(anchor.hash);
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [lenis]);

  return (
    <ReactLenis root options={{ duration: 1.2, smoothWheel: true, touchMultiplier: 1.5 }}>
      <div className="react-portfolio">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Portfolio />
          <Services />
          <TechStack />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </ReactLenis>
  );
};

export default App;
