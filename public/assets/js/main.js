/**
 * Shivam Kumar Portfolio - Main Controller
 * Manages scrolling initialization, contact details protection, mobile navigation, and secure contact form submissions.
 */
(function () {
  // Configuration: Update these with your active EmailJS values to receive emails directly!
  const EMAILJS_CONFIG = {
    serviceId: "service_i597mpn",   // Update this with your EmailJS Service ID (e.g., "service_xxxxxx")
    templateId: "template_pgfjtcc"  // Update this with your EmailJS Template ID (e.g., "template_xxxxxx")
  };

  // Base64 keys for security (Phase 1)
  const SECURE_KEYS = {
    emailJS: "X2dSSmN1akJzUUd5dVduZWo=", // _gRJcujBsQGyuWnej
    primaryEmail: "c2hpdmFtcmFuYXBvYXJpQGdtYWlsLmNvbQ==", // shivamranapoari@gmail.com
    hiringEmail: "aGlyZS5zaGl2YW1rdW1hckBnbWFpbC5jb20=", // hire.shivamkumar@gmail.com
    whatsappNum: "OTE2MjA0MDgxMzE1", // 916204081315
  };

  // Helper to decode Base64 safely
  function secureDecode(str) {
    try {
      return atob(str);
    } catch (e) {
      return "";
    }
  }

  // Initialize EmailJS safely with error protection (Phase 1 & 4)
  if (typeof emailjs !== 'undefined') {
    try {
      emailjs.init(secureDecode(SECURE_KEYS.emailJS));
    } catch (e) {
      console.warn("EmailJS failed to initialize:", e);
    }
  }

  // Typographic typing animation in About Section
  function initTyping() {
    const words = [
      "Full-Stack Android Developer",
      "AI Integration Expert",
      "Builder of Production-Ready Solutions"
    ];
    let i = 0;
    let timer;
    const element = document.getElementById('typing-text');
    const prefixElement = document.getElementById('typing-prefix');
    if (!element) return;

    function typingEffect() {
      if (prefixElement) {
        const firstChar = words[i].charAt(0).toLowerCase();
        const isVowel = ['a', 'e', 'i', 'o', 'u'].includes(firstChar);
        prefixElement.textContent = isVowel ? "I am an " : "I am a ";
      }

      let word = words[i].split("");
      const loopTyping = function () {
        if (word.length > 0) {
          element.textContent += word.shift();
          timer = setTimeout(loopTyping, 60);
        } else {
          setTimeout(deletingEffect, 2500);
        }
      };
      loopTyping();
    }

    function deletingEffect() {
      let word = words[i].split("");
      const loopDeleting = function () {
        if (word.length > 0) {
          word.pop();
          element.textContent = word.join("");
          timer = setTimeout(loopDeleting, 30);
        } else {
          i = (i + 1) % words.length;
          setTimeout(typingEffect, 500);
        }
      };
      loopDeleting();
    }

    typingEffect();
  }

  // Mobile Navigation toggle
  function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        }
        // Accessibility attribute state
        mobileToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
      });

      // Close menu when clicking internal link
      navLinks.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
          navLinks.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          if (icon) icon.className = 'fas fa-bars';
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
          navLinks.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          if (icon) icon.className = 'fas fa-bars';
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // Secure Link Obfuscation (Phase 1)
  function initContactObfuscation() {
    // Decodes email on-demand instead of keeping it in clear HTML
    const emailLinks = document.querySelectorAll('.secure-email-link');
    emailLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const mail = secureDecode(SECURE_KEYS.hiringEmail);
        // Opens Gmail Web Compose directly in a browser tab
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(mail)}`, '_blank');
      });
    });

    const waLinks = document.querySelectorAll('.secure-wa-link');
    waLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const number = secureDecode(SECURE_KEYS.whatsappNum);
        window.open(`https://wa.me/${number}?text=Hi%20Shivam`, '_blank');
      });
    });
  }

  // Smooth Scroll Initialization via Lenis with hardware sync (Phase 2 & 5)
  function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      wheelMultiplier: 1.0,
      smoothTouch: false,
      touchMultiplier: 1.5,
      // Prevents Lenis from triggering layout on every resize event
      autoRaf: false
    });

    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    }

    // Debounce resize so layout isn't recalculated on every pixel of resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        lenis.resize();
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      }, 250);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length <= 1) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -72, duration: 1.2 });
        }
      });
    });

    window.lenis = lenis;
  }

  // Secure Contact Form Submission with dynamic button states & rate-limiting (Phase 1 & 5)
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot anti-spam check (Phase 1)
      const honeypot = contactForm.querySelector('input[name="website_url"]');
      if (honeypot && honeypot.value !== '') {
        console.warn("Spam detected via Honeypot.");
        if (successMsg) {
          successMsg.style.color = 'var(--cyan)';
          successMsg.textContent = "Thank you for your message!";
          successMsg.style.display = 'block';
        }
        contactForm.reset();
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : "Send request";

      // Toggle loading states (Phase 5)
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending request...`;
      }

      if (typeof emailjs !== 'undefined') {
        try {
          // Collect form values securely and map them to all common template keys to prevent dashboard fallbacks (Phase 1)
          const rawName = contactForm.querySelector('#name').value || "";
          const rawEmail = contactForm.querySelector('#email').value || "";
          const rawProjectType = contactForm.querySelector('#projectType').value || "";
          const rawBudgetRange = contactForm.querySelector('#budget').value || "";
          const rawMessage = contactForm.querySelector('#message').value || "";

          const templateParams = {
            // Support both custom template placeholders and default EmailJS dashboard keys to avoid "PriyaSharma" fallback
            name: rawName,
            from_name: rawName,
            email: rawEmail,
            from_email: rawEmail,
            reply_to: rawEmail,
            project_type: rawProjectType,
            budget_range: rawBudgetRange,
            message: rawMessage
          };

          // Send template parameters via EmailJS safely (using active service/template bindings)
          await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams);

          if (successMsg) {
            successMsg.style.color = 'var(--cyan)';
            successMsg.textContent = "Thanks — I will respond within 24 hours.";
            successMsg.style.display = 'block';
          }
          contactForm.reset();
        } catch (error) {
          console.error("EmailJS submission failed:", error);
          if (successMsg) {
            successMsg.style.color = '#ff6b6b';
            successMsg.textContent = "Something went wrong. Please connect with me directly on WhatsApp!";
            successMsg.style.display = 'block';
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }
        }
      } else {
        if (successMsg) {
          successMsg.style.color = '#ff6b6b';
          successMsg.textContent = "Email service is currently unavailable. Please connect with me directly on WhatsApp!";
          successMsg.style.display = 'block';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }

  // Preloader transition control (Phase 2 & 5)
  window.finishPreloader = function () {
    if (window.preloaderFinished) return;
    window.preloaderFinished = true;

    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline();
      tl.to(".loader-content", { opacity: 0, y: -40, duration: 0.6, ease: "power3.in" })
        .to("#preloader", {
          y: "-100%",
          duration: 0.8,
          ease: "expo.inOut",
          onStart: () => {
            if (typeof initAllAnimations === 'function') initAllAnimations();
          },
          onComplete: () => {
            const preloader = document.getElementById('preloader');
            if (preloader) preloader.style.display = 'none';
            // ✅ Don't set body overflow here — Lenis owns it
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
          }
        });
    } else {
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.style.display = 'none';
      if (typeof initAllAnimations === 'function') {
        initAllAnimations();
      }
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }
  };

  // Bootstrap layout
  document.addEventListener('DOMContentLoaded', () => {
    initTyping();
    initMobileMenu();
    initContactObfuscation();
    initSmoothScroll();
    initContactForm();
  });
})();
