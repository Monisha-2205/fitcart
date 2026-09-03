import Link from "next/link";

export default function CTASection() {
  return (
    <section className="container-fc py-16 md:py-20">
      <div className="relative overflow-hidden rounded-[32px] bg-forest px-6 py-12 sm:px-10 md:px-14 md:py-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sage/20" />

        <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-mango/20" />

        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mango">
              Eat well. Live well.
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Healthy choices,
              <br />
              delivered to you.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-sage sm:text-base">
              Discover quality foods and everyday essentials made
              for a healthier lifestyle.
            </p>
          </div>

          <Link
            href="/shop"
            className="shrink-0 rounded-full bg-mango px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-mango-dark"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    </section>
  );
}