import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { newArrivals } from "@/lib/shop-data";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Jewellery Arrivals — Swarnika Jewellers" },
      {
        name: "description",
        content:
          "The newest gold and diamond jewellery designs from our Hyderabad studio, added this month.",
      },
      { property: "og:title", content: "New Jewellery Arrivals — Swarnika Jewellers" },
      {
        property: "og:description",
        content: "Fresh gold and diamond designs, added to the studio this month.",
      },
    ],
  }),
  component: () => (
    <CollectionPage
      eyebrow="Just In"
      title="New Arrivals"
      description="Designs that just left our workshop — lighter weights, softer finishes and pieces made for everyday celebration."
      items={newArrivals}
    />
  ),
});
