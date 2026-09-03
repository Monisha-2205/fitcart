"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import products from "../data/products";

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [addedProduct, setAddedProduct] = useState(null);

  const featuredProducts = products.slice(0, 4);

  const handleAddToCart = (product) => {
    addToCart(product);

    setAddedProduct(product.id);

    setTimeout(() => {
      setAddedProduct(null);
    }, 1500);
  };

  return (
    <section
      id="shop"
      className="container-fc py-16 md:py-20"
    >
      {/* Header */}
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mango">
            Our picks
          </p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-forest md:text-4xl">
            Customer favourites
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Everyday essentials our customers keep coming back for.
          </p>
        </div>

        <Link
          href="/shop"
          className="hidden shrink-0 rounded-full border border-line bg-white px-5 py-3 text-sm font-bold text-forest transition hover:border-forest hover:bg-sage sm:block"
        >
          View All →
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => {
          const wishlisted = isInWishlist(product.id);
          const isAdded = addedProduct === product.id;

          const discount =
            product.oldPrice > product.price
              ? Math.round(
                  ((product.oldPrice - product.price) /
                    product.oldPrice) *
                    100
                )
              : 0;

          return (
            <div
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative m-3 overflow-hidden rounded-2xl bg-slate-100">
                <Link
                  href={`/product/${product.id}`}
                  className="block"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Sale Badge */}
                {discount > 0 && (
                  <span className="absolute left-3 top-3 rounded-full bg-mango px-3 py-1.5 text-[11px] font-extrabold tracking-wide text-white shadow-sm">
                    {discount}% OFF
                  </span>
                )}

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  aria-label={
                    wishlisted
                      ? `Remove ${product.name} from wishlist`
                      : `Add ${product.name} to wishlist`
                  }
                  className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-md transition hover:scale-105 ${
                    wishlisted
                      ? "text-mango"
                      : "text-slate-700 hover:text-mango"
                  }`}
                >
                  {wishlisted ? "♥" : "♡"}
                </button>
              </div>

              {/* Product Information */}
              <div className="px-5 pb-5">

                <p className="text-xs font-medium text-slate-400">
                  {product.category}
                </p>

                <Link
                  href={`/product/${product.id}`}
                  className="mt-1 block text-base font-bold leading-6 text-forest hover:underline"
                >
                  {product.name}
                </Link>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="tracking-wide text-mango">
                    ★★★★★
                  </span>

                  <span className="text-xs font-medium text-slate-500">
                    4.8
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-lg font-extrabold text-forest">
                    ₹{product.price}
                  </span>

                  {product.oldPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through">
                      ₹{product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Add To Cart */}
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className={`mt-4 w-full rounded-full px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 ${
                    isAdded
                      ? "bg-mango"
                      : "bg-forest hover:bg-forest-dark"
                  }`}
                >
                  {isAdded
                    ? "✓ Added to Cart"
                    : "Add to Cart →"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile CTA */}
      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/shop"
          className="inline-flex rounded-full border border-line bg-white px-6 py-3 text-sm font-bold text-forest transition hover:border-forest hover:bg-sage"
        >
          View All Products →
        </Link>
      </div>
    </section>
  );
}