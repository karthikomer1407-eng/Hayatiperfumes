import React from 'react';
import { Crown, Leaf } from 'lucide-react';
import { ScentAlchemist } from './ScentAlchemist';

export function HeritageSection() {
  return (
    <section className="heritage-section" id="heritage-section">
      <div className="container">
        
        <div className="section-badge">
          <div className="section-badge-line" />
          <span>TALE OF TWO WORLDS • قصة عالمين</span>
        </div>

        <h2 className="section-title">
          Where Desert Sand Dunes Meet <span className="section-title-gold">Malabar Backwaters</span>
        </h2>

        <p className="section-description">
          Hayati (حياتي), meaning "My Life", is a tribute to the historic spice maritime route between Arabia and Kerala. We fuse the dark richness of Arabian agarwood with fresh night-blooming Malabar botanicals.
        </p>

        <div className="heritage-grid">
          {/* Card 1 */}
          <div className="heritage-card heritage-card-arabic">
            <div className="heritage-flag-badge">
              <Crown style={{ width: 16, height: 16 }} />
              <span>ARABIAN OUD ALCHEMY • الإمارات العربية</span>
            </div>
            <h3 className="heritage-card-title">Royal Palace Perfumery</h3>
            <p className="heritage-card-text">
              For centuries, the royal courts of Dubai, Muscat, and Taif distilled ambergris, saffron, and wild-harvested agarwood smoke to create incense reserved strictly for royalty.
            </p>
          </div>

          {/* Card 2 */}
          <div className="heritage-card">
            <div className="heritage-flag-badge">
              <Leaf style={{ width: 16, height: 16 }} />
              <span>KERALA BOTANICAL HERITAGE • കേരളം</span>
            </div>
            <h3 className="heritage-card-title">Malabar Spice & Florals</h3>
            <p className="heritage-card-text">
              From the lush green hills of Wayanad cardamom plantations to midnight-blooming star jasmine gardens in Kerala, we hand-collect raw botanical essences at dawn.
            </p>
          </div>
        </div>

        {/* Scent Alchemist */}
        <ScentAlchemist />

      </div>
    </section>
  );
}
