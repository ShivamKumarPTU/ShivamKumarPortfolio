import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrambleText } from './MotionUtils';

const faqs = [
  { q: "How long does a typical app take?", a: "An MVP typically takes 4–8 weeks depending on complexity. I provide timelines with every quote." },
  { q: "Do you provide ongoing maintenance?", a: "Yes — bug fixes, Play Store updates, performance improvements & feature add-ons available." },
  { q: "How do you price projects?", a: "I quote per project based on scope. Use the contact form to share requirements for a clear estimate." },
  { q: "Do you sign NDAs?", a: "Yes — I can sign NDAs and deliver private repositories on request." },
  { q: "What tech stack do you recommend?", a: "I highly recommend Kotlin with Jetpack Compose for the UI and Firebase for the backend. It's the most efficient and scalable modern approach." },
  { q: "Can you publish to my Google Play Store?", a: "Absolutely. I handle the entire publishing process, including store listing optimization and internal testing rounds." }
];

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question} <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="faq-answer-container"
            style={{ overflow: 'hidden' }}
          >
            <div className="faq-answer" style={{ maxHeight: 'none', padding: '0 24px 24px 24px' }}>
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  return (
    <section id="faq">
      <div className="container">
        <motion.div 
          className="section-header faq-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2><ScrambleText text="Frequently Asked" /></h2>
        </motion.div>
        
        <motion.div 
          className="faq-accordion" 
          style={{ maxWidth: '800px', margin: '0 auto' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
        >
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
