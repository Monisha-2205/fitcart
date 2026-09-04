"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function WishlistPage() {
  const { addToCart } = useCart();
  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const [addedProduct, setAddedProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);

    setAddedProduct(product.id);

    setTimeout(() => {
      setAddedProduct(null);
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <main className="container-fc py-12 md:py-16">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-mango">
              Your Favourites
            </p>

            <h1 className="mt-2 text-4xl font-extrabold text-forest md:text-5xl">
              Wishlist
            </h1>

            <p className="mt-3 text-slate-600">
              Products you've saved for later.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="w-fit rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-mango hover:text-mango"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 && (
          <div className="mt-12 flex min-h-[420px] items-center justify-center rounded-3xl border border-line bg-white px-6 py-16 text-center shadow-sm">
            <div className="max-w-md">
              <div className="text-6xl">♡</div>

              <h2 className="mt-6 text-2xl font-bold text-forest">
                Your wishlist is empty
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Save products you love and they'll appear here.
              </p>

              <Link
                href="/shop"
                className="mt-7 inline-block rounded-full bg-forest px-7 py-3 font-semibold text-white transition hover:bg-forest-dark"
              >
                Explore Products →
              </Link>
            </div>
          </div>
        )}

        {/* Wishlist Products */}
        {wishlist.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wishlist.map((product) => {
              const isAdded = addedProduct === product.id;

              return (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Image */}
                  <div className="relative m-3 overflow-hidden rounded-xl bg-slate-100">
                    <Link
                      href={`/product/${product.id}`}
                      className="block"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </Link>

                    {product.oldPrice > product.price && (
                      <span className="absolute left-3 top-3 rounded-full bg-mango px-3 py-1 text-xs font-bold text-white">
                        SALE
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-mango shadow-sm transition hover:scale-105"
                    >
                      ♥
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="px-4 pb-5">

                    <p className="text-xs text-slate-500">
                      {product.category}
                    </p>

                    <Link
                      href={`/product/${product.id}`}
                      className="mt-1 block text-base font-semibold text-forest hover:underline"
                    >
                      {product.name}
                    </Link>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm tracking-wide text-mango">
                        ★★★★★
                      </span>

                      <span className="text-xs text-slate-500">
                        4.8
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="font-bold text-forest">
                        ₹{product.price}
                      </span>

                      {product.oldPrice > product.price && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{product.oldPrice}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className={`mt-4 w-full rounded-full px-4 py-3 text-sm font-semibold text-white transition ${
                        isAdded
                          ? "bg-mango"
                          : "bg-forest hover:bg-forest-dark"
                      }`}
                    >
                      {isAdded
                        ? "✓ Added to Cart"
                        : "Add to Cart"}
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Continue Shopping */}
        {wishlist.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="text-sm font-semibold text-forest hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}
