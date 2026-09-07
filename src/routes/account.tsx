import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  ChevronRight,
  ExternalLink,
  Lock,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { formatINR } from "@/lib/shop-data";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Swarnika Jewellers" },
      {
        name: "description",
        content: "Manage your profile, view demo orders and access admin dashboard.",
      },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { orders } = useShop();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <p className="eyebrow">Customer Account</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Welcome, Priya
        </h1>
        <div className="gold-rule mt-4" />
      </div>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {/* Left Column: Profile Card & Quick Actions */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-soft text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/40 bg-secondary text-2xl font-bold font-display text-gold-deep">
              PS
            </div>
            <h2 className="mt-4 font-display text-xl font-semibold text-foreground">
              Priya Sundaram
            </h2>
            <p className="text-xs text-muted-foreground">+91 9876543210</p>
            <p className="text-xs text-muted-foreground">priya.sundaram@example.com</p>

            <div className="gold-rule my-4" />

            <div className="space-y-2 text-left text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={15} className="text-gold-deep shrink-0" />
                <span>Jubilee Hills, Hyderabad</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck size={15} className="text-gold-deep shrink-0" />
                <span>Verified Swarnika Patron</span>
              </div>
            </div>
          </div>

          {/* Quick Admin Access Card */}
          <div className="rounded-3xl border border-gold/40 bg-card p-6 shadow-lift">
            <h3 className="font-display text-lg font-semibold text-foreground">Store Management</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Access the live demo admin panel to manage and update jewellery orders.
            </p>
            <Link
              to="/admin"
              className="mt-4 flex items-center justify-between rounded-2xl bg-primary px-4 py-3 text-xs font-medium text-primary-foreground transition-all hover:bg-brown shadow-sm"
            >
              <span>Admin Order Portal</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>

        {/* Right Column: Order History */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-soft sm:p-7">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Recent Demo Orders
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Track your hallmarked gold & diamond jewellery deliveries.
            </p>
            <div className="gold-rule mt-4" />

            <div className="mt-6 space-y-4">
              {orders.length === 0 ? (
                <div className="py-10 text-center text-xs text-muted-foreground">
                  No demo orders placed yet.
                </div>
              ) : (
                orders.map((o) => {
                  const dateStr = new Date(o.orderDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <div
                      key={o.id}
                      className="rounded-2xl border border-border/70 bg-background/60 p-5 transition-colors hover:border-gold/40"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
                        <div>
                          <span className="font-mono text-xs font-bold text-foreground">
                            {o.id}
                          </span>
                          <span className="ml-2 text-[0.68rem] text-muted-foreground">
                            • {dateStr}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.65rem] font-semibold text-emerald-700">
                            {o.demoPaymentStatus}
                          </span>
                          <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[0.65rem] font-semibold text-gold-deep">
                            {o.orderStatus}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 divide-y divide-border/40">
                        {o.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                              <div>
                                <p className="text-xs font-medium text-foreground">
                                  {item.product.name}
                                </p>
                                <p className="text-[0.68rem] text-muted-foreground">
                                  Qty: {item.qty} {item.variant ? `• ${item.variant}` : ""}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-foreground">
                              {formatINR(item.price * item.qty)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3 text-xs">
                        <span className="text-muted-foreground">
                          Delivery:{" "}
                          <strong className="text-foreground">{o.estimatedDelivery}</strong>
                        </span>
                        <span className="font-display text-sm font-bold text-foreground">
                          Total: {formatINR(o.total)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
