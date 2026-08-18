import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crown, Gem } from 'lucide-react';
import heroVideo from '../../assets/hero-video.mp4';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef(null);
  const bgVideoRef = useRef(null);
  const [scrollPhase, setScrollPhase] = useState(0);

  useEffect(() => {
    const bgVideo = bgVideoRef.current;
    const section = sectionRef.current;

    if (bgVideo) {
      bgVideo.play?.().catch(() => {});
      bgVideo.style.transform = 'translate3d(0, 0, 0) scale(1.05)';
    }

    const updateScrollPhase = (progress) => {
      const phase = progress < 0.2 ? 0 : 1;
      setScrollPhase(phase);
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=1200',
      scrub: 0.7,
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        updateScrollPhase(self.progress);

        if (bgVideo) {
          const yOffset = Math.round(self.progress * -60);
          const scale = 1.05 + self.progress * 0.08;
          bgVideo.style.transform = `translate3d(0, ${yOffset}px, 0) scale(${scale})`;
        }
      }
    });

    return () => {
      st.kill();
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
        <div className={`hero-frame ${scrollPhase === 0 ? 'active' : ''}`}>
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

        <div className={`hero-frame ${scrollPhase === 1 ? 'active' : ''}`}>
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
          <span className="hero-counter-num">0{scrollPhase + 1}</span> / 02
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
