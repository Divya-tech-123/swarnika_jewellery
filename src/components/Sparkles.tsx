import { motion } from "motion/react";

const dots = [
  { x: "12%", y: "22%", d: 0, s: 6 },
  { x: "26%", y: "68%", d: 1.2, s: 4 },
  { x: "48%", y: "14%", d: 2.1, s: 5 },
  { x: "68%", y: "58%", d: 0.6, s: 4 },
  { x: "84%", y: "30%", d: 1.8, s: 7 },
  { x: "92%", y: "76%", d: 2.6, s: 4 },
];

export function Sparkles({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {dots.map((dot, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold"
          style={{ left: dot.x, top: dot.y, width: dot.s, height: dot.s }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1.15, 0.6], y: [0, -14, 0] }}
          transition={{
            duration: 5.5,
            delay: dot.d,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
