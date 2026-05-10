import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrambleText } from './MotionUtils';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    // Honeypot anti-spam check
    const honeypot = (document.getElementById('website_url') as HTMLInputElement)?.value;
    if (honeypot) {
      setStatus('Thanks — I will respond within 24 hours.');
      setName('');
      setEmail('');
      setProjectType('');
      setBudgetRange('');
      setMessage('');
      setIsLoading(false);
      return;
    }

    try {
      // Send secure, direct request to EmailJS REST API
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_i597mpn',
          template_id: 'template_aevjqco',
          user_id: '_gRJcujBsQGyuWnej',
          template_params: {
            name: name,
            from_name: name,
            email: email,
            from_email: email,
            reply_to: email,
            project_type: projectType,
            budget_range: budgetRange,
            message: message,
          },
        }),
      });

      if (response.ok) {
        setStatus('Thanks — I will respond within 24 hours.');
      } else {
        const errText = await response.text();
        console.error("EmailJS REST API error response:", errText);
        setStatus('Something went wrong. Please connect with me directly on WhatsApp!');
      }
    } catch (error) {
      console.error("EmailJS send exception:", error);
      setStatus('Something went wrong. Please connect with me directly on WhatsApp!');
    } finally {
      // ALWAYS reset textbox states as requested for both success/error cases
      setName('');
      setEmail('');
      setProjectType('');
      setBudgetRange('');
      setMessage('');
      setIsLoading(false);
    }
  };

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
    <section id="Get-In-Touch">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2><ScrambleText text="Let's talk about your app" /></h2>
        </motion.div>

        <div className="contact-grid">
          <motion.div 
            className="glass-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            <form id="contactForm" onSubmit={handleSubmit}>
              <div style={{ display: 'none' }}>
                <label htmlFor="website_url">Do not fill this out if you are human</label>
                <input type="text" id="website_url" name="website_url" value="" autoComplete="off" onChange={() => {}} />
              </div>

              <label htmlFor="name">Your name</label>
              <input 
                id="name" 
                name="name" 
                className="form-control" 
                required 
                placeholder="e.g. Priya Sharma" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="email">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                className="form-control" 
                required 
                placeholder="you@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="projectType">Project type</label>
              <select 
                id="projectType" 
                name="project_type" 
                className="form-control" 
                required 
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                <option value="" disabled>Select</option>
                <option value="app-development">App Development</option>
                <option value="maintenance">Maintenance</option>
                <option value="firebase">Firebase Setup</option>
                <option value="consultation">Consultation</option>
              </select>

              <label htmlFor="budget">Estimated budget (optional)</label>
              <select 
                id="budget" 
                name="budget_range" 
                className="form-control"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
              >
                <option value="">Prefer not to say</option>
                <option value="under-500">&lt; $50</option>
                <option value="500-1500">$50–$150</option>
                <option value="1500-5000">$150–$500</option>
                <option value="5000-plus">$500+</option>
              </select>

              <label htmlFor="message">Brief description</label>
              <textarea 
                id="message" 
                name="message" 
                rows={5} 
                className="form-control" 
                placeholder="What do you want built? (scope, platform, deadline)" 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <div className="flip-3d">
                <div className="flip-3d-inner">
                  <button className="btn btn-primary" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i> Send request
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {status && (
                <div style={{ marginTop: '20px', color: 'var(--cyan)', fontWeight: 600 }}>
                  {status}
                </div>
              )}
            </form>
          </motion.div>

          <motion.aside 
            className="glass-card" 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Prefer to chat?</h3>
            <p>Message me on WhatsApp for quick quotes or schedule a call.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              <div className="flip-3d">
                <div className="flip-3d-inner">
                  <a className="btn btn-primary secure-wa-link" href="#" onClick={handleWaClick} style={{ width: '100%' }}>
                    <i className="fab fa-whatsapp"></i> Chat on WhatsApp
                  </a>
                </div>
              </div>
              <div className="flip-3d">
                <div className="flip-3d-inner">
                  <a className="btn btn-ghost secure-email-link" href="#" onClick={handleEmailClick} style={{ width: '100%' }}>
                    <i className="fas fa-envelope"></i> Email me
                  </a>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '32px', paddingTop: '24px' }}>
              <strong>Quick facts</strong>
              <ul style={{ color: 'var(--muted)', marginTop: '16px', paddingLeft: '20px', fontSize: '0.9rem', lineHeight: 1.8 }}>
                <li>24-hour initial reply on quotes</li>
                <li>Affordable student-friendly rates</li>
                <li>Source control & Play Store publishing included</li>
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
