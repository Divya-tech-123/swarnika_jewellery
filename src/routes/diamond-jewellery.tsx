import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { products } from "@/lib/shop-data";

export const Route = createFileRoute("/diamond-jewellery")({
  head: () => ({
    meta: [
      { title: "Certified Diamond Jewellery — Swarnika Jewellers" },
      {
        name: "description",
        content:
          "IGI certified diamond pendants, solitaire rings and everyday diamond jewellery set in 18K gold.",
      },
      { property: "og:title", content: "Certified Diamond Jewellery — Swarnika Jewellers" },
      {
        property: "og:description",
        content: "IGI certified diamonds in 18K gold, made for daily wear and special occasions.",
      },
    ],
  }),
  component: () => (
    <CollectionPage
      eyebrow="Diamond Jewellery"
      title="Certified Diamonds, Everyday Light"
      description="Solitaires, halo pendants and pavé bands in 18K gold. Every diamond arrives with its IGI certificate and clarity details."
      items={products.filter((p) => p.tags.includes("diamond"))}
    />
  ),
});
