import { motion } from "motion/react";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { formatINR, type Product } from "@/lib/shop-data";
import { useShop } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView } = useShop();
  const wished = isWishlisted(product.id);

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="card-luxury-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft sm:rounded-3xl"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => openQuickView(product)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openQuickView(product);
          }
        }}
        className="relative block aspect-4/5 cursor-pointer overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={1000}
          className="img-luxury-zoom h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
        />
        {product.mrp ? (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 rounded-full bg-gold-deep px-2 py-0.5 sm:px-2.5 sm:py-1 font-sans text-[0.58rem] sm:text-[0.65rem] font-semibold tracking-wider text-primary-foreground shadow-xs">
            {Math.round((1 - product.price / product.mrp) * 100)}% OFF
          </span>
        ) : null}

        {/* Hover Quick View pill for desktop */}
        <div className="absolute inset-x-0 bottom-3 hidden justify-center px-4 transition-all duration-300 md:flex md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <span className="btn-luxury flex items-center gap-1.5 rounded-full border border-gold/40 bg-background/90 px-3.5 py-1.5 text-xs font-medium text-gold-deep shadow-soft backdrop-blur-md transition-colors hover:bg-gold-deep hover:text-white">
            <Eye size={13} /> Quick View
          </span>
        </div>
      </div>

      <button
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`icon-btn-subtle absolute top-2 right-2 sm:top-3 sm:right-3 grid h-7 w-7 sm:h-9 sm:w-9 place-items-center rounded-full bg-card/90 backdrop-blur transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 ${
          wished ? "text-destructive md:opacity-100" : "text-muted-foreground hover:text-destructive"
        }`}
      >
        <Heart size={14} className="sm:h-4 sm:w-4" fill={wished ? "currentColor" : "none"} />
      </button>

      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        <p className="truncate text-[0.58rem] sm:text-[0.68rem] tracking-[0.14em] sm:tracking-[0.18em] text-gold-deep uppercase">
          {product.category}
        </p>
        <h3 className="mt-1 sm:mt-1.5 font-sans font-medium text-xs sm:text-base leading-snug text-foreground line-clamp-2 min-h-[2rem] sm:min-h-0">
          <button
            type="button"
            onClick={() => openQuickView(product)}
            className="text-left font-sans font-medium hover:text-gold-deep transition-colors duration-200 line-clamp-2"
          >
            {product.name}
          </button>
        </h3>
        <div className="mt-1.5 sm:mt-2 flex items-center gap-1 sm:gap-1.5 text-[0.65rem] sm:text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5 sm:gap-1 rounded-full bg-secondary px-1.5 py-0.5 sm:px-2 text-foreground font-sans">
            <Star size={10} className="fill-gold text-gold sm:h-[11px] sm:w-[11px]" />
            {product.rating}
          </span>
          <span className="font-sans text-[0.62rem] sm:text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>
        <div className="mt-2 sm:mt-3 flex flex-wrap items-baseline gap-1 sm:gap-2">
          <span className="font-sans font-semibold text-sm sm:text-lg text-foreground tracking-tight">
            {formatINR(product.price)}
          </span>
          {product.mrp ? (
            <span className="font-sans text-[0.65rem] sm:text-xs text-muted-foreground line-through">
              {formatINR(product.mrp)}
            </span>
          ) : null}
        </div>

        <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            className="btn-luxury flex flex-1 items-center justify-center gap-1 sm:gap-2 rounded-full bg-primary px-2 sm:px-4 py-2 sm:py-2.5 font-sans text-[0.68rem] sm:text-xs font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:bg-brown shadow-xs"
          >
            <ShoppingBag size={12} className="shrink-0 sm:h-3.5 sm:w-3.5" />
            <span className="truncate">Add to Cart</span>
          </button>
          <button
            type="button"
            onClick={() => openQuickView(product)}
            aria-label={`Quick view ${product.name}`}
            title="Quick View"
            className="btn-luxury grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold-deep transition-all duration-200 hover:bg-gold-deep hover:text-white"
          >
            <Eye size={13} className="sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
