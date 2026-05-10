/**
 * Shivam Kumar Portfolio - Animations Engine
 * Manages premium GSAP timelines, text scrambling effects, SplitType staggering, and hover interactions.
 */
(function () {
  // Safe plugin registration
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    // Batch callbacks, don't recalculate on every trigger init
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 40,        // only sync every 40ms instead of every frame
      ignoreMobileResize: true
    });
  }

  // Hero Title Lighting effects
  function initHeroTitleTyping() {
    const words = [
      "Convert Your App Idea into reality",
      "Always Dream of Having Your Own app",
      "Let's Build Your Custom Android App",
      "Turn Your Vision Into a Play Store Hit"
    ];
    let i = 0;
    let timer;
    const element = document.getElementById('hero-title-text');
    if (!element) return;

    function typingEffect() {
      let word = words[i].split("");
      const loopTyping = function () {
        if (word.length > 0) {
          element.textContent += word.shift();
          timer = setTimeout(loopTyping, 60);
        } else {
          setTimeout(deletingEffect, 3000);
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

    element.textContent = "";
    typingEffect();
  }

  function initHeroText() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      initHeroTitleTyping();

      // Interactive mouse hover lighting tracker - Optimized to prevent layout thrashing
      let rect = null;
      let isHovering = false;
      let resizeTimer;
      
      const updateRect = () => {
        if (heroTitle) {
          rect = heroTitle.getBoundingClientRect();
        }
      };

      // Debounce resize updates to avoid layout thrashing
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateRect, 250);
      }, { passive: true });

      heroTitle.addEventListener('mouseenter', () => {
        isHovering = true;
        updateRect(); // Update specifically on hover enter
      }, { passive: true });

      heroTitle.addEventListener('mousemove', (e) => {
        if (!isHovering || !rect) return;
        // Avoid forcing reflow inside mousemove loop
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        gsap.to(heroTitle, {
          backgroundPosition: `${x}% 0%`,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }, { passive: true });

      // Smoothly restore position on mouse leave
      heroTitle.addEventListener('mouseleave', () => {
        isHovering = false;
        gsap.to(heroTitle, {
          backgroundPosition: '0% 0%',
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }, { passive: true });
    }
  }

  // Custom Scramble Text Engine (Zero dependencies, GPU accelerated)
  function runScrambleText(element, options = {}) {
    const originalText = options.text || element.textContent;
    const duration = options.duration || 1.4;
    const chars = options.chars === 'upperCase' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' :
      options.chars === 'lowerCase' ? 'abcdefghijklmnopqrstuvwxyz' :
        options.chars === 'upperAndLowerCase' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' :
          (options.chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    const revealDelay = options.revealDelay || 0;

    element.textContent = "";
    const totalChars = originalText.length;
    const progressObj = { value: 0 };

    if (typeof gsap === 'undefined') {
      element.textContent = originalText;
      return;
    }

    gsap.to(progressObj, {
      value: 1,
      duration: duration,
      ease: "power1.inOut",
      scrollTrigger: options.scrollTrigger || null,
      onUpdate: () => {
        const progress = progressObj.value;
        let result = "";

        let revealProgress = 0;
        if (progress > revealDelay) {
          revealProgress = (progress - revealDelay) / (1 - revealDelay);
        }

        const revealedCount = Math.floor(revealProgress * totalChars);

        for (let i = 0; i < totalChars; i++) {
          if (originalText[i] === " ") {
            result += " ";
            continue;
          }

          const isRevealed = options.rightToLeft ? (i >= totalChars - revealedCount) : (i < revealedCount);

          if (isRevealed) {
            result += originalText[i];
          } else {
            if (progress > 0 && progress < 1) {
              const randomChar = chars[Math.floor(Math.random() * chars.length)];
              result += randomChar;
            } else if (progress === 0) {
              result += " ";
            } else {
              result += originalText[i];
            }
          }
        }
        element.textContent = result;
      },
      onComplete: () => {
        element.textContent = originalText;
      }
    });
  }

  // Initialize headline scrambles on entry
  function initHeadlinesScramble() {
    const headlines = document.querySelectorAll('.section-header h2');
    headlines.forEach(headline => {
      runScrambleText(headline, {
        duration: 1.2,
        chars: 'upperCase',
        revealDelay: 0.1,
        scrollTrigger: {
          trigger: headline,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  // SplitType text animations (Phase 2 - Optimized layout passes)
  function initSplitTextParagraphs() {
    if (typeof SplitType === 'undefined' || typeof gsap === 'undefined') return;

    // Splitting only high-impact headings to avoid DOM thrashing
    const headingsToSplit = document.querySelectorAll('.about-text h1');
    headingsToSplit.forEach(h => {
      if (h.classList.contains('split-done')) return;
      h.classList.add('split-done');

      const split = new SplitType(h, {
        types: 'lines, words'
      });

      const triggerEl = h.closest('.about-text') || h;

      gsap.from(split.words, {
        opacity: 0,
        y: 12,
        stagger: 0.015,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  // Stagger lists entry
  function initFeaturedLists() {
    if (typeof gsap === 'undefined') return;

    // Collect ALL lists first (one layout read), then register (no reads)
    const allGroups = [];
    document.querySelectorAll('.tech-list').forEach(list => {
      const items = list.querySelectorAll('li');
      const card = list.closest('.glass-card') || list;
      allGroups.push({ items, card });
    });

    // Now register ScrollTriggers — no layout reads inside
    allGroups.forEach(({ items, card }) => {
      gsap.set(items, { opacity: 0, x: -15 });
      ScrollTrigger.create({
        trigger: card,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            x: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  // Native HTML5 Video Popup modal with backdrop scrolling locks (Phase 3)
  function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.getElementById('modalClose');
    const cards = document.querySelectorAll('.portfolio-card');

    if (!modal || !modalVideo) return;

    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Stop triggers if internal links are tapped
        if (e.target.closest('a') || e.target.classList.contains('btn-compact-porsche')) {
          return;
        }

        const video = card.querySelector('.portfolio-video');
        if (video) {
          const videoSource = video.querySelector('source');
          if (!videoSource) return;

          const videoSrc = videoSource.getAttribute('src');

          modalVideo.src = videoSrc;
          modal.classList.add('active');

          // Smoothly play
          modalVideo.play().catch(err => console.log("Modal play failed:", err));
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeModal() {
      modal.classList.remove('active');
      modalVideo.pause();
      modalVideo.src = "";
      document.body.style.overflow = '';
    }

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Handle Escape key closure (Phase 3)
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Service grid card entrance timelines (Handled cleanly in CSS + IntersectionObserver)
  function initServicesAnimations() {
    // No-op: Service cards entry anim is now managed via CSS + our high performance IntersectionObserver inside initGeneralReveals()
  }

  // General element reveals (Optimized via single-pass native IntersectionObserver)
  function initGeneralReveals() {
    const extraReveals = document.querySelectorAll(
      '.about-text p, .tech-grid .glass-card h3, .glass-card h4, .tech-grid .glass-card p, .testimonial-text'
    );
    extraReveals.forEach(el => {
      if (!el.classList.contains('reveal-text')) el.classList.add('reveal-text');
    });

    // Use ScrollTrigger.batch — single reflow for all elements, not one per element
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.batch('.reveal-text, .services-grid .glass-card', {
        onEnter: batch => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.08,
            overwrite: true
          });
        },
        start: 'top 90%',
        once: true  // unregisters after firing — no ongoing scroll cost
      });
    }
  }

  // More Projects toggle trigger
  function initMoreProjects() {
    const moreProjectsBtn = document.getElementById('moreProjectsBtn');
    if (!moreProjectsBtn) return;

    let showingMore = false;
    moreProjectsBtn.addEventListener('click', () => {
      const hiddenProjects = document.querySelectorAll('.portfolio-grid .hidden-project');

      if (!showingMore) {
        showingMore = true;
        moreProjectsBtn.innerHTML = 'Hide Projects ←';

        hiddenProjects.forEach(proj => {
          proj.style.display = ''; // Removes display: none

          if (typeof gsap !== 'undefined') {
            gsap.set(proj, { opacity: 0, y: 35 });
            gsap.to(proj, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              onStart: () => {
                const video = proj.querySelector('.portfolio-video');
                if (video) {
                  video.play().catch(err => console.log("Video auto play failed:", err));
                }
              }
            });
          } else {
            proj.style.opacity = '1';
          }
        });
      } else {
        showingMore = false;
        moreProjectsBtn.innerHTML = 'More Projects →';

        if (typeof gsap !== 'undefined') {
          gsap.to(hiddenProjects, {
            opacity: 0,
            y: 35,
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: () => {
              hiddenProjects.forEach(proj => {
                proj.style.display = 'none';
                const video = proj.querySelector('.portfolio-video');
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              });

              // Scroll gracefully back to `#portfolio` start using Lenis if active
              if (window.lenis) {
                window.lenis.scrollTo('#portfolio', { offset: -72, duration: 1 });
              } else {
                const portfolioSec = document.getElementById('portfolio');
                if (portfolioSec) portfolioSec.scrollIntoView({ behavior: 'smooth' });
              }
            }
          });
        } else {
          hiddenProjects.forEach(proj => {
            proj.style.display = 'none';
          });
        }
      }

      // Re-trigger layout calculations for ScrollTrigger bounds update
      if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 120);
      }
    });
  }

  // Fully-accessible close FAQ Accordion logic (Phase 3 & 5)
  function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
      // Setup accessibility roles & states (Phase 3)
      question.setAttribute('role', 'button');
      question.setAttribute('tabindex', '0');
      question.setAttribute('aria-expanded', 'false');

      const triggerFaq = () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');

        // Toggle others
        document.querySelectorAll('.faq-item').forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle state of current
        item.classList.toggle('active', !isActive);
        question.setAttribute('aria-expanded', (!isActive).toString());
      };

      question.addEventListener('click', triggerFaq);
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerFaq();
        }
      });
    });
  }

  // Hover-to-play projects videos (Porsche-style) with reset capabilities (Phase 2)
  function initPortfolioVideos() {
    const cards = document.querySelectorAll('.portfolio-card');
    const supportsHover = window.matchMedia('(hover: hover)').matches;

    cards.forEach(card => {
      const video = card.querySelector('.portfolio-video');
      if (!video) return;

      if (supportsHover) {
        card.addEventListener('mouseenter', () => {
          video.play().catch(err => console.log("Video play failed on hover:", err));
          video.classList.add('playing');
        });

        card.addEventListener('mouseleave', () => {
          video.pause();
          video.currentTime = 0; // Seamless rewind
          video.classList.remove('playing');
        });
      }
    });

    // Viewport-based play observers for mobile screens (touch displays without hover flags)
    if (!supportsHover) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(err => console.log("Observer play failed:", err));
            video.classList.add('playing');
          } else {
            video.pause();
            video.currentTime = 0;
            video.classList.remove('playing');
          }
        });
      }, { threshold: 0.5 }); // Target 50% in view

      document.querySelectorAll('.portfolio-video').forEach(video => {
        videoObserver.observe(video);
      });
    }
  }

  // Unified global animation initialization
  window.initAllAnimations = function () {
    if (window.animationsInitialized) return;
    window.animationsInitialized = true;

    // Run non-layout work immediately
    initHeroText();
    if (typeof initMobileMenu === 'function') initMobileMenu();
    initFaqAccordion();
    initPortfolioVideos();
    initMoreProjects();
    initVideoModal();

    // Defer ALL ScrollTrigger work to after first paint
    // This prevents the forced reflow during initial load
    requestAnimationFrame(() => {
      setTimeout(() => {
        // All layout reads happen here, after paint is done
        initGeneralReveals();
        initHeadlinesScramble();
        initServicesAnimations();
        initSplitTextParagraphs();
        initFeaturedLists();

        // Single refresh after everything is registered
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 100);
    });
  };

  // Safe DOM ready triggers
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      try {
        if (sessionStorage.getItem('preloaderPlayed') === 'true') {
          window.initAllAnimations();
        }
      } catch (e) {
        console.error("Animations failure:", e);
      }
    });
  } else {
    try {
      if (sessionStorage.getItem('preloaderPlayed') === 'true') {
        window.initAllAnimations();
      }
    } catch (e) {
      console.error("Animations failure:", e);
    }
  }
})();
