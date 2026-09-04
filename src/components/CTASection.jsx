import Link from "next/link";

export default function CTASection() {
  return (
    <section id="about" className="container-fc py-20 sm:py-24">
      <div className="relative overflow-hidden rounded-[32px] bg-[#174C3D] px-8 py-12 sm:px-14 sm:py-16 lg:px-16">
        
        {/* Decorative shapes */}
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#F47B32]/15" />

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

          {/* Copy */}
          <div className="max-w-[720px]">
            <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.24em] text-[#F47B32]">
              Eat well. Live well.
            </span>

            <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Healthy choices,
              <br />
              <span className="text-white">delivered to you.</span>
            </h2>

            <p className="mt-6 max-w-[650px] text-sm leading-7 text-white/70 sm:text-base">
              Discover quality foods and everyday essentials made for a
              healthier lifestyle.
            </p>
          </div>

          {/* Button */}
          <div className="relative shrink-0">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 rounded-full bg-[#F47B32] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-[#ff8a45] hover:gap-4"
            >
              Shop Now
              <span>→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}