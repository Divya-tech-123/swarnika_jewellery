import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

const columns = [
  {
    title: "Collections",
    links: [
      { label: "Gold Jewellery", to: "/gold-jewellery" as const },
      { label: "Diamond Jewellery", to: "/diamond-jewellery" as const },
      { label: "Bridal", to: "/bridal" as const },
      { label: "New Arrivals", to: "/new-arrivals" as const },
      { label: "Offers", to: "/offers" as const },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "My Account", to: "/account" as const },
      { label: "Wishlist", to: "/wishlist" as const },
      { label: "Cart", to: "/cart" as const },
      { label: "Admin Orders", to: "/admin" as const },
      { label: "Shipping & Returns", to: "/account" as const },
      { label: "Contact Us", to: "/account" as const },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/collections" as const },
      { label: "Craftsmanship", to: "/collections" as const },
      { label: "Privacy Policy", to: "/account" as const },
      { label: "Terms & Conditions", to: "/account" as const },
    ],
  },
];

export function Footer() {
  return (
    <footer className="texture-paper mt-20 border-t border-gold/25 pb-24 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 font-display text-lg text-gold-deep">
                S
              </span>
              <span>
                <span className="block font-display text-2xl text-foreground">Swarnika</span>
                <span className="block text-[0.6rem] tracking-[0.3em] text-gold-deep">
                  JEWELLERS
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Hallmarked gold and certified diamond jewellery, handcrafted by South Indian artisans
              and delivered across India with insured shipping.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-gold-deep" /> Banjara Hills, Hyderabad
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-gold-deep" /> +91 90000 00000
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-gold-deep" /> care@swarnika.example
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold-deep transition-colors hover:bg-card"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-lg text-foreground">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-gold-deep"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-gold/30 bg-card/70 p-6 sm:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="font-display text-xl text-foreground">
                Get new designs & festive offers first
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                One thoughtful email a month. No spam, ever.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full gap-2 md:w-auto md:min-w-80"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold"
              />
              <button className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-colors hover:bg-brown">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="gold-rule mt-10" />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Swarnika Jewellers. All prices inclusive of GST. BIS
          hallmarked gold · IGI certified diamonds.
        </p>
        <p className="mt-2 text-center text-[0.7rem] tracking-wide text-muted-foreground/80 sm:text-xs">
  Powered by{" "}
  <a
    href="https://autofyagency.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-gold-deep transition-colors hover:underline"
  >
    Autofy.ai
  </a>
</p>
      </div>
    </footer>
  );
}
