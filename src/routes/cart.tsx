import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";
import { formatINR } from "@/lib/shop-data";
import { useShop } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Shopping Bag — Swarnika Jewellers" },
      {
        name: "description",
        content:
          "Review your selected gold, diamond and bridal jewellery with insured delivery across India.",
      },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const router = useRouter();
  const {
    cartProducts,
    setQty,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartMrpSavings,
    cartShipping,
    cartTax,
    cartTotal,
    toggleWishlist,
    isWishlisted,
    openQuickView,
  } = useShop();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(
    null,
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "SWARNIKA10" || code === "FESTIVE2026" || code === "GOLD5") {
      const discountAmount = Math.round(cartSubtotal * 0.05); // 5% promotional discount
      setAppliedCoupon({ code, discount: discountAmount });
      toast.success(`Coupon "${code}" applied! You saved ${formatINR(discountAmount)}`);
      setCouponCode("");
    } else {
      toast.error("Invalid coupon code. Try SWARNIKA10 or FESTIVE2026");
    }
  };

  const finalDiscount = cartMrpSavings + (appliedCoupon ? appliedCoupon.discount : 0);
  const finalTotal = Math.max(0, cartTotal - (appliedCoupon ? appliedCoupon.discount : 0));

  if (cartProducts.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-gold/30 bg-secondary/70 shadow-soft">
          <ShoppingBag size={40} className="text-gold-deep" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Your Jewellery Bag is Empty
        </h1>
        <div className="gold-rule mx-auto mt-4 w-24" />
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Explore our hand-finished South Indian temple harams, solitaire diamond rings, and bridal
          collections crafted for your precious moments.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs font-medium tracking-wide text-primary-foreground shadow-soft transition-all hover:bg-brown"
          >
            Explore Collections <ArrowRight size={15} />
          </Link>
          <Link
            to="/bridal"
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-background px-8 py-3.5 text-xs font-medium tracking-wide text-gold-deep transition-all hover:bg-secondary"
          >
            Bridal Sets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb / Back */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/collections"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-gold-deep"
        >
          <ChevronLeft size={16} /> Continue Shopping
        </Link>
        <span className="text-xs text-muted-foreground">
          {cartProducts.length} {cartProducts.length === 1 ? "design" : "designs"} in bag
        </span>
      </div>

      <div className="mb-8">
        <p className="eyebrow">Shopping Cart</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Review Your Selected Jewellery
        </h1>
        <div className="gold-rule mt-4" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        {/* Left Column: Product Items */}
        <div className="space-y-4">
          {cartProducts.map(({ product, qty, variant }) => {
            const wished = isWishlisted(product.id);
            const lineTotal = product.price * qty;

            return (
              <div
                key={`${product.id}-${variant || "std"}`}
                className="flex flex-col gap-4 rounded-3xl border border-border/80 bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:gap-6 sm:p-5"
              >
                {/* Product Thumbnail */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openQuickView(product)}
                  className="relative aspect-square h-28 w-28 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-gold/25 bg-secondary sm:h-32 sm:w-32"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-luxury-zoom h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-104"
                  />
                  {product.mrp ? (
                    <span className="absolute top-2 left-2 rounded-full bg-gold-deep px-2 py-0.5 text-[0.6rem] font-bold text-primary-foreground">
                      {Math.round((1 - product.price / product.mrp) * 100)}% OFF
                    </span>
                  ) : null}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[0.65rem] tracking-wider text-gold-deep uppercase">
                          {product.category}
                        </span>
                        <h2 className="font-sans font-medium text-base text-foreground">
                          <button
                            type="button"
                            onClick={() => openQuickView(product)}
                            className="text-left font-sans font-medium hover:text-gold-deep transition-colors"
                          >
                            {product.name}
                          </button>
                        </h2>
                      </div>
                      <button
                        aria-label="Remove item"
                        onClick={() => {
                          removeFromCart(product.id, variant);
                          toast.info(`Removed "${product.name}" from cart`);
                        }}
                        className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-1.5 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-muted-foreground font-sans">
                        {product.purity}
                      </span>
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-muted-foreground font-sans">
                        Weight: {product.weight}
                      </span>
                      {variant ? (
                        <span className="rounded-full border border-gold/40 bg-gold/5 px-2.5 py-0.5 font-sans font-medium text-gold-deep">
                          {variant}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Quantity & Pricing Row */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-border bg-secondary/60">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => setQty(product.id, qty - 1, variant)}
                          className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-background text-foreground"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="min-w-8 text-center font-sans text-xs font-semibold text-foreground">
                          {qty}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => setQty(product.id, qty + 1, variant)}
                          className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-background text-foreground"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        className={`flex items-center gap-1 font-sans text-xs ${
                          wished
                            ? "text-destructive"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Heart size={14} fill={wished ? "currentColor" : "none"} />
                        <span className="hidden sm:inline">
                          {wished ? "Wishlisted" : "Save for Later"}
                        </span>
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-sans font-semibold text-lg text-foreground tracking-tight">
                        {formatINR(lineTotal)}
                      </div>
                      {product.mrp ? (
                        <div className="font-sans text-xs text-muted-foreground line-through">
                          {formatINR(product.mrp * qty)}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => {
                clearCart();
                toast.info("Your shopping bag has been cleared.");
              }}
              className="text-xs text-muted-foreground underline hover:text-destructive"
            >
              Clear Entire Bag
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-gold/35 bg-card p-6 shadow-lift">
            <h2 className="font-display text-2xl font-semibold text-foreground">Order Summary</h2>
            <div className="gold-rule mt-4" />

            <div className="mt-5 space-y-3.5 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Bag Subtotal ({cartProducts.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span className="font-medium text-foreground">{formatINR(cartSubtotal)}</span>
              </div>

              {finalDiscount > 0 ? (
                <div className="flex items-center justify-between text-emerald-700">
                  <span>Savings & Discounts</span>
                  <span className="font-medium">- {formatINR(finalDiscount)}</span>
                </div>
              ) : null}

              <div className="flex items-center justify-between text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Truck size={15} className="text-gold-deep" /> Insured Delivery (All India)
                </span>
                <span className="font-semibold text-emerald-700">FREE</span>
              </div>

              <div className="flex items-center justify-between text-muted-foreground">
                <span title="3% Indian Goods & Services Tax on jewellery">
                  GST (3% Hallmarked Tax)
                </span>
                <span className="font-medium text-foreground">{formatINR(cartTax)}</span>
              </div>

              <div className="gold-rule my-4" />

              <div className="flex items-baseline justify-between">
                <span className="font-display text-lg font-semibold text-foreground">
                  Total Payable
                </span>
                <div className="text-right">
                  <span className="font-sans font-semibold text-2xl sm:text-3xl text-foreground tracking-tight">
                    {formatINR(finalTotal)}
                  </span>
                  <p className="font-sans text-[0.65rem] text-muted-foreground">
                    Inclusive of all applicable taxes
                  </p>
                </div>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="mt-6 rounded-2xl border border-dashed border-gold/40 bg-secondary/50 p-3.5">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag
                    size={15}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gold-deep"
                  />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. SWARNIKA10)"
                    className="w-full rounded-full border border-border bg-background py-2 pr-3 pl-9 font-sans text-xs outline-none focus:border-gold"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-secondary border border-gold/40 px-4 py-2 font-sans text-xs font-medium text-gold-deep hover:bg-gold-deep hover:text-white transition-colors"
                >
                  Apply
                </button>
              </form>
              {appliedCoupon ? (
                <div className="mt-2 flex items-center justify-between font-sans text-xs text-emerald-700">
                  <span>✓ Coupon {appliedCoupon.code} applied</span>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="underline text-muted-foreground hover:text-destructive"
                  >
                    Remove
                  </button>
                </div>
              ) : null}
            </div>

            {/* Checkout CTA */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => router.navigate({ to: "/checkout" })}
                className="btn-luxury flex w-full items-center justify-center gap-2 rounded-full border border-gold-deep bg-primary py-4 font-sans text-xs font-medium tracking-wide text-primary-foreground uppercase shadow-soft hover:bg-brown"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              <Link
                to="/collections"
                className="btn-luxury flex w-full items-center justify-center gap-1.5 rounded-full border border-gold/40 bg-background py-3 font-sans text-xs font-medium text-gold-deep hover:bg-secondary"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 text-xs text-muted-foreground shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-gold-deep shrink-0" />
                <span>100% BIS Hallmarked 22K Gold & Certified Diamonds</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck size={18} className="text-gold-deep shrink-0" />
                <span>Tamper-evident insured door delivery with video packing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw size={18} className="text-gold-deep shrink-0" />
                <span>15-Day Exchange & Lifetime Buyback policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
