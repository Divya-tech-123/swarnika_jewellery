import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "@tanstack/react-router";
import {
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { formatINR } from "@/lib/shop-data";
import { useShop } from "@/lib/store";

function getVariantsForCategory(category: string): string[] {
  const cat = category.toLowerCase();
  if (cat.includes("ring")) {
    return ["Size 12 (16.5 mm)", "Size 14 (17.2 mm)", "Size 16 (17.9 mm)", "Size 18 (18.5 mm)"];
  }
  if (cat.includes("bangle")) {
    return ["Size 2.4 (Small)", "Size 2.6 (Medium)", "Size 2.8 (Large)"];
  }
  if (cat.includes("necklace") || cat.includes("bridal") || cat.includes("mangalsutra")) {
    return ['16" Choker Length', '18" Standard Length', '20" Long Haram Fit'];
  }
  if (cat.includes("earring")) {
    return ["Screw Back (Traditional)", "Push Back (South Fit)"];
  }
  return ["Standard Hallmarked Size"];
}

export function QuickViewModal() {
  const router = useRouter();
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isWishlisted } = useShop();

  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Synchronize variants when product changes
  useEffect(() => {
    if (quickViewProduct) {
      setQty(1);
      const variants = getVariantsForCategory(quickViewProduct.category);
      setSelectedVariant(variants[0] || "");
      setAddedAnimation(false);
    }
  }, [quickViewProduct]);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuickView();
    };
    if (quickViewProduct) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const wished = isWishlisted(quickViewProduct.id);
  const variants = getVariantsForCategory(quickViewProduct.category);
  const discountPercent = quickViewProduct.mrp
    ? Math.round((1 - quickViewProduct.price / quickViewProduct.mrp) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct.id, qty, selectedVariant);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct.id, qty, selectedVariant);
    closeQuickView();
    router.navigate({ to: "/checkout" });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop blur & overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-foreground/45 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={quickViewProduct.name}
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-gold/40 bg-card shadow-lift sm:rounded-4xl"
        >
          {/* Header Close button */}
          <button
            aria-label="Close modal"
            onClick={closeQuickView}
            className="icon-btn-subtle absolute top-4 right-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur-md transition-all duration-250 hover:bg-gold-deep hover:text-white"
          >
            <X size={20} />
          </button>

          {/* Modal Body: Two column layout on md+ */}
          <div className="no-scrollbar grid flex-1 overflow-y-auto md:grid-cols-2">
            {/* Left: Product Image & Badges */}
            <div className="relative flex flex-col justify-between bg-secondary/50 p-6 sm:p-8">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-gold/25 bg-background shadow-inner">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="img-luxury-zoom h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-104"
                />

                {discountPercent ? (
                  <span className="absolute top-3 left-3 rounded-full bg-gold-deep px-3 py-1 font-sans text-xs font-semibold tracking-wider text-primary-foreground shadow-soft">
                    {discountPercent}% OFF
                  </span>
                ) : null}

                <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                  <ShieldCheck size={14} className="text-gold-deep" />
                  <span>100% Certified</span>
                </div>
              </div>

              {/* Trust assurances under image */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[0.7rem] text-muted-foreground">
                <div className="flex flex-col items-center gap-1 rounded-xl bg-background/60 p-2">
                  <Truck size={14} className="text-gold-deep" />
                  <span>Free Insured Transit</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-xl bg-background/60 p-2">
                  <RotateCcw size={14} className="text-gold-deep" />
                  <span>15-Day Exchange</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-xl bg-background/60 p-2">
                  <Sparkles size={14} className="text-gold-deep" />
                  <span>Lifetime Polish</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Controls */}
            <div className="flex flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{quickViewProduct.category}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star size={13} className="fill-gold text-gold" />
                    <span className="font-semibold text-foreground">{quickViewProduct.rating}</span>
                    <span>({quickViewProduct.reviews} reviews)</span>
                  </div>
                </div>

                <h2 className="mt-2 font-sans font-semibold text-2xl leading-snug text-foreground sm:text-3xl">
                  {quickViewProduct.name}
                </h2>

                {/* Price block */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-sans font-semibold text-2xl text-foreground sm:text-3xl tracking-tight">
                    {formatINR(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.mrp ? (
                    <span className="font-sans text-sm text-muted-foreground line-through">
                      {formatINR(quickViewProduct.mrp)}
                    </span>
                  ) : null}
                  <span className="font-sans text-xs font-medium text-emerald-700">
                    GST Included
                  </span>
                </div>

                {/* Gold purity and weight badge pill */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-secondary/80 px-3 py-1 text-xs font-medium text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-deep" />
                    <span>Purity: {quickViewProduct.purity}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-secondary/80 px-3 py-1 text-xs font-medium text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-deep" />
                    <span>Gross Weight: {quickViewProduct.weight}</span>
                  </div>
                </div>

                {/* Stock availability */}
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-800">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                  <span>In Stock — Handcrafted piece ready for insured dispatch in 24 hrs</span>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {quickViewProduct.description}
                </p>

                {/* Variant / Size Options */}
                {variants.length > 0 ? (
                  <div className="mt-5">
                    <label className="text-xs font-medium tracking-wide text-foreground">
                      Select Size / Length:
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {variants.map((v) => {
                        const active = selectedVariant === v;
                        return (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setSelectedVariant(v)}
                            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                              active
                                ? "border-gold-deep bg-primary text-primary-foreground shadow-sm"
                                : "border-border/80 bg-background text-foreground hover:border-gold"
                            }`}
                          >
                            {v}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {/* Quantity selector */}
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-xs font-medium text-foreground">Quantity:</span>
                  <div className="flex items-center rounded-full border border-border bg-secondary/50">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                      className="grid h-8 w-8 place-items-center rounded-full transition-all duration-200 hover:bg-background hover:scale-110 active:scale-95 text-foreground"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-8 text-center text-xs font-semibold text-foreground">
                      {qty}
                    </span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => setQty((prev) => prev + 1)}
                      className="grid h-8 w-8 place-items-center rounded-full transition-all duration-200 hover:bg-background hover:scale-110 active:scale-95 text-foreground"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 border-t border-gold/20 pt-5">
                <div className="flex items-center gap-2">
                  <button
                    aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`icon-btn-subtle grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all ${
                      wished
                        ? "border-destructive/60 bg-destructive/10 text-destructive"
                        : "border-gold/40 bg-background text-muted-foreground hover:border-gold hover:text-foreground"
                    }`}
                  >
                    <Heart size={18} fill={wished ? "currentColor" : "none"} />
                  </button>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="btn-luxury flex flex-1 items-center justify-center gap-2 rounded-full border border-gold-deep bg-primary px-5 py-3 font-sans text-xs font-medium tracking-wide text-primary-foreground shadow-soft hover:bg-brown"
                  >
                    {addedAnimation ? (
                      <>
                        <Check size={16} className="text-emerald-300" /> Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} /> Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="btn-luxury flex flex-1 items-center justify-center gap-2 rounded-full border border-gold/60 bg-background px-5 py-3 font-sans text-xs font-medium tracking-wide text-gold-deep hover:bg-gold-deep hover:text-white"
                  >
                    <Zap size={16} /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
