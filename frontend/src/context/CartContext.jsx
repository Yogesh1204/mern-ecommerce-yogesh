import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    // load from localStorage if available
    const stored = localStorage.getItem('cart_items');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, size, qty = 1) => {
    if (!product || !product._id) return;

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product._id && item.size === size
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }

      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          quantity: qty,
        },
      ];
    });
  };

  const removeFromCart = (productId, size) => {
    setItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const getItemCount = () =>
    items.reduce((sum, item) => sum + item.quantity, 0);

  const getTotalPrice = () =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}