import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/lib/shop-data";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index]!;

  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-card p-7 shadow-soft sm:p-10">
        <Quote className="text-gold/40" size={34} />
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mt-4 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  className={i < item.rating ? "fill-gold text-gold" : "text-border"}
                />
              ))}
            </div>
            <p className="mt-4 font-display text-xl leading-relaxed text-foreground sm:text-2xl">
              “{item.review}”
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary font-display text-lg text-gold-deep">
                {item.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {item.name} · {item.city}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  Purchased: {item.purchased}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          aria-label="Previous review"
          onClick={() => go(-1)}
          className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold-deep transition-colors hover:bg-card"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Review ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-gold-deep" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
        <button
          aria-label="Next review"
          onClick={() => go(1)}
          className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold-deep transition-colors hover:bg-card"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
