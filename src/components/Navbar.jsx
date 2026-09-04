"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { createClient } from "../lib/supabase/client";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[20px] w-[20px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function HeartIcon({ filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[21px] w-[21px]"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 8.9c0 5.4-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.9A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.7Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[21px] w-[21px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M3 4h2l2.2 11h10.9l2-8H6" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[19px] w-[19px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6" />
    </svg>
  );
}

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    let mounted = true;

    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (mounted) {
        setUser(user);
        setAuthLoading(false);
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

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
    <header className="fc-header sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="fc-topline">
        <div className="container-fc flex items-center justify-between gap-4">
          <span>Quality foods. Simply chosen.</span>

          <span className="hidden sm:inline">
            Free delivery on orders ₹999+
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="border-b border-black/8 bg-cream/95 backdrop-blur-xl">
        <div className="container-fc flex h-[76px] items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="fc-logo shrink-0"
            aria-label="FitCart home"
          >
            Fit<span>Cart</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 md:flex">
            <Link
              href="/"
              className="fc-navlink flex items-center gap-2"
            >
              <HomeIcon />
              <span>Home</span>
            </Link>

            <Link href="/shop" className="fc-navlink">
              Shop
            </Link>

            <Link href="/#categories" className="fc-navlink">
              Categories
            </Link>

            <Link href="/#about" className="fc-navlink">
              About
            </Link>
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center md:flex">

            {/* Search */}
            <button
              type="button"
              onClick={() => setSearchOpen((value) => !value)}
              aria-label="Search products"
              className="fc-iconbtn"
            >
              <SearchIcon />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="fc-iconbtn relative"
            >
              <HeartIcon filled={wishlist.length > 0} />

              {wishlist.length > 0 && (
                <span className="fc-count">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="fc-iconbtn relative"
            >
              <CartIcon />

              {cartCount > 0 && (
                <span className="fc-count">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Divider */}
            <span className="mx-3 h-6 w-px bg-black/10" />

            {/* Sign In / Account */}
            {!authLoading &&
              (user ? (
                <Link
                  href="/account"
                  className="flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-mango"
                >
                  <UserIcon />
                  <span>Account</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-mango"
                >
                  <UserIcon />
                  <span>Sign In</span>
                </Link>
              ))}
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 md:hidden">

            {/* Search */}
            <button
              type="button"
              onClick={() => setSearchOpen((value) => !value)}
              aria-label="Search products"
              className="fc-iconbtn"
            >
              <SearchIcon />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="fc-iconbtn relative"
            >
              <HeartIcon filled={wishlist.length > 0} />

              {wishlist.length > 0 && (
                <span className="fc-count">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="fc-iconbtn relative"
            >
              <CartIcon />

              {cartCount > 0 && (
                <span className="fc-count">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Menu */}
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle menu"
              className="fc-menu-btn"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Search */}
        {searchOpen && (
          <div className="border-t border-black/8 bg-cream">
            <form
              onSubmit={handleSearch}
              className="container-fc flex gap-3 py-4"
            >
              <div className="fc-searchfield">
                <SearchIcon />

                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search oats, nut butters, snacks..."
                />
              </div>

              <button
                type="submit"
                className="fc-btn fc-btn-dark px-6"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-black/8 bg-cream md:hidden">
            <div className="container-fc py-3">

              <Link
                href="/"
                onClick={closeMenu}
                className="fc-mobile-link"
              >
                Home
              </Link>

              <Link
                href="/shop"
                onClick={closeMenu}
                className="fc-mobile-link"
              >
                Shop
              </Link>

              <Link
                href="/#categories"
                onClick={closeMenu}
                className="fc-mobile-link"
              >
                Categories
              </Link>

              <Link
                href="/#about"
                onClick={closeMenu}
                className="fc-mobile-link"
              >
                About
              </Link>

              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="fc-mobile-link"
              >
                Wishlist{" "}
                {wishlist.length > 0 && (
                  <span>{wishlist.length}</span>
                )}
              </Link>

              {!authLoading &&
                (user ? (
                  <Link
                    href="/account"
                    onClick={closeMenu}
                    className="fc-mobile-link"
                  >
                    Account
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="fc-mobile-link"
                  >
                    Sign In
                  </Link>
                ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}