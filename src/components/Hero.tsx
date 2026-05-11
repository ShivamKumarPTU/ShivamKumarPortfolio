import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBackgroundPosition(`${x}% 0%`);
  };

  const handleMouseLeave = () => {
    setBackgroundPosition('0% 0%');
  };

  const words = [
    "Convert Your App Idea into reality",
    "Always Dream of Having Your Own app",
    "Let's Build Your Custom Android App",
    "Turn Your Vision Into a Play Store Hit"
  ];
  const [typedTitle, setTypedTitle] = useState('');

  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.readyState >= 3) {
        setIsVideoLoaded(true);
      }
    }
  }, []);

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: any;

    const type = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        setTypedTitle(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedTitle(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        timer = setTimeout(type, 3000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timer = setTimeout(type, 500);
      } else {
        timer = setTimeout(type, isDeleting ? 30 : 60);
      }
    };

    timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Global Background Video */}
      <video
        ref={videoRef}
        className="global-video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src="assets/hero1.mp4" type="video/mp4" />
      </video>

      {/* Preload Background Banner Image (Fades out once video is loaded) */}
      <motion.img
        src="assets/bannerImg.png"
        alt=""
        className="global-video-bg"
        style={{
          pointerEvents: 'none',
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: isVideoLoaded ? 0 : 1 }}
        transition={{ duration: 1.0, ease: 'easeInOut' }}
      />

      <section id="home" className="hero">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* Hover-Lighting Heading with Typing Animation */}
            <motion.h1 
              className="hero-title" 
              style={{ textAlign: 'center', backgroundPosition, transition: 'background-position 0.4s ease-out' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span id="hero-title-text">
                {typedTitle}
              </span>
              <motion.span 
                className="hero-title-cursor"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.h1>

            <motion.div 
              className="trust-row"
              style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              <div className="glass-card" style={{ padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fas fa-shipping-fast" style={{ color: 'var(--blue)' }}></i><span>Fast delivery</span>
              </div>
              <div className="glass-card" style={{ padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fas fa-paint-brush" style={{ color: 'var(--pink)' }}></i><span>Clean UI</span>
              </div>
              <div className="glass-card" style={{ padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <i className="fas fa-coins" style={{ color: 'var(--cyan)' }}></i><span>Affordable</span>
              </div>
              <a href="assets/Resume/Oracle_ShivamKumar_Resume.pdf" download="ShivamKumar_Resume.pdf"
                className="btn btn-primary resume-btn"
                style={{ padding: '12px 24px', borderRadius: '12px', height: '48px', display: 'inline-flex', alignItems: 'center', gap: '12px', fontWeight: 600, margin: 0 }}>
                <i className="fas fa-file-download"></i> MY RESUME
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
