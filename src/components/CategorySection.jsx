"use client";

import Link from "next/link";

const categories = [
  {
    number: "01",
    title: "Oats & Cereals",
    description: "Breakfast essentials",
    href: "/shop?category=Oats%20%26%20Cereals",
    image:
      "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1000&q=90",
  },
  {
    number: "02",
    title: "Nut Butters",
    description: "Smooth & naturally satisfying",
    href: "/shop?category=Nut%20Butters",
    image:
      "https://www.refillroom.com/wp-content/uploads/2021/01/8229.jpg",
  },
 {
    number: "03",
    title: "Nuts & Seeds",
    description: "Everyday nutrition",
    href: "/shop?category=Nuts%20%26%20Seeds",
    image:
      "https://static.sayidaty.net/styles/1375_scale/public/2017/06/29/2724397-47185364.jpg",
  },
  {
    number: "04",
    title: "Healthy Snacks",
    description: "Better options between meals",
    href: "/shop?category=Healthy%20Snacks",
    image:
      "https://www.parade.com/.image/t_share/MjAzNjQ5MjAzNDc2Mzc1NDE0/bowl-of-granola-imago--pond5-images.jpg",
  },
];

export default function CategorySection() {
  return (
    <section
      id="categories"
      className="bg-[#F8F6F0] py-20 sm:py-24 lg:py-28"
    >
      <div className="container-fc">

        {/* Heading */}
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[760px]">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#F47B32]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F47B32]">
                Shop by category
              </span>
            </div>

            <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-[#174C3D] sm:text-5xl lg:text-6xl">
              Start with what
              <br />
              you need.
            </h2>
          </div>

          <Link
            href="/shop"
            className="group flex w-fit shrink-0 items-center gap-3 border-b border-[#174C3D] pb-2 text-sm font-bold text-[#174C3D]"
          >
            View all products
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative h-[360px] overflow-hidden bg-[#E6EEDF] sm:h-[380px]"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Green gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#123D31]/95 via-[#123D31]/20 to-transparent" />

              {/* Number + arrow */}
              <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/85">
                  {category.number}
                </span>

                <span className="flex h-9 w-9 items-center justify-center border border-white/50 bg-black/5 text-sm text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                <p className="mb-2 text-xs font-medium text-white/75">
                  {category.description}
                </p>

                <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-white">
                  {category.title}
                </h3>

                <div className="mt-5 flex items-center justify-between border-t border-white/30 pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
                  <span>Explore</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}