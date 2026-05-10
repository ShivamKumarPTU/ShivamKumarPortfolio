import React from 'react';
import { motion } from 'framer-motion';
import { ScrambleText, TextReveal } from './MotionUtils';

const ServiceCard = ({ icon, title, desc, delay }: { icon: string, title: string, desc: string, delay: number }) => {
  return (
    <motion.div 
      className="glass-card active"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      <i className={`${icon} service-icon`}></i>
      <h3 style={{ color: 'var(--slate)', marginTop: '16px' }}>
        <TextReveal delay={delay + 0.1}><span style={{ display: 'block' }}>{title}</span></TextReveal>
      </h3>
      <p style={{ color: 'var(--muted)', marginTop: '8px' }}>
        <TextReveal delay={delay + 0.2}><span style={{ display: 'block' }}>{desc}</span></TextReveal>
      </p>
      <div className="flip-3d">
        <div className="flip-3d-inner">
          <a href="#Get-In-Touch" className="btn btn-ghost" style={{ marginTop: '16px' }}>Get a Quote →</a>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2><ScrambleText text="Services Offered" /></h2>
        </motion.div>

        <div className="services-grid">
          <ServiceCard delay={0.0} icon="fas fa-mobile-alt" title="Custom Android App Development" desc="Full-cycle Android app development using Kotlin and Firebase with fast UI and scalable backend." />
          <ServiceCard delay={0.1} icon="fas fa-tools" title="App Maintenance & Optimization" desc="Improve app performance, fix bugs, and enhance user experience." />
          <ServiceCard delay={0.2} icon="fas fa-cloud" title="Firebase Integration" desc="Set up Authentication, Firestore, Analytics, and Push Notifications." />
          <ServiceCard delay={0.3} icon="fas fa-pencil-ruler" title="UI/UX to App Conversion" desc="Convert your design (Figma/Adobe XD) into a working Kotlin app." />
          <ServiceCard delay={0.4} icon="fas fa-robot" title="AI-Powered App Solutions" desc="Integrate intelligent chatbots (OpenAI/Gemini) and smart features like image recognition into your Android app." />
          <ServiceCard delay={0.5} icon="fas fa-laptop-code" title="Website Landing Page" desc="High-converting landing pages built with modern frameworks to showcase your apps or business." />
        </div>
      </div>
    </section>
  );
};

export default Services;
