import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart } from "lucide-react";
import { products } from "@/lib/shop-data";
import { useShop } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Swarnika Jewellers" },
      {
        name: "description",
        content: "View your saved hallmarked gold and diamond jewellery designs.",
      },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <p className="eyebrow">Saved Designs</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Your Jewellery Wishlist
        </h1>
        <div className="gold-rule mt-4" />
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="mx-auto max-w-md py-16 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-secondary/80 text-muted-foreground">
            <Heart size={32} />
          </div>
          <h2 className="mt-5 font-display text-2xl font-semibold text-foreground">
            Your Wishlist is Empty
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Click the heart icon on any jewellery piece to save it here for later viewing or bridal
            consultation.
          </p>
          <Link
            to="/collections"
            className="btn-luxury mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-medium text-primary-foreground shadow-soft hover:bg-brown"
          >
            Explore Jewellery <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
