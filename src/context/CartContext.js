import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'mcs-product-order-list-v1';
const CartContext = createContext(null);

function readCart() {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value.filter((item) => item && item.product && item.product.id && Number(item.quantity) > 0) : [];
  } catch (error) {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (error) { /* Private browsing may block storage. */ }
  }, [items]);

  const addItem = useCallback((product, quantity = 1) => {
    if (!product || !product.id) return;
    const increment = Math.max(1, Math.min(99, Number(quantity) || 1));
    setItems((current) => {
      const found = current.find((item) => item.product.id === product.id);
      if (!found) return [...current, { product, quantity: increment }];
      return current.map((item) => item.product.id === product.id
        ? { product, quantity: Math.min(99, item.quantity + increment) }
        : item);
    });
  }, []);

  const setQuantity = useCallback((productId, quantity) => {
    const next = Math.max(1, Math.min(99, Number(quantity) || 1));
    setItems((current) => current.map((item) => item.product.id === productId ? { ...item, quantity: next } : item));
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);
  const value = useMemo(() => ({ items, cartCount, addItem, setQuantity, removeItem, clearCart }), [items, cartCount, addItem, setQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used within CartProvider');
  return value;
}
