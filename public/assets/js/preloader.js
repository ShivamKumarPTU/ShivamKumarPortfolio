/**
 * Shivam Kumar Portfolio - Preloader controller
 * Fast, fail-safe progressive preloader that prevents double-video loading.
 */
(function () {
  const isPreloaderSkipped = sessionStorage.getItem('preloaderPlayed');

  if (isPreloaderSkipped) {
    // Quickly hide preloader before render if possible
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
    
    // Safety check to trigger animations after load
    window.addEventListener('load', () => {
      if (typeof initAllAnimations === 'function') {
        initAllAnimations();
      }
      setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 100);
    });
    return;
  }

  // Record that the preloader has played for this session
  sessionStorage.setItem('preloaderPlayed', 'true');

  const start = Date.now();
  const interval = setInterval(() => {
    const percentageEl = document.getElementById('loader-percentage');
    const barEl = document.getElementById('loader-bar');
    if (!percentageEl) return;

    const elapsed = Date.now() - start;
    // Animate smoothly to 99%
    let progress = Math.min(Math.floor((elapsed / 2200) * 100), 99);

    percentageEl.textContent = `${progress}%`;
    if (barEl) {
      barEl.style.width = `${progress}%`;
    }
  }, 50);

  window.addEventListener('load', () => {
    clearInterval(interval);
    const pEl = document.getElementById('loader-percentage');
    const bEl = document.getElementById('loader-bar');
    if (pEl) pEl.textContent = '100%';
    if (bEl) bEl.style.width = '100%';
    
    setTimeout(() => {
      if (typeof finishPreloader === 'function') {
        finishPreloader();
      } else {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.style.display = 'none';
      }
    }, 250);
  });

  // Failsafe timer (max 5 seconds loading block)
  setTimeout(() => {
    clearInterval(interval);
    const preloader = document.getElementById('preloader');
    if (preloader && preloader.style.display !== 'none') {
      preloader.style.display = 'none';
      if (typeof initAllAnimations === 'function') {
        initAllAnimations();
      }
    }
  }, 5000);
})();
