import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TextReveal } from './MotionUtils';

const About = () => {
  const [typingText, setTypingText] = useState('');
  const words = ['Freelance Android Developer', 'Kotlin Expert', 'Firebase Specialist'];
  
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: any;

    const type = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        setTypingText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypingText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        timer = setTimeout(type, 2000); // Wait before deleting
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timer = setTimeout(type, 500); // Wait before typing next
      } else {
        timer = setTimeout(type, isDeleting ? 50 : 100);
      }
    };

    timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  const revealVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <>
      {/* About Me Section */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <motion.h1 
                variants={revealVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
                style={{ fontSize: '3.5rem', fontFamily: 'Poppins', marginBottom: '30px' }}
              >
                Hi, I'm <span style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Shivam Kumar</span>
              </motion.h1>
              
              <motion.p 
                variants={revealVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
                style={{ fontSize: '1.4rem', color: 'var(--slate)', marginBottom: '24px', lineHeight: 1.4, fontFamily: 'Poppins, sans-serif', fontWeight: 600, minHeight: '48px' }}
              >
                <span style={{ color: 'var(--slate)' }}>I am a </span>
                <span style={{ color: 'var(--blue)' }}>{typingText}</span>
                <span className="typing-cursor">|</span>
              </motion.p>
              
              <motion.p 
                variants={revealVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
                style={{ fontSize: '1.1rem', color: 'var(--muted)', lineHeight: 1.6 }}
              >
                Specializing in <span style={{ color: 'var(--blue)', fontWeight: 600 }}>Kotlin</span>,{' '}
                <span style={{ color: 'var(--blue)', fontWeight: 600 }}>Jetpack Compose</span> and{' '}
                <span style={{ color: 'var(--blue)', fontWeight: 600 }}>Firebase</span>-based solutions — I help startups, businesses, and individuals turn ideas into production-ready apps.
              </motion.p>
            </div>
            
            <motion.div 
              className="about-stats"
              variants={revealVariant} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
            >
              <div className="stats-grid">
                <div className="glass-card stat-card">
                  <h2 style={{ color: 'var(--pink)' }}><TextReveal>4+</TextReveal></h2>
                  <p><TextReveal>Real Projects</TextReveal></p>
                </div>
                <div className="glass-card stat-card">
                  <h2 style={{ color: 'var(--blue)' }}><TextReveal>3+</TextReveal></h2>
                  <p><TextReveal>Years Coding</TextReveal></p>
                </div>
                <div className="glass-card stat-card">
                  <h2 style={{ color: 'var(--cyan)' }}><TextReveal>6</TextReveal></h2>
                  <p><TextReveal>Services</TextReveal></p>
                </div>
                <div className="glass-card stat-card">
                  <h2 style={{ color: 'var(--blue)' }}><TextReveal>∞</TextReveal></h2>
                  <p><TextReveal>Curiosity</TextReveal></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Availability Bar */}
      <section className="availability-bar">
        <div className="availability-track">
          {/* Create 3 duplicate platforms for seamless infinite marquee */}
          {[1, 2, 3].map((key) => (
            <div key={key} className="platform" style={{ display: 'flex', alignItems: 'center', gap: '40px', padding: '0 40px', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--muted)' }}>Available on:</span>
              <a href="https://www.upwork.com/freelancers/~01a7f6e1e8c8b0b3c9" target="_blank" rel="noreferrer"><i className="fab fa-fonticons-fi" style={{ color: '#14a800' }}></i> Upwork</a>
              <a href="https://www.fiverr.com/shivamkumar_android" target="_blank" rel="noreferrer"><i className="fab fa-fonticons" style={{ color: '#1dbf73' }}></i> Fiverr</a>
              <a href="https://www.freelancer.in/u/shivamkumarptu" target="_blank" rel="noreferrer"><i className="fas fa-briefcase" style={{ color: '#29b2fe' }}></i> Freelancer</a>
              <a href="https://www.linkedin.com/in/shivam-kumar-1b1611210/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin" style={{ color: '#0a66c2' }}></i> LinkedIn</a>
              <a href="https://www.facebook.com/shivamkumarptu" target="_blank" rel="noreferrer"><i className="fab fa-facebook" style={{ color: '#1877F2' }}></i> Facebook</a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default About;
