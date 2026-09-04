"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [stockMessage, setStockMessage] = useState("");

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("fitcart-cart");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Could not load cart:", error);
    }

    setCartLoaded(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!cartLoaded) return;

    try {
      localStorage.setItem("fitcart-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }, [cart, cartLoaded]);

  // Add product
  const addToCart = (product) => {
    const stock = Number(product.stock);

    if (stock <= 0) {
      setStockMessage(`${product.name} is out of stock.`);
      return false;
    }

    let added = false;

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        if (existingProduct.quantity >= stock) {
          setStockMessage(
            `Only ${stock} ${product.name} available in stock.`
          );
          return currentCart;
        }

        added = true;

        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                ...product,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      added = true;

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    if (added) {
      setStockMessage("");
    }

    return added;
  };

  // Remove product
  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );

    setStockMessage("");
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        const stock = Number(item.stock);

        if (quantity > stock) {
          setStockMessage(
            `Only ${stock} ${item.name} available in stock.`
          );
        } else {
          setStockMessage("");
        }

        return {
          ...item,
          quantity: Math.min(quantity, stock),
        };
      })
    );
  };

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
    setStockMessage("");
    localStorage.removeItem("fitcart-cart");
  }, []);

  // Number of items
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        stockMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}