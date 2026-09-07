import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { PromoBanner } from "@/components/PromoBanner";
import { offerProducts } from "@/lib/shop-data";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Festive Jewellery Offers — Flat 20% OFF — Swarnika Jewellers" },
      {
        name: "description",
        content:
          "Save up to 20% on selected gold and diamond jewellery this festive season, with zero making charges on chosen designs.",
      },
      { property: "og:title", content: "Festive Jewellery Offers — Swarnika Jewellers" },
      {
        property: "og:description",
        content: "Flat 20% off selected jewellery plus zero making charges on chosen gold designs.",
      },
    ],
  }),
  component: () => (
    <>
      <PromoBanner />
      <CollectionPage
        eyebrow="Offers"
        title="Festive Season Savings"
        description="Selected designs at a reduced price for a limited period. Discount is already applied to the prices shown."
        items={offerProducts}
      />
    </>
  ),
});
