import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Sparkles } from "./Sparkles";
import hero from "@/assets/hero-bride.jpg";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream">
      <Sparkles />
      <div
        aria-hidden
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full border border-gold/25"
      />
      <div
        aria-hidden
        className="absolute top-28 -left-10 h-40 w-40 rounded-full border border-gold/20"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-12 pb-14 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:pt-20 lg:pb-24">
        <div className="relative z-10 order-2 lg:order-1">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            BIS Hallmarked · Since 1978
          </motion.p>
          <motion.h1
            className="mt-4 font-display font-medium text-4xl leading-[1.1] text-foreground sm:text-5xl lg:text-6xl tracking-tight"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Timeless Jewellery,
            <br />
            <span className="text-gold-deep italic font-normal">Made for Your Moments</span>
          </motion.h1>
          <motion.p
            className="mt-5 max-w-md font-sans text-base leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            Discover elegant jewellery crafted to celebrate every beautiful occasion.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/collections"
              className="btn-luxury rounded-full bg-primary px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-primary-foreground shadow-soft hover:bg-brown hover:shadow-lift"
            >
              Shop Collection
            </Link>
            <Link
              to="/bridal"
              className="btn-luxury rounded-full border border-gold/60 px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-gold-deep hover:bg-card hover:border-gold"
            >
              Explore Bridal
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {["45,000+ happy families", "Free insured delivery", "15-day easy returns"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative order-1 lg:order-2"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/30 shadow-lift">
            <motion.img
              src={hero}
              alt="Indian bride wearing a hallmarked gold bridal necklace, jhumkas and maang tikka"
              width={1408}
              height={1600}
              style={{ y, scale }}
              className="h-[420px] w-full object-cover object-top sm:h-[520px] lg:h-[620px]"
            />
          </div>
          <div className="absolute -bottom-5 left-4 rounded-2xl border border-gold/30 bg-card px-5 py-4 shadow-soft sm:left-8 transition-transform duration-300 hover:scale-105">
            <p className="font-display text-2xl text-gold-deep">22K</p>
            <p className="text-[0.7rem] tracking-wider text-muted-foreground">
              PURE HALLMARKED GOLD
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
