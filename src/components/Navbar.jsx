"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    setSearchOpen(false);
    setMenuOpen(false);

    router.push(`/shop?search=${encodeURIComponent(query)}`);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-fc flex h-20 items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-extrabold tracking-tight"
        >
          <span className="text-forest">Fit</span>
          <span className="text-mango">Cart</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-700 transition hover:text-forest"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="text-sm font-semibold text-slate-700 transition hover:text-forest"
          >
            Shop
          </Link>

          <Link
            href="/#categories"
            className="text-sm font-semibold text-slate-700 transition hover:text-forest"
          >
            Categories
          </Link>

          <Link
            href="/#about"
            className="text-sm font-semibold text-slate-700 transition hover:text-forest"
          >
            About
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 md:flex">

          {/* Search */}
          <button
            type="button"
            onClick={() => setSearchOpen((current) => !current)}
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg transition hover:bg-sage hover:text-forest"
          >
            🔍
          </button>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-xl transition hover:bg-sage hover:text-mango"
          >
            {wishlist.length > 0 ? "♥" : "♡"}

            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-mango px-1 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-lg transition hover:bg-sage hover:text-forest"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-mango px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-1 md:hidden">

          {/* Mobile Search */}
          <button
            type="button"
            onClick={() => setSearchOpen((current) => !current)}
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg transition hover:bg-sage hover:text-forest"
          >
            🔍
          </button>

          {/* Mobile Wishlist */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-xl transition hover:bg-sage hover:text-mango"
          >
            {wishlist.length > 0 ? "♥" : "♡"}

            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-mango px-1 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Mobile Cart */}
          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-lg transition hover:bg-sage hover:text-forest"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-mango px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-forest transition hover:bg-sage"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t border-line bg-white px-5 py-4">
          <form
            onSubmit={handleSearch}
            className="container-fc flex gap-3"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search healthy foods..."
              autoFocus
              className="w-full rounded-full border border-line bg-cream px-5 py-3 text-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-sage"
            />

            <button
              type="submit"
              className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest-dark"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-line bg-white md:hidden">
          <div className="container-fc py-5">

            <div className="flex flex-col">

              <Link
                href="/"
                onClick={closeMenu}
                className="border-b border-line py-4 text-sm font-semibold text-slate-700 hover:text-forest"
              >
                Home
              </Link>

              <Link
                href="/shop"
                onClick={closeMenu}
                className="border-b border-line py-4 text-sm font-semibold text-slate-700 hover:text-forest"
              >
                Shop
              </Link>

              <Link
                href="/#categories"
                onClick={closeMenu}
                className="border-b border-line py-4 text-sm font-semibold text-slate-700 hover:text-forest"
              >
                Categories
              </Link>

              <Link
                href="/#about"
                onClick={closeMenu}
                className="border-b border-line py-4 text-sm font-semibold text-slate-700 hover:text-forest"
              >
                About
              </Link>

              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="flex items-center justify-between border-b border-line py-4 text-sm font-semibold text-slate-700 hover:text-mango"
              >
                <span>Wishlist</span>

                {wishlist.length > 0 && (
                  <span className="rounded-full bg-mango px-2 py-1 text-xs text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() => {
                  setSearchOpen(true);
                  setMenuOpen(false);
                }}
                className="py-4 text-left text-sm font-semibold text-slate-700 hover:text-forest"
              >
                🔍 Search Products
              </button>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
}