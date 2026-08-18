import React, { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAudioSynth } from './hooks/useAudioSynth';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HeritageSection } from './components/HeritageSection';
import { CollectionVault } from './components/CollectionVault';
import { SideScrollingFooter } from './components/SideScrollingFooter';
import { ArabicNightLoader } from './components/ArabicNightLoader';

import './styles/main.css';
import './styles/hero.css';
import './styles/collection.css';
import './styles/heritage.css';
import './styles/footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { isPlaying, toggleAudio } = useAudioSynth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lenis Smooth Scroll with GSAP ScrollTrigger sync
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="hayati-app">
      {isLoading && (
        <ArabicNightLoader onComplete={() => setIsLoading(false)} />
      )}

      <div className="grain-overlay" />
      <CustomCursor />
      <Navbar isPlayingAudio={isPlaying} toggleAudio={toggleAudio} />
      
      <main>
        <HeroSection />
        <HeritageSection />
        <CollectionVault />
      </main>

      <SideScrollingFooter />
    </div>
  );
}
