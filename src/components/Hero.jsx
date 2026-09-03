import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute -right-24 top-10 hidden h-72 w-72 rounded-full bg-sage/50 lg:block" />
      <div className="pointer-events-none absolute -left-32 bottom-0 hidden h-72 w-72 rounded-full bg-orange-100/60 lg:block" />

      <div className="container-fc relative py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">

          {/* Left Content */}
          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-sage-deep/20 bg-sage px-4 py-2 text-sm font-semibold text-forest">
              <span className="text-mango">✦</span>
              Better choices. Better you.
            </div>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-forest sm:text-6xl lg:text-7xl">
              Eat better.
              <br />
              <span className="text-mango">Live better.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Discover wholesome foods and everyday essentials
              carefully chosen to make healthier choices simple,
              delicious and convenient.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full bg-forest px-7 py-4 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-forest-dark"
              >
                Shop Now
                <span className="ml-2">→</span>
              </Link>

              <Link
                href="/#categories"
                className="inline-flex items-center justify-center rounded-full border border-line bg-white px-7 py-4 font-bold text-forest transition hover:-translate-y-0.5 hover:border-forest"
              >
                Explore Categories
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-5">
              <div>
                <p className="text-2xl font-extrabold text-forest">
                  10k+
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  Happy customers
                </p>
              </div>

              <div className="hidden h-10 w-px bg-line sm:block" />

              <div>
                <p className="text-2xl font-extrabold text-forest">
                  4.9/5
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  Customer rating
                </p>
              </div>

              <div className="hidden h-10 w-px bg-line sm:block" />

              <div>
                <p className="text-2xl font-extrabold text-forest">
                  100%
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  Quality focused
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">

            {/* Background shape */}
            <div className="absolute -right-5 -top-5 h-24 w-24 rounded-3xl bg-sage sm:h-32 sm:w-32" />
            <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-3xl bg-orange-100 sm:h-32 sm:w-32" />

            <div className="relative overflow-hidden rounded-[32px] border border-white bg-white p-2 shadow-xl">
              <div className="relative overflow-hidden rounded-[26px]">

               <img
  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85"
  alt="Fresh vegetables and wholesome food"
  className="h-[360px] w-full object-cover sm:h-[460px] lg:h-[520px]"
/>

                {/* Image Overlay Card */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-lg backdrop-blur sm:bottom-6 sm:left-6 sm:right-auto sm:min-w-[250px]">

                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage text-xl">
                      🥬
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Fresh & wholesome
                      </p>

                      <p className="mt-1 font-bold text-forest">
                        Good food, made easy.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}