import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrambleText, TextReveal } from './MotionUtils';

const PortfolioCard = ({ src, title, link, isLandscape = false, index, onOpenModal }: { src: string, title: string, link: string, isLandscape?: boolean, index: number, onOpenModal: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Native Intersection Observer for video optimization (auto play/pause)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      });
    }, { threshold: 0.3 });

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      className={`portfolio-card ${isLandscape ? 'card-landscape' : 'card-portrait'} glass-card`}
      style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', cursor: 'pointer' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onOpenModal}
    >
      <video ref={videoRef} className="portfolio-video" muted loop playsInline preload="metadata" style={{ background: 'transparent' }}>
        <source src={src} type="video/mp4" />
      </video>
      <div className="portfolio-gradient-overlay"></div>
      <div className="portfolio-card-bottom">
        <h3 className="portfolio-card-title">
          <TextReveal delay={0.1}><span style={{ display: 'block' }}>{title}</span></TextReveal>
        </h3>
        <div className="portfolio-cta-container">
          <a href={link} className="btn-compact-porsche" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>GitHub Link →</a>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [showMore, setShowMore] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Lock and unlock background scrolling cleanly when modal is active
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  const projects = [
    { src: "assets/Projects/Full Screen Timer App.mp4", title: "Full Screen Timer App", link: "https://github.com/ShivamKumarPTU/Full_Screen_Timer" },
    { src: "assets/Projects/FinalVoiceAnalyserDemoVideo.mp4", title: "VoxAnalyzer — AI Voice Emotion", link: "https://github.com/ShivamKumarPTU/VoxAnalyzer" },
    { src: "assets/Projects/GeofenceTrackerCompressed.mp4", title: "GeoFence Tracker — Child Safety", link: "https://github.com/ShivamKumarPTU/GeoFence-Tracker" }
  ];

  const extraProjects = [
    { src: "assets/Projects/GramDOC AI.mp4", title: "GramDOC AI — Document Analyzer", link: "https://github.com/ShivamKumarPTU/GramDoc", isLandscape: true },
    { src: "assets/Projects/NightVaultLandingPage.mp4", title: "NightLibrary — Secure Media Vault", link: "https://github.com/ShivamKumarPTU/NightLibrary", isLandscape: true }
  ];

  return (
    <section id="portfolio">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <h2><ScrambleText text="Portfolio" /></h2>
        </motion.div>

        <div className="portfolio-grid">
          {projects.map((proj, idx) => (
            <PortfolioCard 
              key={proj.title}
              index={idx} 
              src={proj.src} 
              title={proj.title} 
              link={proj.link} 
              onOpenModal={() => setActiveVideo(proj.src)}
            />
          ))}
          
          {showMore && extraProjects.map((proj, idx) => (
            <PortfolioCard 
              key={proj.title}
              index={idx + projects.length} 
              isLandscape={proj.isLandscape}
              src={proj.src} 
              title={proj.title} 
              link={proj.link} 
              onOpenModal={() => setActiveVideo(proj.src)}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <div className="flip-3d">
            <div className="flip-3d-inner">
              <button onClick={() => setShowMore(!showMore)} className="btn btn-primary">
                {showMore ? 'Hide Projects ←' : 'More Projects →'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            className="video-modal active"
            style={{ display: 'flex' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveVideo(null)}
          >
            <span className="video-modal-close" onClick={() => setActiveVideo(null)}>&times;</span>
            <motion.div 
              className="video-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <video src={activeVideo} controls autoPlay playsInline></video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
