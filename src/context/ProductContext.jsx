import React, { createContext, useContext, useState, useEffect } from 'react';
import { PERFUME_COLLECTION } from '../data/perfumeData';

const STORAGE_KEY = 'hayati_perfume_products_v1';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load products from localStorage:', e);
    }
    return PERFUME_COLLECTION;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage:', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const formattedId = newProduct.id || newProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const productToAdd = {
      ...newProduct,
      id: formattedId || `perfume-${Date.now()}`
    };
    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetToDefaults = () => {
    setProducts(PERFUME_COLLECTION);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear localStorage key:', e);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaults
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
