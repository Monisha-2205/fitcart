import Link from "next/link";

export default function Hero() {
  return (
    <section className="fc-hero">
      <div className="container-fc fc-hero-grid">
        <div className="fc-hero-copy">
          <div className="fc-kicker">
            QUALITY FOOD · SIMPLY CHOSEN
          </div>

          <h1>
            Eat better.
            <br />
            <em>Live better.</em>
          </h1>

          <p>
            A considered range of everyday foods, protein picks and better
            snacks — selected to make shopping for good food straightforward.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="fc-btn fc-btn-dark"
            >
              Shop now
              <span>↗</span>
            </Link>

            <Link
              href="/#categories"
              className="fc-btn fc-btn-light"
            >
              Browse categories
            </Link>
          </div>

          <div className="fc-proof-row">
            <div>
              <strong>10k+</strong>
              <span>customers</span>
            </div>

            <div>
              <strong>4.9/5</strong>
              <span>customer rating</span>
            </div>

            <div>
              <strong>₹999+</strong>
              <span>free delivery</span>
            </div>
          </div>
        </div>

        <div className="fc-hero-visual">
          <div className="fc-hero-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1500&q=90"
              alt="Fresh vegetables and wholesome food"
            />
          </div>

          <div className="fc-hero-note">
            <span className="fc-note-mark">✦</span>

            <div>
              <small>THE FITCART RANGE</small>

              <strong>
                Everyday essentials,
                <br />
                selected with care.
              </strong>
            </div>
          </div>

          <div className="fc-hero-stamp">
            EAT WELL
            <br />
            <span>LIVE WELL</span>
          </div>
        </div>
      </div>

      <div className="fc-hero-marquee" aria-hidden="true">
        <span>QUALITY FOODS</span>
        <b>•</b>
        <span>EVERYDAY ESSENTIALS</span>
        <b>•</b>
        <span>PROTEIN PICKS</span>
        <b>•</b>
        <span>BETTER SNACKS</span>
      </div>
    </section>
  );
}