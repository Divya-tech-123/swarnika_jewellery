import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { Category } from "@/lib/shop-data";

export function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <Link
        to={category.to}
        className="group block overflow-hidden rounded-3xl border border-transparent bg-card shadow-soft transition-all duration-300 hover:border-gold/60 hover:shadow-lift"
      >
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            width={800}
            height={1000}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-display text-lg text-foreground transition-colors duration-300 group-hover:text-gold-deep">
            {category.name}
          </h3>
          <p className="mt-1 text-[0.7rem] tracking-wider text-muted-foreground">
            {category.count}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
