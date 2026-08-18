/* ==========================================================================
   HAYATI MAIN APP INITIALIZER
   GSAP ScrollTrigger setup, Lenis smooth scroll, Custom Cursor, Web Audio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Hero Canvas Engine
  const heroCanvas = new HeroCanvasEngine();

  // 2. Register GSAP ScrollTrigger & Unpinned Instant Scroll Frames
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll Progress Bar Update
    const progressBar = document.getElementById('scroll-progress-bar');
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (progressBar) progressBar.style.width = `${scrolled}%`;
    });

    // Sticky Navbar Glass Background on Scroll
    const navbar = document.getElementById('navbar');
    ScrollTrigger.create({
      start: 'top -50',
      onUpdate: (self) => {
        if (self.direction === 1) {
          navbar.classList.add('scrolled');
        } else if (self.scroll() < 50) {
          navbar.classList.remove('scrolled');
        }
      }
    });

    // Pinned Hero Section Video Scroll Timeline & Video Sync
    const bgVideo = document.getElementById('hero-bg-video');

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: '+=280%',
        scrub: 0.4,
        pin: true,
        onUpdate: (self) => {
          heroCanvas.updateScrollProgress(self.progress);

          // Video currentTime scrubbing & zoom
          if (bgVideo && !isNaN(bgVideo.duration) && bgVideo.duration > 0) {
            try {
              bgVideo.currentTime = self.progress * bgVideo.duration;
            } catch (e) {}
          }
          if (bgVideo) {
            bgVideo.style.transform = `scale(${1.05 + self.progress * 0.18})`;
          }

          // 4 Chapter Hero Text Animations
          const frame1 = document.getElementById('hero-frame-1');
          const frame2 = document.getElementById('hero-frame-2');
          const frame3 = document.getElementById('hero-frame-3');
          const frame4 = document.getElementById('hero-frame-4');

          const allFrames = [frame1, frame2, frame3, frame4];

          let activeIdx = 0;
          if (self.progress < 0.25) activeIdx = 0;
          else if (self.progress >= 0.25 && self.progress < 0.5) activeIdx = 1;
          else if (self.progress >= 0.5 && self.progress < 0.75) activeIdx = 2;
          else activeIdx = 3;

          allFrames.forEach((f, idx) => {
            if (idx === activeIdx) f?.classList.add('active');
            else f?.classList.remove('active');
          });

          const counterNum = document.getElementById('hero-counter-num');
          if (counterNum) {
            counterNum.textContent = `0${activeIdx + 1}`;
          }
        }
      }
    });

    // Reveal Animations for Heritage & Collection Sections
    gsap.utils.toArray('.heritage-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    });
  }

  // 4. Initialize Perfume Collection Vault & Alchemist
  new PerfumeCollectionVault();
  new ScentAlchemist();

  // 5. Custom Fluid Gold Cursor
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursor) {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    }
  });

  function renderCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    if (follower) {
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover cursor scale on interactive elements
  const hoverables = document.querySelectorAll('a, button, .perfume-card, .option-pill, .filter-btn');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // 6. Web Audio API - Authentic Feel-Good Arabic Acoustic Oud & Ney Synthesizer
  let audioCtx = null;
  let isPlayingAudio = false;
  const audioBtn = document.getElementById('audio-toggle-btn');
  let masterGain = null;
  let oudTimer = null;

  // Arabic Maqam Hijaz Frequencies (Acoustic Oud & Ney scale)
  const ArabicOudScale = [
    146.83, // D3
    155.56, // Eb3
    185.00, // F#3
    196.00, // G3
    220.00, // A3
    233.08, // Bb3
    261.63, // C4
    293.66, // D4
    311.13, // Eb4
    369.99  // F#4
  ];

  // Feel-good Arabic melody phrase sequence
  const ArabicMelodyPattern = [0, 2, 4, 3, 5, 4, 2, 0, 3, 2, 1, 0, 4, 6, 5, 4, 3, 2, 1, 0];

  function playArabicOudPluck(freq, duration = 1.2) {
    if (!audioCtx || !isPlayingAudio) return;

    const osc = audioCtx.createOscillator();
    const subOsc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Dual acoustic oscillators (Triangle + Sawtooth with lowpass filter for realistic Oud body)
    osc.type = 'triangle';
    subOsc.type = 'sawtooth';

    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    subOsc.frequency.setValueAtTime(freq * 0.5, audioCtx.currentTime);

    // Warm Low Pass Filter
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, audioCtx.currentTime);
    filter.Q.setValueAtTime(3, audioCtx.currentTime);

    // Pluck Envelope (Fast Attack, Exponential Decay)
    const now = audioCtx.currentTime;
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(masterGain);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + duration);
    subOsc.stop(now + duration);
  }

  function startArabicOudMelody() {
    let noteIdx = 0;
    function nextNote() {
      if (!isPlayingAudio) return;
      const noteOffset = ArabicMelodyPattern[noteIdx % ArabicMelodyPattern.length];
      const freq = ArabicOudScale[noteOffset];
      playArabicOudPluck(freq, 1.4);
      noteIdx++;
      oudTimer = setTimeout(nextNote, 420); // 420ms feel-good rhythm tempo
    }
    nextNote();
  }

  function initWebAudio() {
    if (audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    // Soft Warm Ambient Ney Flute Drone Pad
    [146.83, 220.00].forEach((freq) => {
      const droneOsc = audioCtx.createOscillator();
      const droneGain = audioCtx.createGain();
      droneOsc.type = 'sine';
      droneOsc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      droneGain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      droneOsc.connect(droneGain);
      droneGain.connect(masterGain);
      droneOsc.start();
    });
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (!audioCtx) initWebAudio();

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      isPlayingAudio = !isPlayingAudio;

      if (isPlayingAudio) {
        masterGain.gain.setTargetAtTime(0.12, audioCtx.currentTime, 0.3);
        audioBtn.classList.add('audio-active');
        audioBtn.querySelector('.sound-btn-text').textContent = 'Arabic Sound: On';
        startArabicOudMelody();
      } else {
        masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.3);
        audioBtn.classList.remove('audio-active');
        audioBtn.querySelector('.sound-btn-text').textContent = 'Sound: Off';
        if (oudTimer) clearTimeout(oudTimer);
      }
    });
  }

  // 7. Live Dual Time Clocks (Dubai GMT+4 & Kochi GMT+5:30)
  function updateLiveClocks() {
    const dubaiTimeEl = document.getElementById('dubai-time');
    const kochiTimeEl = document.getElementById('kochi-time');

    const now = new Date();

    if (dubaiTimeEl) {
      dubaiTimeEl.textContent = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + ' GST';
    }

    if (kochiTimeEl) {
      kochiTimeEl.textContent = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + ' IST';
    }
  }

  setInterval(updateLiveClocks, 1000);
  updateLiveClocks();
});
