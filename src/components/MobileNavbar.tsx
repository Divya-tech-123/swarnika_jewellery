import { Link } from "@tanstack/react-router";
import { Grid2x2, Heart, Home, ShoppingBag, User } from "lucide-react";
import { useShop } from "@/lib/store";

const items = [
  { label: "Home", to: "/", icon: Home },
  { label: "Categories", to: "/collections", icon: Grid2x2 },
  { label: "Wishlist", to: "/wishlist", icon: Heart },
  { label: "Cart", to: "/cart", icon: ShoppingBag },
  { label: "Account", to: "/account", icon: User },
] as const;

export function MobileNavbar() {
  const { cartCount, wishlist } = useShop();

  const counts: Record<string, number> = { "/cart": cartCount, "/wishlist": wishlist.length };

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full border-t border-gold/20 bg-background/90 backdrop-blur-xl lg:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {items.map(({ label, to, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="relative flex flex-col items-center gap-1 py-2.5 text-[0.65rem] text-muted-foreground transition-colors data-[status=active]:text-gold-deep"
            >
              <Icon size={19} />
              {counts[to] ? (
                <span className="absolute top-1 right-1/2 mr-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold-deep px-1 text-[0.58rem] text-primary-foreground">
                  {counts[to]}
                </span>
              ) : null}
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
