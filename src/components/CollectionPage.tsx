import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";
import type { Product } from "@/lib/shop-data";

export function CollectionPage({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: Product[];
}) {
  return (
    <>
      <section className="texture-paper border-b border-gold/20 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-3 font-display font-medium text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl tracking-tight">
              {title}
            </h1>
            <div className="gold-rule mx-auto mt-5 w-24" />
            <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="font-sans text-xs tracking-wider text-muted-foreground uppercase">
          {items.length} designs
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 0.07}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
