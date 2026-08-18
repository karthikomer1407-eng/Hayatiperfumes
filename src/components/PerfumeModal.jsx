import React, { useState } from 'react';
import { X, ChevronUp, Heart, Gem, Sparkles, CheckCircle2 } from 'lucide-react';

export function PerfumeModal({ perfume, onClose }) {
  const [activeTab, setActiveTab] = useState('inspired');

  if (!perfume) return null;

  return (
    <div className="perfume-modal active" id="perfume-modal" onClick={(e) => {
      if (e.target.id === 'perfume-modal') onClose();
    }}>
      <div className="modal-content dual-modal-content">
        <button className="modal-close-btn" onClick={onClose} id="modal-close-btn">
          <X style={{ width: 24, height: 24 }} />
        </button>
        
        {/* Left Side: Dual Bottle Showcase (Original vs Inspired) */}
        <div className="modal-dual-visual-wrap">
          <div className="modal-tab-toggles">
            <button 
              className={`modal-toggle-btn ${activeTab === 'inspired' ? 'active' : ''}`}
              onClick={() => setActiveTab('inspired')}
            >
              Hayati Inspired Bottle ({perfume.inspired.price})
            </button>
            <button 
              className={`modal-toggle-btn ${activeTab === 'original' ? 'active' : ''}`}
              onClick={() => setActiveTab('original')}
            >
              Original Designer ({perfume.original.retailPrice})
            </button>
          </div>

          <div className="modal-image-stage">
            {activeTab === 'inspired' ? (
              <div className="stage-image-container gold-glow">
                <span className="stage-badge gold">Hayati 24K Extrait • {perfume.price}</span>
                <img src={perfume.inspired.image} alt={perfume.inspired.name} className="modal-img" />
              </div>
            ) : (
              <div className="stage-image-container">
                <span className="stage-badge">Original {perfume.original.brand} • {perfume.original.retailPrice}</span>
                <img src={perfume.original.image} alt={perfume.original.name} className="modal-img" />
              </div>
            )}
          </div>

          {/* Quick Comparison Pills */}
          <div className="modal-comparison-pills">
            <div className="comp-pill">
              <span className="comp-label">Scent Match</span>
              <span className="comp-val gold">{perfume.matchRate}</span>
            </div>
            <div className="comp-pill">
              <span className="comp-label">Oil Concentration</span>
              <span className="comp-val">35% Extrait vs 15% EDP</span>
            </div>
            <div className="comp-pill">
              <span className="comp-label">You Save</span>
              <span className="comp-val gold">{perfume.savings}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Scent Details & Pyramid */}
        <div className="modal-details">
          <div className="modal-header-badges">
            <span className="perfume-badge-tag">{perfume.tag}</span>
            <span className="match-rate-badge">
              <Sparkles style={{ width: 12, height: 12, marginRight: 4 }} />
              {perfume.matchRate}
            </span>
          </div>

          <div className="modal-arabic-title">{perfume.arabicName}</div>
          <h2 className="modal-title">{perfume.title}</h2>
          <div className="modal-subtitle">{perfume.subtitle}</div>
          
          <p className="modal-desc-text">
            {perfume.description}
          </p>

          {/* Scent Notes Pyramid */}
          <div className="scent-pyramid-block">
            <div className="pyramid-tier">
              <div className="tier-label">
                <ChevronUp style={{ width: 12, height: 12 }} /> Top Notes
              </div>
              <div className="tier-notes">{perfume.pyramid.top}</div>
            </div>

            <div className="pyramid-tier">
              <div className="tier-label">
                <Heart style={{ width: 12, height: 12 }} /> Heart Notes
              </div>
              <div className="tier-notes">{perfume.pyramid.heart}</div>
            </div>

            <div className="pyramid-tier">
              <div className="tier-label">
                <Gem style={{ width: 12, height: 12 }} /> Base Notes
              </div>
              <div className="tier-notes">{perfume.pyramid.base}</div>
            </div>
          </div>

          {/* Metadata Specs */}
          <div className="modal-meta-grid">
            <div className="meta-box">
              <div className="meta-box-title">Hayati Concentration</div>
              <div className="meta-box-value">{perfume.volume}</div>
            </div>
            <div className="meta-box">
              <div className="meta-box-title">Distillery Origin</div>
              <div className="meta-box-value">{perfume.origin}</div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="modal-action-footer">
            <div className="modal-price-stack">
              <span className="modal-strike-price">Original: {perfume.originalRetail}</span>
              <span className="modal-final-price">{perfume.price}</span>
            </div>
            <button 
              className="btn-gold" 
              onClick={() => alert(`Thank you for acquiring ${perfume.title}. Our private concierge in Dubai will contact you shortly.`)}
            >
              Acquire Inspired Bottle ({perfume.price})
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
