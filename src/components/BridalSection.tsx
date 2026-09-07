import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import bridal from "@/assets/bridal-editorial.jpg";

const pieces = [
  { name: "Bridal Necklace", note: "Choker & long haram pairings" },
  { name: "Jhumkas", note: "Pearl drops, light on the ear" },
  { name: "Bangles", note: "Broad kada & thin stacks" },
  { name: "Maang Tikka", note: "Matched to your necklace" },
  { name: "Bridal Sets", note: "Complete, ready to wear" },
];

export function BridalSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="texture-paper overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/30 shadow-lift">
          <motion.img
            src={bridal}
            alt="Bride in a red silk saree wearing layered gold bridal jewellery"
            loading="lazy"
            width={1200}
            height={1408}
            style={{ y }}
            className="h-[420px] w-full object-cover sm:h-[540px] lg:h-[640px]"
          />
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">Bridal Collection</p>
            <h2 className="mt-3 font-display font-medium text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl tracking-tight">
              Made for Your Big Day
            </h2>
            <div className="gold-rule mt-5 w-24" />
            <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
              Muhurtham to reception — our bridal studio helps you build a set that suits your
              saree, your budget and your family traditions. Book a private consultation in store or
              online.
            </p>
          </Reveal>

          <div className="mt-8 space-y-0">
            {pieces.map((piece, i) => (
              <Reveal key={piece.name} delay={i * 0.07}>
                <div className="group flex items-center justify-between border-b border-gold/25 py-4 transition-colors hover:border-gold/60">
                  <div>
                    <p className="font-display text-lg text-foreground transition-colors duration-300 group-hover:text-gold-deep">
                      {piece.name}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">{piece.note}</p>
                  </div>
                  <span className="font-display text-sm text-gold-deep transition-transform duration-300 group-hover:scale-110">0{i + 1}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <Link
              to="/bridal"
              className="btn-luxury mt-8 inline-block rounded-full bg-primary px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-primary-foreground hover:bg-brown shadow-soft"
            >
              View Bridal Collection
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
