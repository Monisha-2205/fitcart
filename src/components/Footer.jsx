import Link from "next/link";

const categories = [
  "Oats & Cereals",
  "Nut Butters",
  "Nuts & Seeds",
  "Healthy Snacks",
];

export default function Footer() {
  return (
    <footer className="bg-[#0D3027] text-white">
      <div className="container-fc">

        <div className="grid gap-14 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:py-20">

          <div>
            <Link
              href="/"
              className="font-display text-3xl font-bold tracking-[-0.06em]"
            >
              Fit<span className="text-[#F47B32]">Cart</span>
            </Link>

            <p className="mt-5 max-w-[300px] text-sm leading-6 text-white/55">
              Wholesome food, thoughtfully chosen for everyday life.
            </p>
          </div>

          <div>
            <span className="mb-5 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#F47B32]">
              Shop
            </span>

            <div className="flex flex-col gap-3 text-sm text-white/65">
              <Link href="/shop" className="hover:text-white">
                All products
              </Link>

              <Link href="/#shop" className="hover:text-white">
                Featured
              </Link>

              <Link href="/#categories" className="hover:text-white">
                Categories
              </Link>
            </div>
          </div>

          <div>
            <span className="mb-5 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#F47B32]">
              Categories
            </span>

            <div className="flex flex-col gap-3 text-sm text-white/65">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/shop?category=${encodeURIComponent(category)}`}
                  className="hover:text-white"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-5 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#F47B32]">
              Help
            </span>

            <div className="flex flex-col gap-3 text-sm text-white/65">
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>

              <Link href="/shipping" className="hover:text-white">
                Shipping
              </Link>

              <Link href="/returns" className="hover:text-white">
                Returns
              </Link>

              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-white/10 py-6 text-[10px] uppercase tracking-[0.14em] text-white/35 sm:flex-row">
          <span>© 2026 FitCart</span>
          <span>Eat better. Live better.</span>
        </div>

      </div>
    </footer>
  );
}