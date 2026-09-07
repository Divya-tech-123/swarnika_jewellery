import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { BridalSection } from "@/components/BridalSection";
import { products } from "@/lib/shop-data";

export const Route = createFileRoute("/bridal")({
  head: () => ({
    meta: [
      { title: "Indian Bridal Jewellery Sets — Swarnika Jewellers" },
      {
        name: "description",
        content:
          "Complete Indian bridal jewellery: chokers, long harams, jhumkas, bangles and maang tikka, with private bridal consultations.",
      },
      { property: "og:title", content: "Indian Bridal Jewellery Sets — Swarnika Jewellers" },
      {
        property: "og:description",
        content: "Bridal sets built around your saree, your budget and your traditions.",
      },
    ],
  }),
  component: () => (
    <>
      <CollectionPage
        eyebrow="Bridal Collection"
        title="Made for Your Big Day"
        description="Muhurtham to reception — complete bridal sets and individual pieces you can mix, with sizing help from our bridal studio."
        items={products.filter((p) => p.tags.includes("bridal") || p.tags.includes("gold"))}
      />
      <BridalSection />
    </>
  ),
});
