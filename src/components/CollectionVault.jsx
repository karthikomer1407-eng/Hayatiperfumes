import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { PerfumeModal } from './PerfumeModal';
import { Sparkles, ArrowRight, Search } from 'lucide-react';

export function CollectionVault() {
  const { products } = useProducts();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  const filteredPerfumes = products.filter((p) => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
      (p.arabicName && p.arabicName.toLowerCase().includes(q)) ||
      (p.original?.brand && p.original.brand.toLowerCase().includes(q)) ||
      (p.original?.name && p.original.name.toLowerCase().includes(q)) ||
      (p.pyramid?.top && p.pyramid.top.toLowerCase().includes(q)) ||
      (p.pyramid?.heart && p.pyramid.heart.toLowerCase().includes(q)) ||
      (p.pyramid?.base && p.pyramid.base.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  return (
    <section className="collection-section" id="collection-section">
      <div className="container">
        
        <div className="collection-header-wrap">
          <div className="section-badge">
            <div className="section-badge-line" />
            <span>ORIGINAL VS INSPIRED • خزانة العطور التقييمية</span>
            <div className="section-badge-line" />
          </div>
          <h2 className="section-title">
            Designer Icons & <span className="section-title-gold">Hayati Inspired Attars</span>
          </h2>
          <p className="section-description">
            Experience world-class luxury scent alchemy. Compare legendary designer originals with Hayati's 24K gold Arabian & Malabar Extrait de Parfum interpretations.
          </p>

          {/* Search Bar & Category Controls */}
          <div className="vault-controls-wrap">
            <div className="search-bar-box">
              <Search className="search-icon" style={{ width: 18, height: 18 }} />
              <input
                type="text"
                className="vault-search-input"
                placeholder="Search by perfume name, brand (e.g. Tom Ford, YSL, Hawas, Erba Pura)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs">
              {[
                { id: 'all', label: 'All Masterpieces' },
                { id: 'arabic', label: 'Arabic Private Reserve' },
                { id: 'kerala', label: 'Kerala Botanical Fusion' },
                { id: 'collectors', label: 'Collectors Gold Editions' },
                { id: 'designer', label: 'Designer Icons' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`filter-btn ${filter === tab.id ? 'active' : ''}`}
                  onClick={() => setFilter(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="vault-count-badge">
              Displaying <span className="gold-num">{filteredPerfumes.length}</span> of {products.length} Royal Formulations
            </div>
          </div>
        </div>

        {/* Perfume Cards Grid */}
        {filteredPerfumes.length > 0 ? (
          <div className="perfume-grid">
            {filteredPerfumes.map((p) => (
              <div
                key={p.id}
                className="perfume-card dual-comparison-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setSelectedPerfume(p)}
              >
                <div className="card-top-header">
                  <span className="perfume-badge-tag">{p.tag}</span>
                  <span className="match-rate-badge">
                    <Sparkles style={{ width: 12, height: 12, marginRight: 4 }} />
                    {p.matchRate}
                  </span>
                </div>

                {/* Dual Bottle Display (Original vs Inspired) */}
                <div className="dual-bottle-showcase">
                  {/* Original Designer Bottle */}
                  <div className="bottle-col original-col">
                    <span className="bottle-col-label">Original Designer</span>
                    <div className="bottle-img-box">
                      <img src={p.original.image} alt={p.original.name} className="perfume-img" />
                    </div>
                    <span className="bottle-title-sub">{p.original.brand}</span>
                    <span className="bottle-price-strike">{p.original.retailPrice}</span>
                  </div>

                  {/* VS Badge Divider */}
                  <div className="vs-badge-divider">
                    <span>VS</span>
                  </div>

                  {/* Inspired Hayati Bottle */}
                  <div className="bottle-col inspired-col">
                    <span className="bottle-col-label inspired-label">Hayati Inspired</span>
                    <div className="bottle-img-box gold-glow">
                      <img src={p.inspired.image} alt={p.inspired.name} className="perfume-img" />
                    </div>
                    <span className="bottle-title-sub gold-text">Hayati 24K Attar</span>
                    <span className="bottle-price-highlight">{p.inspired.price}</span>
                  </div>
                </div>

                <div className="perfume-info">
                  <div className="perfume-arabic-name">{p.arabicName}</div>
                  <h3 className="perfume-title">{p.title}</h3>
                  <p className="perfume-desc">{p.subtitle}</p>

                  <div className="scent-notes-preview">
                    <span className="note-chip">{p.pyramid.top.split(',')[0]}</span>
                    <span className="note-chip">{p.pyramid.heart.split(',')[0]}</span>
                    <span className="note-chip">{p.pyramid.base.split(',')[0]}</span>
                  </div>

                  <div className="perfume-footer">
                    <div className="price-comparison-box">
                      <span className="price-savings-tag">{p.savings}</span>
                      <span className="perfume-price">{p.price}</span>
                    </div>
                    <button className="perfume-cta-btn">
                      Compare Notes <ArrowRight style={{ width: 14, height: 14, marginLeft: 4 }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-perfumes-found">
            <Sparkles style={{ width: 36, height: 36, color: 'var(--gold-primary)', marginBottom: 12 }} />
            <h3>No Fragrances Found</h3>
            <p>No perfumes match "{searchQuery}". Try searching for another brand or note.</p>
            <button className="btn-gold" onClick={() => { setSearchQuery(''); setFilter('all'); }}>
              Reset Collection View
            </button>
          </div>
        )}

      </div>

      {/* Modal Detail */}
      <PerfumeModal 
        perfume={selectedPerfume} 
        onClose={() => setSelectedPerfume(null)} 
      />
    </section>
  );
}
