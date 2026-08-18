import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Moon, Star } from 'lucide-react';
import '../styles/arabicLoader.css';

const MILESTONES = [
  { threshold: 20, ar: "جني ورد النجوم في غسق الليل", en: "Gathering Midnight Taif Rose Buds" },
  { threshold: 40, ar: "استخلاص عتيق العود الملكي", en: "Distilling 50-Year Cambodian Oud Resin" },
  { threshold: 60, ar: "مزج نفحات المسك والعنبر الذهبي", en: "Infusing Royal Black Musk & Liquid Amber" },
  { threshold: 80, ar: "ختم زجاجات العطر بذهب ٢٤ قيراط", en: "Sealing Flacon Stopper in 24K Gold Foil" },
  { threshold: 100, ar: "افتتاح ليلة العطور العربية الملكية", en: "Awakening The Arabian Night Treasury" }
];

export function ArabicNightLoader({ onComplete }) {
  const [progress, setProgress] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef(null);

  // Web Audio Synth Chime on Complete
  const playGoldChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major pentatonic luxury shimmer
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.08 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 1.2);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 1.3);
      });
    } catch (err) {
      // Audio context fallback silent
    }
  };

  // 1-100% Progress Count Animation
  useEffect(() => {
    let startTimestamp = null;
    const duration = 2800; // 2.8 seconds smooth progress

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100) + 1);

      setProgress(currentProgress);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        // Reached 100%
        playGoldChime();
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800); // Shutter curtain animation duration
        }, 400);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Canvas Starry Sky Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 90 starry particles
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.005,
      gold: Math.random() > 0.6
    }));

    let animId;
    const renderStars = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.speed = -star.speed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.gold 
          ? `rgba(230, 202, 101, ${Math.abs(star.alpha)})` 
          : `rgba(255, 255, 255, ${Math.abs(star.alpha) * 0.8})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(renderStars);
    };

    renderStars();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Format progress into individual digit spans (e.g. 001 to 100)
  const formattedProgress = String(progress).padStart(2, '0');
  const digits = formattedProgress.split('');

  // Find active milestone text based on progress
  const activeMilestone = MILESTONES.find(m => progress <= m.threshold) || MILESTONES[MILESTONES.length - 1];

  return (
    <div className={`arabic-loader-overlay ${isExiting ? 'exiting' : ''}`}>
      {/* Top & Bottom Shutter Curtains for Exit Wiping */}
      <div className="arabic-loader-curtain top" />
      <div className="arabic-loader-curtain bottom" />

      {/* Canvas Starry Night Background */}
      <canvas ref={canvasRef} className="arabic-starry-canvas" />
      <div className="arabic-loader-bg-pattern" />
      <div className="loader-nebula-glow" />

      {/* Main Loader Content Box */}
      <div className="arabic-loader-content">
        {/* Arch Frame Crest */}
        <div className="arabic-loader-arch-frame">
          <span className="arch-ornament">✦ HAYATI ✦</span>
        </div>

        {/* Crescent Moon & Star Ornament */}
        <div className="arabic-moon-container">
          <div className="arabic-crescent-moon" />
          <Star className="arabic-star-ornament" />
        </div>

        {/* Calligraphic Header */}
        <div className="arabic-loader-header">
          <div className="arabic-loader-crest-text">ألف ليلة وليلة</div>
          <div className="arabic-loader-sub-crest">ARABIAN NIGHTS PERFUMERY</div>
        </div>

        {/* 1-100% Span Counter Display */}
        <div className="arabic-span-counter-wrapper">
          <div className="loader-digit-group">
            {digits.map((digit, index) => (
              <span key={index} className="loader-span-digit">
                {digit}
              </span>
            ))}
          </div>
          <span className="loader-span-unit">%</span>
        </div>

        {/* Liquid Gold Span Progress Bar */}
        <div className="arabic-progress-bar-container">
          <div className="arabic-progress-track">
            <span 
              className="loader-span-bar-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Dynamic Arabic & English Milestone Spans */}
        <div className="arabic-milestone-box">
          <span className="arabic-milestone-text-span">
            {activeMilestone.ar}
          </span>
          <span className="english-milestone-text-span">
            {activeMilestone.en}
          </span>
        </div>

        {/* Footer Accent Lines */}
        <div className="arabic-loader-footer">
          <div className="loader-corner-line" />
          <span className="loader-footer-badge">EST. 1974 • ROYAL TREASURY</span>
          <div className="loader-corner-line" />
        </div>
      </div>
    </div>
  );
}
