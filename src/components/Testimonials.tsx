import React from 'react';
import { motion } from 'framer-motion';
import { ScrambleText, TextReveal } from './MotionUtils';

const testimonials = [
  { text: "The app feels incredibly smooth. Jetpack Compose really makes a difference in UI responsiveness.", author: "John Doe", role: "Beta Tester", initials: "JD" },
  { text: "Offline mode works perfectly. I can track my workouts even without internet access.", author: "Sarah Miller", role: "Fitness Enthusiast", initials: "SM" },
  { text: "The biometric login is a game changer for security. Very impressive work!", author: "Raj Kumar", role: "Security Auditor", initials: "RK" },
  { text: "Fast delivery and clean code. Shivam is a pro when it comes to Firebase.", author: "Alex Lee", role: "Startup Founder", initials: "AL" },
  { text: "Pixel-perfect UI implementation. It's rare to find a dev who cares this much about design.", author: "Mark Smith", role: "Designer", initials: "MS" },
  { text: "The push notifications are instantaneous. FCM setup was handled perfectly.", author: "Vicky T.", role: "Beta Tester", initials: "VT" }
];

const TestimonialCard = ({ text, author, role, initials }: { text: string, author: string, role: string, initials: string }) => (
  <div className="marquee-card glass-card">
    <p className="testimonial-text">"{text}"</p>
    <div className="testimonial-author">
      <div className="author-avatar">{initials}</div>
      <div className="author-info">
        <h4><TextReveal><span style={{ display: 'block' }}>{author}</span></TextReveal></h4>
        <p>{role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section id="testimonials">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2><ScrambleText text="Beta Tester Reviews" /></h2>
        </motion.div>

        <motion.div 
          className="marquee-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <div className="marquee-content">
            {/* Render the list twice for seamless infinite marquee scrolling */}
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
