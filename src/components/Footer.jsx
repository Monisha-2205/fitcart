import Link from "next/link";

const categories = [
  "Oats & Cereals",
  "Nut Butters",
  "Nuts & Seeds",
  "Healthy Snacks",
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-fc py-12">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-forest"
            >
              Fit<span className="text-mango">Cart</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
              Wholesome foods and everyday essentials for a healthier
              lifestyle.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-forest">
              Shop
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <Link
                href="/shop"
                className="block hover:text-forest"
              >
                All Products
              </Link>

              <Link
                href="/shop"
                className="block hover:text-forest"
              >
                Categories
              </Link>

              <Link
                href="/shop"
                className="block hover:text-forest"
              >
                Featured Products
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-forest">
              Categories
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/shop?category=${encodeURIComponent(category)}`}
                  className="block hover:text-forest"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-forest">
              Help
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <Link
                href="/contact"
                className="block hover:text-forest"
              >
                Contact Us
              </Link>

              <Link
                href="/shipping"
                className="block hover:text-forest"
              >
                Shipping
              </Link>

              <Link
                href="/returns"
                className="block hover:text-forest"
              >
                Returns
              </Link>

              <Link
                href="/privacy"
                className="block hover:text-forest"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-line pt-6 text-sm text-slate-500">
          © 2026 FitCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}