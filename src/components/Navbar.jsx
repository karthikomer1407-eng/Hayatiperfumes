import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar({ isPlayingAudio, toggleAudio }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <a href="#hero-section" className="brand-logo" onClick={closeMobileMenu}>
          <span className="brand-logo-text">HAYATI</span>
          <span className="brand-logo-arabic">حياتي</span>
        </a>

        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><a href="#hero-section" className="nav-link">The Experience</a></li>
            <li><a href="#collection-section" className="nav-link">Royal Treasury</a></li>
            <li><a href="#heritage-section" className="nav-link">Two Worlds</a></li>
            <li><a href="#alchemist-section" className="nav-link">Scent Alchemist</a></li>
            <li><a href="#footer-section" className="nav-link">Boutiques</a></li>
          </ul>
        </nav>

        <div className="nav-controls desktop-controls">
          <button 
            className={`audio-toggle-btn ${isPlayingAudio ? 'audio-active' : ''}`} 
            onClick={toggleAudio}
            aria-label="Toggle audio"
          >
            <div className="sound-waves">
              <div className="sound-wave-bar"></div>
              <div className="sound-wave-bar"></div>
              <div className="sound-wave-bar"></div>
            </div>
            <span className="sound-btn-text">
              {isPlayingAudio ? 'Arabic Sound: On' : 'Sound: Off'}
            </span>
          </button>

          <a href="#collection-section" className="btn-gold">Acquire Attar</a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X style={{ width: 24, height: 24 }} /> : <Menu style={{ width: 24, height: 24 }} />}
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <ul className="mobile-nav-links">
            <li><a href="#hero-section" className="mobile-nav-link" onClick={closeMobileMenu}>The Experience</a></li>
            <li><a href="#collection-section" className="mobile-nav-link" onClick={closeMobileMenu}>Royal Treasury</a></li>
            <li><a href="#heritage-section" className="mobile-nav-link" onClick={closeMobileMenu}>Two Worlds</a></li>
            <li><a href="#alchemist-section" className="mobile-nav-link" onClick={closeMobileMenu}>Scent Alchemist</a></li>
            <li><a href="#footer-section" className="mobile-nav-link" onClick={closeMobileMenu}>Boutiques</a></li>
          </ul>

          <div className="mobile-drawer-actions">
            <button 
              className={`audio-toggle-btn ${isPlayingAudio ? 'audio-active' : ''}`} 
              onClick={toggleAudio}
            >
              <div className="sound-waves">
                <div className="sound-wave-bar"></div>
                <div className="sound-wave-bar"></div>
                <div className="sound-wave-bar"></div>
              </div>
              <span className="sound-btn-text">
                {isPlayingAudio ? 'Arabic Sound: On' : 'Sound: Off'}
              </span>
            </button>

            <a href="#collection-section" className="btn-gold" onClick={closeMobileMenu}>
              Acquire Attar
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

