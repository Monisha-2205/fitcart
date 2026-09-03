"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import products from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

export default function ProductPage() {
  const params = useParams();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = products.find(
    (item) => item.id === Number(params.id)
  );

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="container-fc flex min-h-[65vh] items-center justify-center py-20">
          <div className="w-full max-w-lg rounded-3xl border border-line bg-white px-6 py-16 text-center shadow-sm">
            <div className="text-5xl">🔎</div>

            <h1 className="mt-6 text-3xl font-bold text-forest">
              Product Not Found
            </h1>

            <p className="mt-3 text-slate-600">
              We couldn't find the product you're looking for.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-block rounded-full bg-forest px-7 py-3 font-semibold text-white transition hover:bg-forest-dark"
            >
              Back to Shop →
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const savings = Math.max(
    0,
    (product.oldPrice || product.price) - product.price
  );

  const discountPercentage =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) /
            product.oldPrice) *
            100
        )
      : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  return (
    <>
      <Navbar />

      <main className="container-fc py-8 md:py-12">

        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-slate-400 hover:text-forest"
          >
            Home
          </Link>

          <span className="text-slate-300">/</span>

          <Link
            href="/shop"
            className="text-slate-400 hover:text-forest"
          >
            Shop
          </Link>

          <span className="text-slate-300">/</span>

          <span className="font-medium text-forest">
            {product.name}
          </span>
        </div>

        {/* Product */}
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Product Image */}
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-white shadow-sm">

              <img
                src={product.image}
                alt={product.name}
                className="h-[380px] w-full object-cover sm:h-[480px] lg:h-[560px]"
              />

              {/* Sale Badge */}
              {discountPercentage > 0 && (
                <div className="absolute left-5 top-5 rounded-full bg-mango px-4 py-2 text-xs font-bold text-white shadow-sm">
                  {discountPercentage}% OFF
                </div>
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
                className={`absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-md transition hover:scale-105 ${
                  wishlisted
                    ? "text-mango"
                    : "text-slate-700 hover:text-mango"
                }`}
              >
                {wishlisted ? "♥" : "♡"}
              </button>
            </div>

            {/* Trust Cards */}
            <div className="mt-5 grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-line bg-white p-5 text-center shadow-sm">
                <div className="text-2xl">🚚</div>

                <p className="mt-2 text-sm font-bold text-forest">
                  Fast Delivery
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Delivered to your doorstep
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-5 text-center shadow-sm">
                <div className="text-2xl">✓</div>

                <p className="mt-2 text-sm font-bold text-forest">
                  Quality Assured
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Carefully selected products
                </p>
              </div>

            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mango">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-forest md:text-5xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-3">

              <div className="flex gap-1 text-mango">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              <span className="font-semibold text-forest">
                4.8
              </span>

              <span className="text-sm text-slate-500">
                124 verified reviews
              </span>

            </div>

            {/* Price */}
            <div className="mt-7 rounded-2xl bg-sage/50 p-5">

              <div className="flex flex-wrap items-center gap-3">

                <span className="text-3xl font-extrabold text-forest">
                  ₹{product.price}
                </span>

                {product.oldPrice > product.price && (
                  <span className="text-lg text-slate-400 line-through">
                    ₹{product.oldPrice}
                  </span>
                )}

                {discountPercentage > 0 && (
                  <span className="rounded-full bg-mango px-3 py-1 text-xs font-bold text-white">
                    SAVE {discountPercentage}%
                  </span>
                )}

              </div>

              {savings > 0 && (
                <p className="mt-2 text-sm font-medium text-forest">
                  You save ₹{savings} on this product
                </p>
              )}

            </div>

            {/* Description */}
            <div className="mt-7">

              <h2 className="text-lg font-bold text-forest">
                About this product
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Enjoy a quality everyday food choice from FitCart.
                Carefully selected for people who want wholesome,
                delicious and convenient options for their lifestyle.
              </p>

            </div>

            {/* Highlights */}
            <div className="mt-7 border-t border-line pt-7">

              <h2 className="text-lg font-bold text-forest">
                Why you'll love it
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage font-bold text-forest">
                    ✓
                  </span>
                  Quality ingredients
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage font-bold text-forest">
                    ✓
                  </span>
                  Everyday nutrition
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage font-bold text-forest">
                    ✓
                  </span>
                  Great taste
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage font-bold text-forest">
                    ✓
                  </span>
                  Convenient choice
                </div>

              </div>
            </div>

            {/* Quantity */}
            <div className="mt-7 border-t border-line pt-7">

              <p className="text-sm font-bold text-forest">
                Quantity
              </p>

              <div className="mt-3 flex w-fit items-center overflow-hidden rounded-full border border-line bg-white">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  className="flex h-12 w-12 items-center justify-center text-xl font-semibold text-forest transition hover:bg-sage"
                >
                  −
                </button>

                <span className="flex h-12 min-w-14 items-center justify-center border-x border-line px-4 font-bold text-forest">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  className="flex h-12 w-12 items-center justify-center text-xl font-semibold text-forest transition hover:bg-sage"
                >
                  +
                </button>

              </div>

            </div>

            {/* Add To Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`mt-7 w-full rounded-full px-6 py-4 text-base font-bold text-white shadow-sm transition hover:-translate-y-0.5 ${
                added
                  ? "bg-sage-deep"
                  : "bg-forest hover:bg-forest-dark"
              }`}
            >
              {added
                ? "✓ Added to Cart!"
                : `Add ${quantity} to Cart →`}
            </button>

            {/* View Cart */}
            {added && (
              <Link
                href="/cart"
                className="mt-3 block text-center text-sm font-bold text-forest hover:underline"
              >
                View Cart →
              </Link>
            )}

            {/* Delivery */}
            <div className="mt-5 rounded-2xl border border-line bg-white p-5">

              <div className="flex gap-3">
                <span className="text-xl">🚚</span>

                <div>
                  <p className="text-sm font-bold text-forest">
                    Delivery available
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Free delivery on orders above ₹999.
                    Standard delivery charge is ₹49.
                  </p>
                </div>
              </div>

            </div>

            {/* Payment */}
            <div className="mt-3 rounded-2xl bg-cream p-4 text-center text-sm text-slate-600">
              💳 Card / Online Payment &nbsp; • &nbsp; 💵 Cash on Delivery
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-line pt-14">

            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-mango">
                You may also like
              </p>

              <h2 className="mt-2 text-3xl font-bold text-forest">
                More from {product.category}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">

                    <p className="text-xs text-slate-500">
                      {item.category}
                    </p>

                    <h3 className="mt-1 font-bold text-forest">
                      {item.name}
                    </h3>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="font-bold text-forest">
                        ₹{item.price}
                      </span>

                      {item.oldPrice > item.price && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{item.oldPrice}
                        </span>
                      )}
                    </div>

                  </div>

                </Link>
              ))}

            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  );
}