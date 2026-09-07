import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { products } from "@/lib/shop-data";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "All Jewellery Collections — Swarnika Jewellers" },
      {
        name: "description",
        content:
          "Browse every Swarnika design: gold harams, diamond pendants, jhumkas, bangles, rings and mangalsutra with clear pricing.",
      },
      { property: "og:title", content: "All Jewellery Collections — Swarnika Jewellers" },
      {
        property: "og:description",
        content: "Gold, diamond and bridal jewellery designs with hallmark certified purity.",
      },
    ],
  }),
  component: () => (
    <CollectionPage
      eyebrow="Collections"
      title="Our Complete Jewellery Collection"
      description="Every design in one place — hallmarked gold, certified diamonds and complete bridal sets, with weight and purity listed on each piece."
      items={products}
    />
  ),
});
