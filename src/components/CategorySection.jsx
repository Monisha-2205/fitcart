import Link from "next/link";

const categories = [
  {
    name: "Oats & Cereals",
    description: "Start your day right",
    emoji: "🥣",
  },
  {
    name: "Nut Butters",
    description: "Creamy & protein-rich",
    emoji: "🥜",
  },
  {
    name: "Nuts & Seeds",
    description: "Natural everyday nutrition",
    emoji: "🌰",
  },
  {
    name: "Healthy Snacks",
    description: "Better choices for cravings",
    emoji: "🍫",
  },
];

export default function CategorySection() {
  return (
    <section
      id="categories"
      className="container-fc py-16 md:py-20"
    >
      {/* Section Header */}
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mango">
            Shop by category
          </p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-forest md:text-4xl">
            Find something good
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            From breakfast essentials to better-for-you snacks,
            discover foods made for everyday living.
          </p>
        </div>

        <Link
          href="/shop"
          className="hidden shrink-0 rounded-full border border-line bg-white px-5 py-3 text-sm font-bold text-forest transition hover:border-forest hover:bg-sage sm:block"
        >
          View All →
        </Link>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={`/shop?category=${encodeURIComponent(
              category.name
            )}`}
            className="group relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-forest hover:shadow-xl"
          >
            {/* Decorative Number */}
            <span className="absolute right-5 top-5 text-xs font-bold text-slate-200">
              0{index + 1}
            </span>

            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sage text-3xl transition duration-300 group-hover:scale-110 group-hover:rotate-2">
              {category.emoji}
            </div>

            {/* Text */}
            <h3 className="mt-6 text-lg font-extrabold text-forest">
              {category.name}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {category.description}
            </p>

            {/* CTA */}
            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-mango">
              Explore
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-mango transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="mt-7 text-center sm:hidden">
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