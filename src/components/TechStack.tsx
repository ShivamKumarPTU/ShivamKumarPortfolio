import React from 'react';
import { motion } from 'framer-motion';
import { ScrambleText, TextReveal } from './MotionUtils';

const TechCard = ({ icon, title, techList, delay }: { icon: string, title: string, techList: string[], delay: number }) => {
  return (
    <motion.div 
      className="glass-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      <div className="tech-card-header">
        <i className={icon}></i>
        <h3>
          <TextReveal delay={delay + 0.1}><span style={{ display: 'block' }}>{title}</span></TextReveal>
        </h3>
      </div>
      <ul className="tech-list">
        {techList.map((tech, i) => (
          <li key={i}><span className="tech-dot"></span>{tech}</li>
        ))}
      </ul>
    </motion.div>
  );
};

const TechStack = () => {
  return (
    <section id="tech-stack">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2><ScrambleText text="Technologies I Work With" /></h2>
        </motion.div>

        <div className="tech-grid">
          <TechCard 
            delay={0.0}
            icon="fab fa-android" 
            title="Android Development" 
            techList={["Kotlin", "Java", "Jetpack Compose", "MVVM Architecture", "Room Database", "Jetpack Libraries"]} 
          />
          <TechCard 
            delay={0.1}
            icon="fas fa-cloud" 
            title="Backend & APIs" 
            techList={["Retrofit", "REST APIs", "Firebase Authentication", "Firestore / Realtime DB", "Cloud Messaging (FCM)"]} 
          />
          <TechCard 
            delay={0.2}
            icon="fas fa-tools" 
            title="Tools & Technologies" 
            techList={["Android Studio", "Git & GitHub", "Postman", "Figma (UI/UX)", "Firebase Console"]} 
          />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
