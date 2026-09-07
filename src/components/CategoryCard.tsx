import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { Category } from "@/lib/shop-data";

export function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
    >
      <Link
        to={category.to}
        className="card-luxury-lift group block overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft hover:border-gold/60"
      >
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            width={800}
            height={1000}
            className="img-luxury-zoom h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
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
