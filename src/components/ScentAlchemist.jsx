import React, { useState } from 'react';
import { Wand2, Layers, Flower2, Wind } from 'lucide-react';

export function ScentAlchemist() {
  const [selectedBase, setSelectedBase] = useState('oud');
  const [selectedHeart, setSelectedHeart] = useState('jasmine');
  const [selectedTop, setSelectedTop] = useState('saffron');
  const [bubbles, setBubbles] = useState([]);

  const baseColors = {
    oud: { color1: '#E6CA65', color2: '#99751C', name: 'Royal Oud Base' },
    sandalwood: { color1: '#D4A373', color2: '#8B5E34', name: 'Marayoor Sandalwood Base' },
    teak: { color1: '#582F0E', color2: '#331A04', name: 'Malabar Teak Base' },
    amber: { color1: '#E76F51', color2: '#9A031E', name: 'Warm Amber Resin' }
  };

  const heartColors = {
    jasmine: { accent: '#FFFDF8', name: 'Night Jasmine' },
    rose: { accent: '#E63946', name: 'Crimson Damask Rose' },
    lotus: { accent: '#48CAE4', name: 'Sacred Nilgiri Lotus' },
    cardamom: { accent: '#2A9D8F', name: 'Wayanad Cardamom' }
  };

  const topNames = {
    saffron: 'Golden Saffron',
    bergamot: 'Calabrian Bergamot',
    pepper: 'Black Pepper Zest',
    vanilla: 'Bourbon Vanilla Orchid'
  };

  const baseInfo = baseColors[selectedBase];
  const heartInfo = heartColors[selectedHeart];
  const topName = topNames[selectedTop];

  const formulaName = `Hayati Essence of ${heartInfo.name.split(' ')[0]} & ${baseInfo.name.split(' ')[0]}`;

  const triggerBlendCeremony = () => {
    const newBubbles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 80 + 10,
      size: Math.random() * 12 + 6,
      duration: Math.random() * 2 + 1.5
    }));

    setBubbles(newBubbles);
    setTimeout(() => setBubbles([]), 3000);

    alert(`✨ Custom Formula Blended Successfully!\n\nFormula Name: ${formulaName}\nBase: ${baseInfo.name}\nHeart: ${heartInfo.name}\nTop: ${topName}\n\nOur Master Artisan Perfumer in Dubai will bottle your bespoke elixir.`);
  };

  return (
    <div className="alchemist-section" id="alchemist-section">
      <div className="alchemist-layout">
        
        {/* Visualizer Flask */}
        <div className="alchemist-visualizer">
          <div className="flask-cap" />
          <div className="flask-container">
            <div 
              className="flask-liquid" 
              id="alchemist-liquid"
              style={{
                background: `linear-gradient(180deg, ${heartInfo.accent} 0%, ${baseInfo.color1} 50%, ${baseInfo.color2} 100%)`,
                boxShadow: `0 0 35px ${baseInfo.color1}`
              }}
            >
              {bubbles.map((b) => (
                <div 
                  key={b.id}
                  className="bubble" 
                  style={{
                    left: `${b.left}%`,
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                    animationDuration: `${b.duration}s`
                  }}
                />
              ))}
            </div>
          </div>
          <div className="alchemist-result-name" id="alchemist-result-name">
            {formulaName}
          </div>
        </div>

        {/* Controls */}
        <div className="alchemist-controls">
          <div>
            <div className="section-badge">
              <span>SCENT ALCHEMIST • صانع العطور</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '0.5rem', color: '#FFF' }}>
              Blend Your Custom Elixir
            </h3>
            <p style={{ fontFamily: 'var(--font-subheading)', color: 'var(--text-muted)', fontSize: '1rem' }}>
              Select your preferred base notes, floral heart, and spice top notes to visualize your bespoke Hayati formula.
            </p>
          </div>

          {/* Base Note */}
          <div className="note-selector-group">
            <div className="group-title">
              <Layers style={{ width: 14, height: 14 }} /> 1. Choose Base Note
            </div>
            <div className="note-options">
              {[
                { id: 'oud', label: 'Royal Aged Oud' },
                { id: 'sandalwood', label: 'Marayoor Sandalwood' },
                { id: 'teak', label: 'Malabar Teakwood' },
                { id: 'amber', label: 'Warm Amber Resin' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  className={`option-pill ${selectedBase === opt.id ? 'selected' : ''}`}
                  onClick={() => setSelectedBase(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Heart Note */}
          <div className="note-selector-group">
            <div className="group-title">
              <Flower2 style={{ width: 14, height: 14 }} /> 2. Choose Heart Floral
            </div>
            <div className="note-options">
              {[
                { id: 'jasmine', label: 'Night Jasmine (Mulla)' },
                { id: 'rose', label: 'Crimson Damask Rose' },
                { id: 'lotus', label: 'Sacred Nilgiri Lotus' },
                { id: 'cardamom', label: 'Wayanad Cardamom' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  className={`option-pill ${selectedHeart === opt.id ? 'selected' : ''}`}
                  onClick={() => setSelectedHeart(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Top Note */}
          <div className="note-selector-group">
            <div className="group-title">
              <Wind style={{ width: 14, height: 14 }} /> 3. Choose Top Note
            </div>
            <div className="note-options">
              {[
                { id: 'saffron', label: 'Golden Saffron' },
                { id: 'bergamot', label: 'Calabrian Bergamot' },
                { id: 'pepper', label: 'Black Pepper Zest' },
                { id: 'vanilla', label: 'Bourbon Vanilla' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  className={`option-pill ${selectedTop === opt.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTop(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <button className="btn-gold" onClick={triggerBlendCeremony} style={{ width: '100%', marginTop: '1rem' }}>
              <Wand2 style={{ width: 16, height: 16 }} /> Distill Custom Bottle
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
