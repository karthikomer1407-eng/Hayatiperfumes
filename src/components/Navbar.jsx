import React, { useState, useEffect } from 'react';

export function Navbar({ isPlayingAudio, toggleAudio }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <a href="#hero-section" className="brand-logo">
        <span className="brand-logo-text">HAYATI</span>
        <span className="brand-logo-arabic">حياتي</span>
      </a>

      <nav>
        <ul className="nav-links">
          <li><a href="#hero-section" className="nav-link">The Experience</a></li>
          <li><a href="#collection-section" className="nav-link">Royal Treasury</a></li>
          <li><a href="#heritage-section" className="nav-link">Two Worlds</a></li>
          <li><a href="#alchemist-section" className="nav-link">Scent Alchemist</a></li>
          <li><a href="#footer-section" className="nav-link">Boutiques</a></li>
        </ul>
      </nav>

      <div className="nav-controls">
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

        <a href="#collection-section" className="btn-gold">Acquire Attar</a>
      </div>
    </header>
  );
}
