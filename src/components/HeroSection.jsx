import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gem } from 'lucide-react';
import heroVideo from '../../assets/hero-video.mp4';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef(null);
  const bgVideoRef = useRef(null);
  const frame0Ref = useRef(null);
  const frame1Ref = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const bgVideo = bgVideoRef.current;
    const section = sectionRef.current;
    const frame0 = frame0Ref.current;
    const frame1 = frame1Ref.current;
    const counter = counterRef.current;

    if (!section || !frame0 || !frame1) return;

    if (bgVideo) {
      bgVideo.play?.().catch(() => {});
    }

    // Set initial GSAP states for GPU acceleration
    gsap.set(frame0, { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' });
    gsap.set(frame1, { opacity: 0, y: 35, scale: 0.95, pointerEvents: 'none' });

    const isMobile = window.innerWidth <= 768;
    const pinDistance = isMobile ? '+=750' : '+=1000';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: pinDistance,
          scrub: 0.25, // Snappy, crisp, instant scrub (no lag/delay)
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (counter) {
              const currentNum = self.progress > 0.45 ? '02' : '01';
              if (counter.innerText !== currentNum) {
                counter.innerText = currentNum;
              }
            }
          }
        }
      });

      // Frame 0 ("HAYATI") fades out crisp & clean
      tl.to(frame0, {
        opacity: 0,
        y: -35,
        scale: 0.95,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          if (frame0) frame0.style.pointerEvents = 'none';
        },
        onReverseComplete: () => {
          if (frame0) frame0.style.pointerEvents = 'auto';
        }
      }, 0.1);

      // Frame 1 ("UNSEALING THE MONARCH") slides in crisp & sharp
      tl.to(frame1, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        onStart: () => {
          if (frame1) frame1.style.pointerEvents = 'auto';
        },
        onReverseComplete: () => {
          if (frame1) frame1.style.pointerEvents = 'none';
        }
      }, 0.45);

      // Background video subtle parallax zoom (hardware accelerated)
      if (bgVideo) {
        tl.to(bgVideo, {
          y: -40,
          scale: 1.1,
          duration: 1,
          ease: 'none'
        }, 0);
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero-section" ref={sectionRef} id="hero-section">
      <div className="hero-video-wrap">
        <video
          ref={bgVideoRef}
          className="hero-bg-video"
          id="hero-bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/images/forest_bg.png"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      <div className="forest-sunbeam" />
      <div className="hero-overlay" />

      <div className="hero-content">
        {/* Frame 1: HAYATI */}
        <div className="hero-frame" ref={frame0Ref}>
          <div className="hero-arabic-crest">عطر حياتي الملكي • دبي</div>
          <div className="hero-forest-badge">
            <span className="badge-dot" />
            MAISON DE HAUTE PARFUMERIE • 1974
          </div>
          <h1 className="hero-main-title">HAYATI</h1>
          <p className="hero-sub-tagline">The Royal Essence of Arabia & Imperial Oud</p>
          <div className="hero-cta-group">
            <a href="#collection-section" className="btn-gold">
              <Gem style={{ width: 16, height: 16 }} /> Discover Vault
            </a>
          </div>
        </div>

        {/* Frame 2: UNSEALING THE MONARCH */}
        <div className="hero-frame" ref={frame1Ref}>
          <div className="hero-arabic-crest">فك الختام الملكي</div>
          <div className="hero-forest-badge">
            <span className="badge-dot" />
            STAGE I • PRECISION CAP SEPARATION
          </div>
          <h2 className="hero-main-title">UNSEALING THE MONARCH</h2>
          <p className="hero-sub-tagline">The 24K gold crown stopper gracefully detaches, releasing vintage agarwood vapors.</p>
        </div>
      </div>

      <div className="hero-bottom-bar">
        <div className="hero-counter">
          <span className="hero-counter-num" ref={counterRef}>01</span> / 02
        </div>
        <div className="hero-scroll-prompt">
          <div className="scroll-prompt-icon">
            <div className="scroll-prompt-dot" />
          </div>
          <span>Scroll To Control Fragrance Commercial</span>
        </div>
      </div>
    </section>
  );
}

