import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
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
  Zap,
} from "lucide-react";
import { formatINR, products } from "@/lib/shop-data";
import { useShop } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product?.name || "Product"} — Swarnika Jewellers` },
      {
        name: "description",
        content: loaderData?.product?.description || "Hallmarked gold and diamond jewellery.",
      },
    ],
  }),
  component: ProductDetailPage,
});

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

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWishlisted } = useShop();

  const variants = getVariantsForCategory(product.category);
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const wished = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, qty, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-3xl border border-gold/30 bg-secondary/50 shadow-soft">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="eyebrow">{product.category}</span>
            <h1 className="mt-2 font-sans font-semibold text-2xl leading-snug text-foreground sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            <div className="mt-2.5 flex items-center gap-2 text-xs text-muted-foreground font-sans">
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-gold text-gold" />
                <span className="font-semibold text-foreground">{product.rating}</span>
              </div>
              <span>•</span>
              <span>{product.reviews} verified reviews</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-sans font-semibold text-2xl sm:text-3xl text-foreground tracking-tight">
                {formatINR(product.price)}
              </span>
              {product.mrp ? (
                <span className="font-sans text-sm text-muted-foreground line-through">
                  {formatINR(product.mrp)}
                </span>
              ) : null}
              <span className="font-sans text-xs font-semibold text-emerald-700">
                3% GST Included
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-gold/40 bg-secondary px-3 py-1 font-sans text-xs font-medium">
                {product.purity}
              </span>
              <span className="rounded-full border border-gold/40 bg-secondary px-3 py-1 font-sans text-xs font-medium">
                Weight: {product.weight}
              </span>
            </div>

            <p className="mt-5 font-sans text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Variant / Size Options */}
            {variants.length > 0 ? (
              <div className="mt-6">
                <label className="font-sans text-xs font-medium tracking-wide text-foreground">
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
                        className={`rounded-full border px-3.5 py-1.5 font-sans text-xs font-medium transition-all ${
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

            <div className="mt-6 flex items-center gap-3">
              <span className="font-sans text-xs font-medium text-foreground">Quantity:</span>
              <div className="flex items-center rounded-full border border-border bg-secondary/60">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  className="grid h-8 w-8 place-items-center rounded-full hover:bg-background text-foreground transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="min-w-8 text-center font-sans text-xs font-semibold text-foreground">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((prev) => prev + 1)}
                  className="grid h-8 w-8 place-items-center rounded-full hover:bg-background text-foreground transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gold/20 pt-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => toggleWishlist(product.id)}
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors ${
                  wished
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-gold/40 hover:bg-secondary text-muted-foreground"
                }`}
              >
                <Heart size={18} fill={wished ? "currentColor" : "none"} />
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-sans text-xs font-medium tracking-wide text-primary-foreground transition-all hover:bg-brown shadow-soft active:scale-98"
              >
                {added ? (
                  <>
                    <Check size={16} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> Add to Cart
                  </>
                )}
              </button>

              <Link
                to="/checkout"
                onClick={() => addToCart(product.id, qty, selectedVariant)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gold/60 bg-background px-6 py-3.5 font-sans text-xs font-medium tracking-wide text-gold-deep transition-all hover:bg-gold-deep hover:text-white active:scale-98"
              >
                <Zap size={16} /> Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-foreground">You May Also Like</h2>
          <div className="gold-rule mt-3 mb-8" />
          <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
