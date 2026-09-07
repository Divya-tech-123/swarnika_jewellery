import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Gem, RotateCcw, ShieldCheck } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { ProductCarousel } from "@/components/ProductCarousel";
import { BridalSection } from "@/components/BridalSection";
import { OccasionCard } from "@/components/OccasionCard";
import { FeatureCard } from "@/components/FeatureCard";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { InstagramGallery } from "@/components/InstagramGallery";
import { PromoBanner } from "@/components/PromoBanner";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { bestSellers, categories, newArrivals, occasions } from "@/lib/shop-data";
import craft from "@/assets/craft-story.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swarnika Jewellers — Timeless Gold & Diamond Jewellery" },
      {
        name: "description",
        content:
          "Explore hallmarked gold, certified diamond and Indian bridal jewellery. Clear pricing, 15-day returns and insured delivery across India.",
      },
      { property: "og:title", content: "Swarnika Jewellers — Timeless Gold & Diamond Jewellery" },
      {
        property: "og:description",
        content:
          "Hallmarked gold, certified diamonds and complete bridal sets crafted by South Indian artisans.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    icon: BadgeCheck,
    title: "BIS Hallmarked Gold",
    description: "Every gram is hallmark certified with purity printed on your invoice.",
  },
  {
    icon: Gem,
    title: "Certified Diamonds",
    description: "IGI and GIA certificates supplied with every diamond purchase.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "15-day returns and lifetime exchange on hallmarked gold jewellery.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "UPI, cards and EMI with fully insured, signature-required delivery.",
  },
];

function Home() {
  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Shop by Category"
          title="Featured Collections"
          subtitle="From everyday diamond studs to full bridal sets — find the piece that suits your occasion."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {categories.map((category, i) => (
            <CategoryCard key={category.name} category={category} index={i} />
          ))}
        </div>
      </section>

      <section className="texture-paper py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Best Sellers"
            title="Most Loved Jewellery"
            subtitle="Chosen again and again by our customers across Telangana, Andhra and beyond."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) * 0.08}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-10 text-center">
            <Link
              to="/collections"
              className="inline-block rounded-full border border-gold/60 px-7 py-3.5 text-sm text-gold-deep transition-colors hover:bg-card"
            >
              View All Jewellery
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Just In"
          title="New Arrivals"
          subtitle="Fresh designs added to our studio this month. Swipe to explore."
        />
        <div className="mt-10">
          <ProductCarousel items={newArrivals} />
        </div>
      </section>

      <BridalSection />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading eyebrow="Shop by Occasion" title="Jewellery for Every Celebration" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
          {occasions.map((o, i) => (
            <OccasionCard key={o.name} {...o} index={i} />
          ))}
        </div>
      </section>

      <section className="texture-paper py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Why Choose Us" title="Buy Jewellery With Confidence" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-gold/30 shadow-soft">
              <img
                src={craft}
                alt="Artisan hand-finishing gold jewellery at a workbench"
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.1}>
              <p className="eyebrow">Our Story</p>
              <h2 className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">
                Crafted With Tradition, Designed for Today
              </h2>
              <div className="gold-rule mt-5 w-24" />
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Swarnika began in 1978 as a small family workshop in Hyderabad. Three generations
                later, the same karigars still shape every haram and jhumka by hand — only now each
                design is drawn with modern comfort, weight and wearability in mind.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                We keep our making charges transparent, our purity hallmarked and our pricing on the
                page, so you never have to guess what you are paying for.
              </p>
              <Link
                to="/collections"
                className="mt-8 inline-block rounded-full border border-gold/60 px-7 py-3.5 text-sm text-gold-deep transition-colors hover:bg-secondary"
              >
                Discover Our Story
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="texture-paper py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Testimonials" title="What Our Customers Say" />
          <TestimonialCarousel />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="@swarnika.jewellers"
          title="Follow Our Jewellery Diary"
          subtitle="Real customers, real celebrations. Tag us to be featured."
        />
        <InstagramGallery />
      </section>

      <PromoBanner />
    </>
  );
}
