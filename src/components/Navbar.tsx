import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useShop } from "@/lib/store";

const links = [
  { label: "Home", to: "/" },
  { label: "Collections", to: "/collections" },
  { label: "Gold Jewellery", to: "/gold-jewellery" },
  { label: "Diamond Jewellery", to: "/diamond-jewellery" },
  { label: "Bridal", to: "/bridal" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Offers", to: "/offers" },
] as const;

function Logo() {
  return (
    <Link to="/" className="group flex shrink-0 items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/60 font-display text-lg text-gold-deep transition-all duration-300 group-hover:scale-105 group-hover:border-gold">
        S
      </span>
      <span className="leading-none">
        <span className="block font-display text-xl tracking-wide text-foreground transition-colors duration-300 group-hover:text-gold-deep">Swarnika</span>
        <span className="block text-[0.6rem] tracking-[0.3em] text-gold-deep">JEWELLERS</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, wishlist } = useShop();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        stuck
          ? "border-b border-gold/20 bg-background/80 shadow-soft backdrop-blur-xl"
          : "bg-background"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 lg:hidden">
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="icon-btn-subtle grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-secondary"
        >
          <Menu size={20} />
        </button>
        <div className="flex min-w-0 justify-center">
          <Logo />
        </div>
        <div className="flex items-center">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="icon-btn-subtle grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-secondary hover:text-gold-deep"
          >
            <Search size={19} />
          </button>
          <Link
            to="/cart"
            aria-label="Cart"
            className="icon-btn-subtle relative grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-secondary hover:text-gold-deep"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 ? <Badge value={cartCount} /> : null}
          </Link>
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl items-center gap-6 px-6 py-4 lg:flex">
        <Logo />
        <nav className="flex min-w-0 flex-1 items-center justify-center gap-1.5">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="nav-link-indicator rounded-full px-3 py-1.5 font-sans text-[0.82rem] font-medium tracking-wide text-muted-foreground transition-colors hover:text-gold-deep data-[status=active]:text-gold-deep data-[status=active]:font-semibold"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="icon-btn-subtle grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-secondary hover:text-gold-deep"
          >
            <Search size={19} />
          </button>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="icon-btn-subtle relative grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-secondary hover:text-gold-deep"
          >
            <Heart size={19} />
            {wishlist.length > 0 ? <Badge value={wishlist.length} /> : null}
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="icon-btn-subtle relative grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-secondary hover:text-gold-deep"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 ? <Badge value={cartCount} /> : null}
          </Link>
          <Link
            to="/account"
            aria-label="Account"
            className="icon-btn-subtle grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-secondary hover:text-gold-deep"
          >
            <User size={19} />
          </Link>
          <Link
            to="/admin"
            aria-label="Admin Dashboard"
            title="Admin Orders"
            className="btn-luxury ml-1 hidden items-center gap-1 rounded-full border border-gold/50 bg-secondary/60 px-3 py-1.5 font-sans text-xs font-medium text-gold-deep hover:bg-gold-deep hover:text-white sm:flex"
          >
            Admin
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-gold/15 bg-secondary/60"
          >
            <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4">
              <Search size={18} className="text-gold-deep" />
              <input
                autoFocus
                placeholder="Search for jhumkas, bridal sets, mangalsutra…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/30 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed top-0 left-0 z-50 h-full w-[82%] max-w-xs bg-background p-6 shadow-lift lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="gold-rule mt-6" />
              <nav className="mt-6 flex flex-col">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="border-b border-border/60 py-3.5 font-sans font-medium text-sm text-foreground hover:text-gold-deep transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  to="/account"
                  onClick={() => setOpen(false)}
                  className="border-b border-border/60 py-3.5 font-sans font-medium text-sm text-foreground hover:text-gold-deep transition-colors"
                >
                  My Account
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="py-3.5 font-sans font-medium text-sm text-gold-deep hover:text-gold-deep/80 transition-colors"
                >
                  Admin Orders
                </Link>
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Badge({ value }: { value: number }) {
  return (
    <span className="absolute top-1 right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold-deep px-1 text-[0.6rem] font-medium text-primary-foreground">
      {value}
    </span>
  );
}
