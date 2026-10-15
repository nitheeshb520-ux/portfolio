/**
 * Main Application Engine
 * Web Audio FX, Custom Cursor, Theme Switcher, Modal Drawer, and Form Handler
 */

(function () {
  'use strict';

  // 1. Custom Glowing Cursor Follower
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorOutline = document.querySelector('.custom-cursor-outline');

  if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      // Smooth lerp for outer ring
      outlineX += (mouseX - outlineX) * 0.18;
      outlineY += (mouseY - outlineY) * 0.18;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Hover state over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .glass-card, .filter-tab, .project-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // 2. Web Audio API Futuristic UI Sound Effects
  let audioCtx = null;
  let isSoundEnabled = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playUiTone(freq = 520, type = 'sine', duration = 0.08, gainLevel = 0.05) {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio feedback error', e);
    }
  }

  function playSuccessChord() {
    if (!isSoundEnabled || !audioCtx) return;
    const chords = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
    chords.forEach((note, index) => {
      setTimeout(() => playUiTone(note, 'triangle', 0.22, 0.04), index * 75);
    });
  }

  const soundBtn = document.getElementById('sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      initAudio();
      isSoundEnabled = !isSoundEnabled;
      soundBtn.classList.toggle('sound-on', isSoundEnabled);
      soundBtn.setAttribute('aria-label', isSoundEnabled ? 'Disable Sound Effects' : 'Enable Sound Effects');
      if (isSoundEnabled) {
        playUiTone(660, 'sine', 0.12, 0.08);
        showToast('Futuristic Audio FX Enabled', 'success');
      } else {
        showToast('Audio Muted', 'info');
      }
    });
  }

  // Bind subtle click audio to interactive buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, .btn, .nav-link, .filter-tab')) {
      playUiTone(440, 'sine', 0.06, 0.03);
    }
  });

  // 3. Theme Accent Color Switcher
  const themeDots = document.querySelectorAll('.theme-dot');
  const savedTheme = localStorage.getItem('agy_portfolio_theme') || 'default';

  function applyTheme(themeName) {
    document.body.classList.remove('theme-cyber', 'theme-solar');
    if (themeName === 'cyber') document.body.classList.add('theme-cyber');
    if (themeName === 'solar') document.body.classList.add('theme-solar');

    themeDots.forEach(dot => {
      dot.classList.toggle('active', dot.getAttribute('data-theme') === themeName);
    });
    localStorage.setItem('agy_portfolio_theme', themeName);
  }

  applyTheme(savedTheme);

  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const theme = dot.getAttribute('data-theme');
      applyTheme(theme);
      playUiTone(580, 'sine', 0.1, 0.05);
    });
  });

  // 4. Header Scroll Shrink & Active Nav State
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('open');
      document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    });

    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 5. Toast Notification System
  const toastContainer = document.getElementById('toast-container');

  window.showToast = function (message, type = 'success') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} toast-enter`;

    const iconSvg = type === 'success'
      ? `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
      : `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <div class="toast-message">${message}</div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('toast-enter');
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  };

  // 6. Case Study Modal Engine
  const modalOverlay = document.getElementById('case-study-modal');
  const modalBody = document.getElementById('modal-case-body');
  const modalClose = document.getElementById('modal-close-btn');

  function openCaseStudy(projectId) {
    const project = (window.PORTFOLIO_PROJECTS || []).find(p => p.id === projectId);
    if (!project || !modalBody || !modalOverlay) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="section-tag violet">${project.categoryLabel}</span>
        <h2 style="font-size: 2rem; margin: 0.75rem 0; font-weight: 800;">${project.title}</h2>
        <p style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 1rem;">${project.summary}</p>
        <div style="display: inline-block; background: rgba(0, 229, 168, 0.15); border: 1px solid rgba(0, 229, 168, 0.3); color: var(--accent-secondary); padding: 0.4rem 0.9rem; border-radius: 9999px; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700;">
          Focus: ${project.metric}
        </div>
      </div>

      <div style="display: grid; gap: 1.25rem; margin-bottom: 2rem;">
        <div style="background: rgba(255, 83, 118, 0.08); border-left: 3px solid var(--accent-coral); padding: 1.2rem; border-radius: 6px;">
          <h4 style="color: var(--accent-coral); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 0.4rem; text-transform: uppercase;">01 // Problem &amp; Real Motivation</h4>
          <p style="font-size: 0.95rem; color: #E0E0E6; margin: 0;">${project.problem}</p>
        </div>

        <div style="background: rgba(108, 99, 255, 0.08); border-left: 3px solid var(--accent-primary); padding: 1.2rem; border-radius: 6px;">
          <h4 style="color: var(--accent-primary); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 0.4rem; text-transform: uppercase;">02 // Technical Implementation</h4>
          <p style="font-size: 0.95rem; color: #E0E0E6; margin: 0;">${project.solution}</p>
          <div style="margin-top: 0.6rem; font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-secondary);">
            Architecture: ${project.architecture}
          </div>
        </div>

        <div style="background: rgba(0, 229, 168, 0.08); border-left: 3px solid var(--accent-secondary); padding: 1.2rem; border-radius: 6px;">
          <h4 style="color: var(--accent-secondary); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 0.4rem; text-transform: uppercase;">03 // Key Takeaways &amp; Results</h4>
          <p style="font-size: 0.95rem; color: #E0E0E6; margin: 0;">${project.impact}</p>
        </div>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
        ${project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 1rem; align-items: center; border-top: 1px solid var(--border-glass); padding-top: 1.5rem;">
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          View on GitHub
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        </a>
        <a href="#contact" onclick="document.getElementById('modal-close-btn').click();" class="btn btn-secondary btn-sm">
          Discuss Project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </a>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach case study openers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-case-study]');
    if (trigger) {
      e.preventDefault();
      const id = trigger.getAttribute('data-case-study');
      openCaseStudy(id);
    }
  });

  // 7. Copy to Clipboard Email
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'nitheesh.developer@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!', 'success');
        playUiTone(880, 'triangle', 0.1, 0.05);
      }).catch(() => {
        showToast('Direct email: ' + email, 'info');
      });
    });
  }

  // 8. Contact Form Submission
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('#contact-name').value.trim();
      const email = contactForm.querySelector('#contact-email').value.trim();
      const service = contactForm.querySelector('#contact-service').value;
      const message = contactForm.querySelector('#contact-message').value.trim();
      const submitBtn = contactForm.querySelector('#contact-submit-btn');

      if (!name || !email || !message) {
        showToast('Please complete all required fields.', 'info');
        return;
      }

      // Animated loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
        Transmitting Signal...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        playSuccessChord();
        showToast(`Transmission received, ${name}! I'll respond within 24 hours.`, 'success');
      }, 1200);
    });
  }

  // 9. Back to Top Smooth Scroll
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
