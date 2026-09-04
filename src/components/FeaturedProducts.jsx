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

  const handleAdd = (product) => {
    const added = addToCart(product);

    if (!added) return;

    setAddedProduct(product.id);

    setTimeout(() => {
      setAddedProduct(null);
    }, 1400);
  };

  return (
    <section id="shop" className="bg-[#ECEAE2] py-24 sm:py-28">
      <div className="container-fc">

        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-[#F47B32]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F47B32]">
                Featured selection
              </span>
            </div>

            <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-[-0.05em] text-[#174C3D] sm:text-5xl lg:text-6xl">
              Essentials for
              <br />
              everyday living.
            </h2>
          </div>

          <Link
            href="/shop"
            className="group flex w-fit items-center gap-3 border-b border-[#174C3D] pb-2 text-sm font-bold text-[#174C3D]"
          >
            View all products
            <span className="transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => {
            const wishlisted = isInWishlist(product.id);

            const discount =
              product.oldPrice > product.price
                ? Math.round(
                    ((product.oldPrice - product.price) /
                      product.oldPrice) *
                      100
                  )
                : 0;

            return (
              <article key={product.id} className="group">

                <div className="relative overflow-hidden bg-white">
                  <Link
                    href={`/product/${product.id}`}
                    className="block"
                  >
                    <div className="aspect-[0.9/1] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </Link>

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="bg-white/90 px-2 py-1 text-[9px] font-bold tracking-[0.16em] text-[#174C3D]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {discount > 0 && (
                      <span className="bg-[#F47B32] px-2 py-1 text-[9px] font-bold tracking-[0.12em] text-white">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label={
                      wishlisted
                        ? `Remove ${product.name} from wishlist`
                        : `Add ${product.name} to wishlist`
                    }
                    className={`absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-white text-lg shadow-sm transition-all ${
                      wishlisted
                        ? "text-[#F47B32]"
                        : "text-[#174C3D] hover:bg-[#174C3D] hover:text-white"
                    }`}
                  >
                    {wishlisted ? "♥" : "♡"}
                  </button>
                </div>

                <div className="pt-5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#7B8882]">
                    {product.category}
                  </span>

                  <Link href={`/product/${product.id}`}>
                    <h3 className="mt-2 font-display text-[19px] font-bold tracking-[-0.025em] text-[#174C3D] transition-colors hover:text-[#F47B32]">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                      <strong className="font-display text-lg font-bold text-[#174C3D]">
                        ₹{product.price}
                      </strong>

                      {product.oldPrice > product.price && (
                        <del className="ml-2 text-xs text-[#8B938F]">
                          ₹{product.oldPrice}
                        </del>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className={`border-b pb-1 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors ${
                        addedProduct === product.id
                          ? "border-[#F47B32] text-[#F47B32]"
                          : "border-[#174C3D] text-[#174C3D] hover:border-[#F47B32] hover:text-[#F47B32]"
                      }`}
                    >
                      {addedProduct === product.id
                        ? "Added ✓"
                        : "Add to cart +"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}