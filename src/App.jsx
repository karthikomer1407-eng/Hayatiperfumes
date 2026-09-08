import React, { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductProvider } from './context/ProductContext';
import { useAudioSynth } from './hooks/useAudioSynth';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HeritageSection } from './components/HeritageSection';
import { CollectionVault } from './components/CollectionVault';
import { AdminPanel } from './components/AdminPanel';
import { AdminAuthModal, isSessionAuthorized, revokeAdminSession } from './components/AdminAuthModal';
import { SideScrollingFooter } from './components/SideScrollingFooter';
import { ArabicNightLoader } from './components/ArabicNightLoader';

import './styles/main.css';
import './styles/hero.css';
import './styles/collection.css';
import './styles/heritage.css';
import './styles/footer.css';
import './styles/admin.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { isPlaying, toggleAudio, playAudio } = useAudioSynth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Admin Portal & Authorization states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    playAudio();
  };

  const handleOpenAdminTrigger = () => {
    if (isSessionAuthorized()) {
      setIsAdminOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthenticatedSuccess = () => {
    setIsAuthModalOpen(false);
    setIsAdminOpen(true);
  };

  const handleLogoutAdmin = () => {
    revokeAdminSession();
    setIsAdminOpen(false);
  };

  // Keyboard shortcut listener (Ctrl + Shift + A) for discreet admin access
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handleOpenAdminTrigger();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    <ProductProvider>
      <div className="hayati-app">
        {isLoading && (
          <ArabicNightLoader onComplete={handleLoaderComplete} />
        )}

        <div className="grain-overlay" />
        <CustomCursor />
        
        {/* User Side Navbar: Clean & uncluttered */}
        <Navbar
          isPlayingAudio={isPlaying}
          toggleAudio={toggleAudio}
        />
        
        <main>
          <HeroSection />
          <HeritageSection />
          <CollectionVault />
        </main>

        {/* Admin Authentication Lock Modal */}
        <AdminAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthenticated={handleAuthenticatedSuccess}
        />

        {/* Authorized Admin Panel */}
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          onLogout={handleLogoutAdmin}
        />

        {/* Footer with subtle discreet admin access point */}
        <SideScrollingFooter onOpenAdmin={handleOpenAdminTrigger} />
      </div>
    </ProductProvider>
  );
}
