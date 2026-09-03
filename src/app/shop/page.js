"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import products from "../../data/products";

function ShopContent() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "All Products";

  const [sortBy, setSortBy] = useState("featured");
  const [addedProduct, setAddedProduct] = useState(null);

  const categories = [
    "All Products",
    "Oats & Cereals",
    "Nut Butters",
    "Nuts & Seeds",
    "Healthy Snacks",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      categoryQuery === "All Products" ||
      product.category === categoryQuery;

    const search = searchQuery.toLowerCase();

    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    }

    if (sortBy === "price-high") {
      return b.price - a.price;
    }

    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    return a.id - b.id;
  });

  const handleCategoryChange = (category) => {
    if (category === "All Products") {
      router.push("/shop");
    } else {
      router.push(
        `/shop?category=${encodeURIComponent(category)}`
      );
    }
  };

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

      <main className="container-fc py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-mango">
            Our Store
          </p>

          <h1 className="text-4xl font-bold text-forest">
            {categoryQuery === "All Products"
              ? "Shop All Products"
              : categoryQuery}
          </h1>

          <p className="mt-3 text-slate-600">
            Find wholesome foods and everyday essentials.
          </p>

          {searchQuery && (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <p className="text-sm text-slate-600">
                Showing results for{" "}
                <span className="font-semibold text-forest">
                  "{searchQuery}"
                </span>
              </p>

              <Link
                href="/shop"
                className="text-sm font-semibold text-mango hover:underline"
              >
                Clear Search
              </Link>
            </div>
          )}
        </div>

        {/* Category + Sort */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  categoryQuery === category
                    ? "bg-forest text-white"
                    : "border border-line bg-white text-ink hover:border-forest"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="text-sm font-medium text-slate-600"
            >
              Sort by:
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink outline-none focus:border-forest"
            >
              <option value="featured">Featured</option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
              <option value="name">
                Name: A to Z
              </option>
            </select>
          </div>
        </div>

        {/* Product Count */}
        <p className="mb-5 text-sm text-slate-500">
          {sortedProducts.length}{" "}
          {sortedProducts.length === 1
            ? "product"
            : "products"}{" "}
          found
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sortedProducts.map((product) => {
            const wishlisted = isInWishlist(product.id);
            const isAdded = addedProduct === product.id;

            return (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-line bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg"
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

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label={
                      wishlisted
                        ? `Remove ${product.name} from wishlist`
                        : `Add ${product.name} to wishlist`
                    }
                    className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-sm transition ${
                      wishlisted
                        ? "text-mango"
                        : "text-slate-700 hover:text-mango"
                    }`}
                  >
                    {wishlisted ? "♥" : "♡"}
                  </button>
                </div>

                {/* Details */}
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

                  {/* Price */}
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

                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className={`mt-4 w-full rounded-full px-4 py-3 text-sm font-semibold text-white transition ${
                      isAdded
                        ? "bg-mango"
                        : "bg-forest hover:opacity-90"
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

        {/* No Products */}
        {sortedProducts.length === 0 && (
          <div className="rounded-2xl border border-line bg-white py-20 text-center">
            <div className="text-5xl">🔎</div>

            <p className="mt-5 text-lg font-semibold text-forest">
              No products found
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Try searching for something else.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-block rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              View All Products
            </Link>
          </div>
        )}

      </main>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream">
          <Navbar />
          <main className="container-fc py-16">
            <p className="text-center text-slate-500">
              Loading products...
            </p>
          </main>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}