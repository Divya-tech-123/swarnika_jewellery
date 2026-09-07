import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { products } from "@/lib/shop-data";

export const Route = createFileRoute("/gold-jewellery")({
  head: () => ({
    meta: [
      { title: "22K Gold Jewellery — Swarnika Jewellers" },
      {
        name: "description",
        content:
          "Shop BIS hallmarked 22K gold harams, chokers, bangles and mangalsutra crafted by South Indian artisans.",
      },
      { property: "og:title", content: "22K Gold Jewellery — Swarnika Jewellers" },
      {
        property: "og:description",
        content: "Hallmarked 22K gold designs with transparent making charges.",
      },
    ],
  }),
  component: () => (
    <CollectionPage
      eyebrow="Gold Jewellery"
      title="22K Hallmarked Gold"
      description="Temple harams, festive chokers, broad bangles and mangalsutra — each piece hallmarked and priced with making charges shown upfront."
      items={products.filter((p) => p.tags.includes("gold"))}
    />
  ),
});
