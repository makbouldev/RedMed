import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("redmed_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart items from localStorage", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("redmed_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Toast alert manager
  const addToast = (message) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Open and close actions
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Cart logic
  const addToCart = (product, size) => {
    if (!size) {
      addToast("Please select a size first.");
      return false;
    }

    setCartItems((prevItems) => {
      // Find if item with same ID and size exists
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        return [...prevItems, { product, selectedSize: size, quantity: 1 }];
      }
    });

    addToast(`Added ${product.name} (${size}) to bag.`);
    openCart();
    return true;
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
    addToast("Removed item from bag.");
  };

  const updateQuantity = (productId, size, amount) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + amount;
            return { ...item, quantity: Math.max(1, newQty) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("redmed_cart");
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.numericPrice * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        toasts,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToast,
        removeToast,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
