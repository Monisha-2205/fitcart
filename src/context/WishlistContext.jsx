"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("fitcart-wishlist");

      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Could not load wishlist:", error);
    }

    setWishlistLoaded(true);
  }, []);

  useEffect(() => {
    if (!wishlistLoaded) return;

    try {
      localStorage.setItem(
        "fitcart-wishlist",
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error("Could not save wishlist:", error);
    }
  }, [wishlist, wishlistLoaded]);

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentWishlist, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item.id !== productId)
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("fitcart-wishlist");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
