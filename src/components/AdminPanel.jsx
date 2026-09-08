import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import {
  X,
  Plus,
  Search,
  Trash2,
  Edit3,
  RefreshCw,
  Package,
  Sparkles,
  ShieldAlert,
  Layers,
  CheckCircle2,
  DollarSign,
  Tag,
  LogOut
} from 'lucide-react';
import '../styles/admin.css';

const DEFAULT_FORM_STATE = {
  id: '',
  category: 'arabic',
  arabicName: '',
  title: '',
  subtitle: '',
  tag: 'Arabic Private Reserve',
  matchRate: '99.5% Profile Match',
  price: '$165',
  originalRetail: '$420',
  savings: 'Save $255',
  volume: '100ml / 3.4 oz Extrait de Parfum (35% Oil)',
  longevity: '24+ Hours Longevity',
  origin: 'Taif, Saudi Arabia',
  description: '',
  original: {
    brand: 'Designer Brand',
    name: 'Original Parfum',
    image: '/assets/images/original_tom_ford_oud.png',
    retailPrice: '$420',
    concentration: 'Eau de Parfum (15% Oil)'
  },
  inspired: {
    brand: 'Hayati Haute Parfumerie',
    name: 'Hayati Extrait',
    image: '/assets/images/oud_royal.png',
    price: '$165',
    concentration: 'Pure Extrait de Parfum (35% Oil)'
  },
  pyramid: {
    top: 'Wild Saffron, Bergamot, Pink Pepper',
    heart: 'Aged Oud, Damask Rose, Incense',
    base: 'Mysore Sandalwood, Golden Amber, Velvet Musk'
  }
};

export function AdminPanel({ isOpen, onClose, onLogout }) {
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaults } = useProducts();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);

  // Toast state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (!isOpen) return null;

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
      (p.arabicName && p.arabicName.toLowerCase().includes(q)) ||
      (p.original?.brand && p.original.brand.toLowerCase().includes(q)) ||
      (p.original?.name && p.original.name.toLowerCase().includes(q)) ||
      (p.id && p.id.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  // Open Form for Adding New Product
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      ...DEFAULT_FORM_STATE,
      id: `perfume-${Date.now()}`
    });
    setIsFormOpen(true);
  };

  // Open Form for Editing Product
  const handleOpenEdit = (perfume) => {
    setEditingId(perfume.id);
    setFormData({
      id: perfume.id || '',
      category: perfume.category || 'arabic',
      arabicName: perfume.arabicName || '',
      title: perfume.title || '',
      subtitle: perfume.subtitle || '',
      tag: perfume.tag || 'Arabic Private Reserve',
      matchRate: perfume.matchRate || '99.0% Profile Match',
      price: perfume.price || '$165',
      originalRetail: perfume.originalRetail || '$400',
      savings: perfume.savings || 'Save $235',
      volume: perfume.volume || '100ml / 3.4 oz Extrait de Parfum',
      longevity: perfume.longevity || '24+ Hours Longevity',
      origin: perfume.origin || 'Middle East',
      description: perfume.description || '',
      original: {
        brand: perfume.original?.brand || '',
        name: perfume.original?.name || '',
        image: perfume.original?.image || '/assets/images/original_tom_ford_oud.png',
        retailPrice: perfume.original?.retailPrice || perfume.originalRetail || '$400',
        concentration: perfume.original?.concentration || 'Eau de Parfum (15% Oil)'
      },
      inspired: {
        brand: perfume.inspired?.brand || 'Hayati Haute Parfumerie',
        name: perfume.inspired?.name || perfume.title || '',
        image: perfume.inspired?.image || '/assets/images/oud_royal.png',
        price: perfume.inspired?.price || perfume.price || '$165',
        concentration: perfume.inspired?.concentration || 'Pure Extrait de Parfum (35% Oil)'
      },
      pyramid: {
        top: perfume.pyramid?.top || '',
        heart: perfume.pyramid?.heart || '',
        base: perfume.pyramid?.base || ''
      }
    });
    setIsFormOpen(true);
  };

  // Submit Add / Edit Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert('Please fill in required fields: Product Title and Price.');
      return;
    }

    if (editingId) {
      updateProduct(editingId, formData);
      showToast(`Updated product: "${formData.title}"`);
    } else {
      addProduct(formData);
      showToast(`Added new product: "${formData.title}"`);
    }
    setIsFormOpen(false);
  };

  // Delete Product
  const handleDelete = (perfume) => {
    if (window.confirm(`Are you sure you want to delete "${perfume.title}"?`)) {
      deleteProduct(perfume.id);
      showToast(`Deleted product: "${perfume.title}"`);
    }
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    if (window.confirm('Reset all products to original default dataset? Custom additions will be cleared.')) {
      resetToDefaults();
      showToast('Collection reset to initial defaults.');
    }
  };

  // Stats calculation
  const totalCount = products.length;
  const arabicCount = products.filter((p) => p.category === 'arabic').length;
  const keralaCount = products.filter((p) => p.category === 'kerala').length;
  const collectorsCount = products.filter((p) => p.category === 'collectors').length;
  const designerCount = products.filter((p) => p.category === 'designer').length;

  return (
    <div className={`admin-overlay ${isOpen ? 'open' : ''}`} id="admin-overlay">
      <div className="admin-modal-container">
        
        {/* Header */}
        <div className="admin-header">
          <div className="admin-title-group">
            <div className="admin-badge">
              <Sparkles style={{ width: 14, height: 14 }} /> Admin Management Portal
            </div>
            <h2 className="admin-title">
              Hayati Treasury <span className="admin-title-gold">Product Manager</span>
            </h2>
          </div>
          
          <div className="admin-header-actions">
            <button className="btn-admin-outline" onClick={handleResetDefaults} title="Reset to original defaults">
              <RefreshCw style={{ width: 15, height: 15 }} /> Reset Defaults
            </button>
            {onLogout && (
              <button
                className="btn-admin-outline"
                onClick={onLogout}
                style={{ borderColor: 'rgba(220, 53, 69, 0.4)', color: '#ff6b6b' }}
                title="Lock / Logout Administrator Session"
              >
                <LogOut style={{ width: 15, height: 15 }} /> Logout
              </button>
            )}
            <button className="admin-close-btn" onClick={onClose} aria-label="Close Admin Portal">
              <X style={{ width: 20, height: 20 }} />
            </button>
          </div>
        </div>

        {/* Analytics & Stats Bar */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Package style={{ width: 22, height: 22 }} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{totalCount}</span>
              <span className="admin-stat-label">Total Perfumes</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Layers style={{ width: 22, height: 22 }} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{arabicCount}</span>
              <span className="admin-stat-label">Arabic Private Reserve</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Sparkles style={{ width: 22, height: 22 }} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{keralaCount}</span>
              <span className="admin-stat-label">Kerala Botanical Fusion</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Tag style={{ width: 22, height: 22 }} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-value">{collectorsCount + designerCount}</span>
              <span className="admin-stat-label">Gold & Designer Icons</span>
            </div>
          </div>
        </div>

        {/* Toolbar (Search & Add CTA) */}
        <div className="admin-toolbar">
          <div className="admin-search-box">
            <Search className="admin-search-icon" style={{ width: 18, height: 18 }} />
            <input
              type="text"
              className="admin-search-input"
              placeholder="Search by title, brand, Arabic name, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="admin-toolbar-actions">
            <button className="btn-admin-gold" onClick={handleOpenAdd}>
              <Plus style={{ width: 18, height: 18 }} /> Add New Product
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="admin-category-tabs">
          {[
            { id: 'all', label: `All Products (${totalCount})` },
            { id: 'arabic', label: `Arabic Reserve (${arabicCount})` },
            { id: 'kerala', label: `Kerala Fusion (${keralaCount})` },
            { id: 'collectors', label: `Collectors Gold (${collectorsCount})` },
            { id: 'designer', label: `Designer Icons (${designerCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`admin-tab-btn ${filter === tab.id ? 'active' : ''}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Table List */}
        <div className="admin-content-body">
          <div className="admin-table-wrap">
            {filteredProducts.length > 0 ? (
              <table className="admin-products-table">
                <thead>
                  <tr>
                    <th>Perfume Product</th>
                    <th>Category & Tag</th>
                    <th>Hayati Price</th>
                    <th>Original Designer</th>
                    <th>Match Rate</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((perfume) => (
                    <tr key={perfume.id}>
                      <td>
                        <div className="table-product-cell">
                          <img
                            src={perfume.inspired?.image || perfume.original?.image || '/assets/images/oud_royal.png'}
                            alt={perfume.title}
                            className="table-product-thumb"
                            onError={(e) => {
                              e.target.src = '/assets/images/oud_royal.png';
                            }}
                          />
                          <div className="table-product-info">
                            <span className="table-product-title">{perfume.title}</span>
                            <span className="table-product-arabic">{perfume.arabicName}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="table-product-tag">{perfume.tag || perfume.category}</span>
                      </td>
                      <td>
                        <span className="table-price-gold">{perfume.price}</span>
                        {perfume.originalRetail && (
                          <span className="table-original-retail">{perfume.originalRetail}</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.85rem' }}>
                            {perfume.original?.brand || 'Designer'}
                          </span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            {perfume.original?.name || ''}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span style={{ color: 'var(--gold-primary)', fontWeight: 600, fontSize: '0.825rem' }}>
                          {perfume.matchRate || '99% Match'}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions-cell">
                          <button
                            className="btn-icon-action edit"
                            onClick={() => handleOpenEdit(perfume)}
                            title="Edit Perfume Product"
                          >
                            <Edit3 style={{ width: 16, height: 16 }} />
                          </button>
                          <button
                            className="btn-icon-action delete"
                            onClick={() => handleDelete(perfume)}
                            title="Delete Perfume Product"
                          >
                            <Trash2 style={{ width: 16, height: 16 }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="admin-empty-state">
                <Package className="admin-empty-icon" />
                <h3>No perfumes found</h3>
                <p>Try clearing your search or add a new perfume product to the inventory.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Add / Edit Form Modal Drawer */}
      {isFormOpen && (
        <div className="admin-form-overlay">
          <div className="admin-form-card">
            <div className="admin-form-header">
              <h3 className="admin-form-title">
                {editingId ? 'Edit Perfume Masterpiece' : 'Add New Perfume Product'}
              </h3>
              <button className="admin-close-btn" onClick={() => setIsFormOpen(false)}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="admin-form-body">
              
              {/* Basic Details */}
              <div className="admin-form-section-title">
                <Sparkles style={{ width: 14, height: 14 }} /> Basic Product Attributes
              </div>
              <div className="form-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label">Perfume Title *</label>
                  <input
                    type="text"
                    required
                    className="admin-form-input"
                    placeholder="e.g. Hayati Oud Al Malaki"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Arabic Name (اسم العطور)</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. عود الملكي"
                    value={formData.arabicName}
                    onChange={(e) => setFormData({ ...formData, arabicName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="admin-form-group">
                  <label className="admin-form-label">Category</label>
                  <select
                    className="admin-form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="arabic">Arabic Private Reserve</option>
                    <option value="kerala">Kerala Botanical Fusion</option>
                    <option value="collectors">Collectors Gold Editions</option>
                    <option value="designer">Designer Icons</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Tag / Collection Label</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. Arabic Private Reserve"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Match Rate</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. 99.2% Profile Match"
                    value={formData.matchRate}
                    onChange={(e) => setFormData({ ...formData, matchRate: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Subtitle / Inspiration Line</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. Inspired by Tom Ford Oud Wood Private Blend"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>

              {/* Pricing & Volume */}
              <div className="admin-form-section-title">
                <DollarSign style={{ width: 14, height: 14 }} /> Pricing, Volume & Longevity
              </div>
              <div className="form-grid-3">
                <div className="admin-form-group">
                  <label className="admin-form-label">Hayati Price *</label>
                  <input
                    type="text"
                    required
                    className="admin-form-input"
                    placeholder="e.g. $165"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Original Retail Price</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. $445"
                    value={formData.originalRetail}
                    onChange={(e) => setFormData({ ...formData, originalRetail: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Savings Label</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. Save $280"
                    value={formData.savings}
                    onChange={(e) => setFormData({ ...formData, savings: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="admin-form-group">
                  <label className="admin-form-label">Volume Specification</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. 100ml / 3.4 oz Extrait de Parfum"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Longevity</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. 24+ Hours Longevity"
                    value={formData.longevity}
                    onChange={(e) => setFormData({ ...formData, longevity: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Origin</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. Taif, Saudi Arabia & Kerala"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  />
                </div>
              </div>

              {/* Original Specs */}
              <div className="admin-form-section-title">
                <Tag style={{ width: 14, height: 14 }} /> Original Designer Bottle Information
              </div>
              <div className="form-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label">Original Brand</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. Tom Ford"
                    value={formData.original.brand}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        original: { ...formData.original, brand: e.target.value }
                      })
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Original Name</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. Oud Wood Private Blend"
                    value={formData.original.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        original: { ...formData.original, name: e.target.value }
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label">Original Image Path / URL</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. /assets/images/original_tom_ford_oud.png"
                    value={formData.original.image}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        original: { ...formData.original, image: e.target.value }
                      })
                    }
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Hayati Inspired Image Path / URL</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. /assets/images/oud_royal.png"
                    value={formData.inspired.image}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        inspired: { ...formData.inspired, image: e.target.value }
                      })
                    }
                  />
                </div>
              </div>

              {/* Olfactory Pyramid Notes */}
              <div className="admin-form-section-title">
                <Sparkles style={{ width: 14, height: 14 }} /> Olfactory Pyramid Notes
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Top Notes</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. Wild Saffron, Golden Amber, Damask Rose"
                  value={formData.pyramid.top}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pyramid: { ...formData.pyramid, top: e.target.value }
                    })
                  }
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Heart Notes</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. 30-Year Aged Cambodian Oud, Incense Smoke"
                  value={formData.pyramid.heart}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pyramid: { ...formData.pyramid, heart: e.target.value }
                    })
                  }
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Base Notes</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. Royal Mysore Sandalwood, Black Musk, Vanilla Pods"
                  value={formData.pyramid.base}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pyramid: { ...formData.pyramid, base: e.target.value }
                    })
                  }
                />
              </div>

              {/* Description */}
              <div className="admin-form-section-title">
                <Layers style={{ width: 14, height: 14 }} /> Fragrance Description & Craft Story
              </div>
              <div className="admin-form-group">
                <textarea
                  className="admin-form-textarea"
                  placeholder="Write a captivating description of this perfume formulation..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Form Footer Actions */}
              <div className="admin-form-footer">
                <button
                  type="button"
                  className="btn-admin-outline"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-admin-gold">
                  <CheckCircle2 style={{ width: 16, height: 16 }} />
                  {editingId ? 'Save Product Changes' : 'Create Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle2 style={{ width: 18, height: 18, color: 'var(--gold-primary)' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
