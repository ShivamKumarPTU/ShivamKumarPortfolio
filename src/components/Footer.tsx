import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const mail = atob("aGlyZS5zaGl2YW1rdW1hckBnbWFpbC5jb20="); // hire.shivamkumar@gmail.com
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(mail)}`, '_blank');
  };

  const handleWaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const number = atob("OTE2MjA0MDgxMzE1"); // 916204081315
    window.open(`https://wa.me/${number}?text=Hi%20Shivam`, '_blank');
  };

  return (
    <footer id="footer">
      <div className="container">
        <motion.div 
          className="glass-card footer-card" 
          whileHover={{ 
            boxShadow: '0 0 35px rgba(0, 224, 255, 0.25)', 
            borderColor: 'rgba(0, 224, 255, 0.4)',
            scale: 1.01
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ 
            padding: '40px', 
            borderRadius: '24px', 
            background: 'rgba(255, 255, 255, 0.02)', 
            border: '1px solid rgba(255, 255, 255, 0.08)', 
            backdropFilter: 'blur(15px)',
            transition: 'border-color 0.4s, box-shadow 0.4s'
          }}
        >
          <div className="footer-grid">
            <div>
              <div className="logo">
                <img src="assets/logo1.jpeg" alt="mShivam Logo" className="logo-img" />
              </div>
              <p style={{ color: 'var(--muted)', marginTop: '12px' }}>Freelance Android Developer — Kotlin & Firebase</p>
            </div>

            <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ marginBottom: '16px' }}>Links</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2 }}>
                  <li><a href="#services" style={{ color: 'var(--muted)' }}>Services</a></li>
                  <li><a href="#portfolio" style={{ color: 'var(--muted)' }}>Portfolio</a></li>
                  <li><a href="#Get-In-Touch" style={{ color: 'var(--muted)' }}>Contact</a></li>
                  <li><a href="about-shivam-kumar-android-developer.html" style={{ color: 'var(--muted)' }}>About Shivam</a></li>
                  <li><a href="android-developer-roadmap-by-shivam.html" style={{ color: 'var(--muted)' }}>Android Roadmap</a></li>
                  <li><a href="cost-of-android-app-development-india.html" style={{ color: 'var(--muted)' }}>App Cost</a></li>
                  <li><a href="firebase-integration-android-guide.html" style={{ color: 'var(--muted)' }}>Firebase Guide</a></li>
                  <li><a href="kotlin-for-android-developers.html" style={{ color: 'var(--muted)' }}>Kotlin Guide</a></li>
                  <li><a href="android-project-ideas-guide.html" style={{ color: 'var(--muted)' }}>Project Ideas</a></li>
                  <li><a href="hire-android-developer-guide.html" style={{ color: 'var(--muted)' }}>Hire Android Developer</a></li>
                  <li><a href="android-app-case-studies.html" style={{ color: 'var(--muted)' }}>Case Studies</a></li>
                </ul>
              </div>
              <div>
                <h4 style={{ marginBottom: '16px' }}>Contact</h4>
                <p style={{ margin: 0 }}>
                  <a href="#" onClick={handleEmailClick} className="secure-email-link" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
                    <i className="fas fa-envelope"></i> Click to Email Shivam
                  </a>
                </p>
                <p style={{ marginTop: '8px', marginBottom: 0 }}>
                  <a href="#" onClick={handleWaClick} className="secure-wa-link" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
                    <i className="fab fa-whatsapp"></i> Click to Chat via WhatsApp
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '16px' }}>Social</h4>
              <div className="socials">
                <a href="https://github.com/shivamkumarptu" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/shivam-kumar-1b1611210/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
