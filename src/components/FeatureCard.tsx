import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  index = 0,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.09 }}
      className="card-luxury-lift group rounded-3xl border border-border/70 bg-card p-6 text-center shadow-soft hover:border-gold/50"
    >
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold-deep transition-all duration-300 group-hover:scale-108 group-hover:border-gold group-hover:bg-secondary/60">
        <Icon size={22} strokeWidth={1.5} />
      </span>
      <h3 className="mt-4 font-display text-lg text-foreground transition-colors duration-300 group-hover:text-gold-deep">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </motion.div>
  );
}
