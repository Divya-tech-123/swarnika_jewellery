import { Instagram } from "lucide-react";
import { images } from "@/lib/shop-data";
import { motion } from "motion/react";

const tiles = [
  images.bridal,
  images.earrings,
  images.gold,
  images.rings,
  images.bangles,
  images.necklaces,
];

export function InstagramGallery() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {tiles.map((src, i) => (
        <motion.a
          key={i}
          href="#"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
          className="group relative aspect-square overflow-hidden rounded-2xl shadow-soft"
        >
          <img
            src={src}
            alt="Jewellery from our Instagram feed"
            loading="lazy"
            width={800}
            height={1000}
            className="img-luxury-zoom h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute inset-0 grid place-items-center bg-brown/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[1px]">
            <Instagram className="text-secondary transition-transform duration-300 group-hover:scale-110" size={22} />
          </span>
        </motion.a>
      ))}
    </div>
  );
}
