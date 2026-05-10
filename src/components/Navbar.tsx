import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo flip-3d">
            <div className="flip-3d-inner">
              <a href="#home">
                <img src="assets/logo1.jpeg" alt="mShivam Logo" className="logo-img" />
              </a>
            </div>
          </div>
          <ul className={`nav-links ${mobileOpen ? 'active' : ''}`} id="navLinks">
            <li className="flip-3d"><div className="flip-3d-inner"><a href="#home" onClick={() => setMobileOpen(false)}>Home</a></div></li>
            <li className="flip-3d"><div className="flip-3d-inner"><a href="#about" onClick={() => setMobileOpen(false)}>About</a></div></li>
            <li className="flip-3d"><div className="flip-3d-inner"><a href="#services" onClick={() => setMobileOpen(false)}>Services</a></div></li>
            <li className="flip-3d"><div className="flip-3d-inner"><a href="#portfolio" onClick={() => setMobileOpen(false)}>Portfolio</a></div></li>
            <li className="dropdown">
              <div className="flip-3d">
                <div className="flip-3d-inner">
                  <a href="awards.html">Awards & Honors <i className="fas fa-chevron-down" style={{fontSize: '0.8rem'}}></i></a>
                </div>
              </div>
              <div className="dropdown-content">
                <a href="awards.html#certificated">Certificate</a>
                <a href="awards.html#scholarship">Scholarship</a>
                <a href="awards.html#hackathon">Hackathon</a>
                <a href="awards.html#internship">Internship</a>
              </div>
            </li>
            <li className="flip-3d"><div className="flip-3d-inner"><a href="#Get-In-Touch" onClick={() => setMobileOpen(false)}>Contact</a></div></li>
          </ul>
          <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
            <div className="flip-3d">
              <div className="flip-3d-inner">
                <a className="btn btn-ghost" href="#Get-In-Touch">Request Access</a>
              </div>
            </div>
            <div 
              className="mobile-toggle" 
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{display: 'none', cursor: 'pointer', color: '#fff', fontSize: '24px'}}
            >
              <i className="fas fa-bars"></i>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
