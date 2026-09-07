import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { Sparkles } from "./Sparkles";

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="relative overflow-hidden rounded-[2rem] border border-gold/40 bg-linear-to-br from-cream via-beige to-cream px-6 py-14 text-center shadow-soft sm:px-12">
        <Sparkles />
        <div
          aria-hidden
          className="absolute -top-16 -right-16 h-56 w-56 rounded-full border border-gold/30"
        />
        <Reveal>
          <p className="eyebrow">Festive Offer</p>
          <h2 className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Celebrate This Festive Season
          </h2>
          <p className="mt-4 font-display text-xl text-gold-deep sm:text-2xl">
            Flat 20% OFF on Selected Jewellery
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Zero making charges on selected gold designs. Offer valid till stocks last.
          </p>
          <Link
            to="/offers"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 text-sm tracking-wide text-primary-foreground shadow-soft transition-all duration-300 hover:bg-brown hover:shadow-lift"
          >
            Shop Offers
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
