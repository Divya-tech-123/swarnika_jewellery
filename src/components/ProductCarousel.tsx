import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/shop-data";

export function ProductCarousel({ items }: { items: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 640), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 sm:gap-6"
      >
        {items.map((product) => (
          <div
            key={product.id}
            className="w-[46%] shrink-0 snap-start sm:w-[46%] lg:w-[30%] xl:w-[23.5%]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          aria-label="Previous"
          onClick={() => scrollBy(-1)}
          className="icon-btn-subtle grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold-deep hover:bg-card hover:border-gold hover:shadow-xs"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          aria-label="Next"
          onClick={() => scrollBy(1)}
          className="icon-btn-subtle grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold-deep hover:bg-card hover:border-gold hover:shadow-xs"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
