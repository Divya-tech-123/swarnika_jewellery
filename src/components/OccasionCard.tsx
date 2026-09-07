import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function OccasionCard({
  name,
  note,
  image,
  index = 0,
}: {
  name: string;
  note: string;
  image: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link
        to="/collections"
        className="card-luxury-lift group relative flex h-full min-h-56 flex-col justify-end overflow-hidden rounded-3xl border border-border/40 shadow-soft hover:border-gold/60"
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={800}
          height={1000}
          className="img-luxury-zoom absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brown/85 via-brown/25 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
        <div className="relative p-5">
          <span className="block h-px w-8 bg-gold transition-all duration-400 ease-out group-hover:w-14" />
          <h3 className="mt-3 font-display text-xl text-secondary transition-colors duration-300 group-hover:text-white">{name}</h3>
          <p className="text-xs text-beige">{note}</p>
        </div>
      </Link>
    </motion.div>
  );
}
