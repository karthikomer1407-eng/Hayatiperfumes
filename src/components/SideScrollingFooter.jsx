import React, { useState, useEffect } from 'react';

export function SideScrollingFooter() {
  const [dubaiTime, setDubaiTime] = useState('--:--:--');
  const [kochiTime, setKochiTime] = useState('--:--:--');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setDubaiTime(now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + ' GST');

      setKochiTime(now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + ' IST');
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer-section" id="footer-section">

      {/* Dual Animated Side-Scrolling Marquee Ticker */}
      <div className="marquee-container">
        {/* Ticker 1: Left */}
        <div className="marquee-track marquee-left">
          <div className="marquee-item">
            <span>HAYATI</span> <span className="marquee-star">•</span>
            <span>ROYAL ESSENCE OF ARABIA & KERALA</span> <span className="marquee-star">•</span>
            <span>AGED OUD</span> <span className="marquee-star">•</span>
            <span>STAR JASMINE</span> <span className="marquee-star">•</span>
            <span>CARDAMOM GOLD</span> <span className="marquee-star">•</span>
            <span>HAYATI</span> <span className="marquee-star">•</span>
            <span>ROYAL ESSENCE OF ARABIA & KERALA</span> <span className="marquee-star">•</span>
          </div>
          <div className="marquee-item">
            <span>HAYATI</span> <span className="marquee-star">•</span>
            <span>ROYAL ESSENCE OF ARABIA & KERALA</span> <span className="marquee-star">•</span>
            <span>AGED OUD</span> <span className="marquee-star">•</span>
            <span>STAR JASMINE</span> <span className="marquee-star">•</span>
            <span>CARDAMOM GOLD</span> <span className="marquee-star">•</span>
            <span>HAYATI</span> <span class="marquee-star">•</span>
            <span>ROYAL ESSENCE OF ARABIA & KERALA</span> <span className="marquee-star">•</span>
          </div>
        </div>

        {/* Ticker 2: Right */}
        <div className="marquee-track marquee-right">
          <div className="marquee-item marquee-arabic">
            <span>حياتي</span> <span className="marquee-star">•</span>
            <span>عطور فاخرة متميزة</span> <span className="marquee-star">•</span>
            <span>الروح العربية والجمال الهندوسي</span> <span className="marquee-star">•</span>
            <span>١٩٧٤</span> <span className="marquee-star">•</span>
            <span>حياتي</span> <span className="marquee-star">•</span>
            <span>عطور فاخرة متميزة</span> <span className="marquee-star">•</span>
          </div>
          <div className="marquee-item marquee-arabic">
            <span>حياتي</span> <span className="marquee-star">•</span>
            <span>عطور فاخرة متميزة</span> <span className="marquee-star">•</span>
            <span>الروح العربية والجمال الهندوسي</span> <span className="marquee-star">•</span>
            <span>١٩٧٤</span> <span className="marquee-star">•</span>
            <span>حياتي</span> <span className="marquee-star">•</span>
            <span>عطور فاخرة متميزة</span> <span className="marquee-star">•</span>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="footer-body container">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo">HAYATI</div>
          <div className="footer-arabic-desc">حياتي - جوهر الفخامة العطرية من الجزيرة العربية ومالابار</div>
          <p className="footer-desc">
            Distilling rare Arabian oud, Taif rose, and Malabar spices into award-winning extraits de parfum. Crafted in small numbered batches for perfume connoisseurs worldwide.
          </p>

          {/* Live Clocks */}
          <div className="live-clocks-wrap">
            <div className="clock-box">
              <div className="clock-city">Dubai (GST) 🇦🇪</div>
              <div className="clock-time">{dubaiTime}</div>
            </div>
            <div className="clock-box">
              <div className="clock-city">Kochi (IST) 🇮🇳</div>
              <div className="clock-time">{kochiTime}</div>
            </div>
          </div>
        </div>

        {/* Treasury Links */}
        <div>
          <h4 className="footer-col-title">Treasury</h4>
          <ul className="footer-links-list">
            <li><a href="#collection-section" className="footer-link">Arabic Private Reserve</a></li>
            <li><a href="#collection-section" className="footer-link">Kerala Botanical Fusion</a></li>
            <li><a href="#collection-section" className="footer-link">Collectors Gold 1974</a></li>
            <li><a href="#collection-section" className="footer-link">Attar Oil Concentrates</a></li>
            <li><a href="#alchemist-section" className="footer-link">Custom Scent Alchemist</a></li>
          </ul>
        </div>

        {/* Maison Links */}
        <div>
          <h4 className="footer-col-title">Maison</h4>
          <ul className="footer-links-list">
            <li><a href="#heritage-section" className="footer-link">Our Heritage Story</a></li>
            <li><a href="#hero-section" className="footer-link">Distillation Alchemy</a></li>
            <li><a href="#footer-section" className="footer-link">Dubai Royal Flagship</a></li>
            <li><a href="#footer-section" className="footer-link">Kochi Heritage Boutique</a></li>
            <li><a href="#footer-section" className="footer-link">Press & Accolades</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="newsletter-wrap">
          <h4 className="footer-col-title">Royal Gazette</h4>
          <p className="footer-desc" style={{ fontSize: '0.95rem' }}>
            Subscribe to receive invitations to rare private reserve drops and private olfactory tastings.
          </p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Hayati Gazette.'); }}>
            <input type="email" className="newsletter-input" placeholder="Enter your email address" required />
            <button type="submit" className="newsletter-submit-btn">Join</button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom container">
        <div className="footer-copy">
          &copy; 2026 HAYATI (حياتي) PARFUMS. All Rights Reserved. React Edition.
        </div>
      </div>

    </footer>
  );
}
