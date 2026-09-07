import { useEffect, useState } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Copy,
  Download,
  MapPin,
  Phone,
  Printer,
  ShieldCheck,
  Sparkles,
  Truck,
  User,
} from "lucide-react";
import { formatINR } from "@/lib/shop-data";
import { useShop, type Order } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Swarnika Jewellers" },
      {
        name: "description",
        content: "Your demo jewellery order has been confirmed successfully.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { orderId?: string } => ({
    orderId: typeof search.orderId === "string" ? search.orderId : undefined,
  }),
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const { orderId } = useSearch({ from: "/order-success" });
  const { orders } = useShop();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // 1. Check in orders state
    if (orderId) {
      const found = orders.find((o) => o.id === orderId);
      if (found) {
        setOrder(found);
        return;
      }
    }

    // 2. Check in sessionStorage
    if (typeof window !== "undefined") {
      const raw = window.sessionStorage.getItem("sj-last-order");
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as Order;
          setOrder(parsed);
          return;
        } catch {
          // ignore
        }
      }
    }

    // 3. Fallback to latest order
    if (orders.length > 0) {
      setOrder(orders[0] ?? null);
    }
  }, [orderId, orders]);

  const copyOrderId = () => {
    if (order?.id && typeof navigator !== "undefined") {
      navigator.clipboard.writeText(order.id);
      toast.success(`Order ID ${order.id} copied to clipboard!`);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          No recent order found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse our catalogue to place a new order.
        </p>
        <Link
          to="/collections"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-xs text-primary-foreground"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Subtle Premium Celebration Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-50 shadow-soft">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-200 opacity-40" />
          <div className="grid h-18 w-18 place-items-center rounded-full bg-emerald-600 text-white shadow-lift">
            <CheckCircle size={42} />
          </div>
        </div>

        <p className="eyebrow mt-6">Order Confirmation</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-5xl">
          ✓ Order Placed Successfully
        </h1>
        <div className="gold-rule mx-auto mt-4 w-32" />

        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          Thank you for choosing Swarnika Jewellers. Your handcrafted hallmarked jewellery is being
          prepared with traditional care for insured dispatch.
        </p>
      </motion.div>

      {/* Order Status & ID Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gold/40 bg-card p-5 shadow-soft sm:p-6">
        <div>
          <span className="text-[0.68rem] tracking-wider text-muted-foreground uppercase">
            Order Reference Number
          </span>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-foreground sm:text-xl">
              {order.id}
            </span>
            <button
              type="button"
              onClick={copyOrderId}
              aria-label="Copy Order ID"
              className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <Copy size={15} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>{order.demoPaymentStatus}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-semibold text-gold-deep">
            <span>Status: {order.orderStatus}</span>
          </div>
        </div>
      </div>

      {/* Estimated Delivery Notice */}
      <div className="mt-5 rounded-2xl border border-gold/30 bg-secondary/50 p-4">
        <div className="flex items-center gap-3">
          <Truck size={22} className="text-gold-deep shrink-0" />
          <div className="text-xs text-foreground sm:text-sm">
            <span>Estimated Delivery: </span>
            <strong className="font-semibold text-gold-deep">{order.estimatedDelivery}</strong>
            <span className="text-muted-foreground">
              {" "}
              (Insured BlueDart / Sequel Logistics with Tamper-Seal)
            </span>
          </div>
        </div>
      </div>

      {/* Main Order Details Card */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-soft">
        <div className="border-b border-border/60 bg-secondary/30 p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Purchased Jewellery Items
          </h2>
        </div>

        {/* Products List */}
        <div className="divide-y divide-border/60 p-5 sm:p-6">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-20 w-20 shrink-0 rounded-2xl border border-gold/20 object-cover"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[0.65rem] tracking-wider text-gold-deep uppercase">
                  {item.product.category}
                </span>
                <h3 className="font-sans font-medium text-base text-foreground sm:text-lg">
                  {item.product.name}
                </h3>
                <div className="mt-1 flex flex-wrap gap-2 font-sans text-xs text-muted-foreground">
                  <span>{item.product.purity}</span>
                  <span>• {item.product.weight}</span>
                  {item.variant ? (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-foreground">
                      {item.variant}
                    </span>
                  ) : null}
                  <span>• Qty: {item.qty}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-sans font-semibold text-base sm:text-lg text-foreground tracking-tight">
                  {formatINR(item.price * item.qty)}
                </span>
                <p className="font-sans text-[0.68rem] text-muted-foreground">
                  {formatINR(item.price)} each
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Financial & Delivery Details Breakdown */}
        <div
          id="order-details-card"
          className="grid border-t border-border/60 bg-secondary/20 md:grid-cols-2 font-sans"
        >
          {/* Customer & Delivery Address */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-border/60">
            <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Shipping & Recipient Details
            </h3>

            <div className="mt-3 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <User size={14} className="text-gold-deep" />
                <span>{order.customer.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gold-deep" />
                <span>+91 {order.customer.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-gold-deep mt-0.5 shrink-0" />
                <span>
                  {order.deliveryAddress.house}, {order.deliveryAddress.street},{" "}
                  {order.deliveryAddress.area}, {order.deliveryAddress.city},{" "}
                  {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-gold-deep font-medium">
                <ShieldCheck size={14} />
                <span>Payment: {order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="p-6 space-y-2 text-xs">
            <h3 className="font-semibold tracking-wider text-muted-foreground uppercase">
              Financial Breakdown
            </h3>

            <div className="flex justify-between text-muted-foreground pt-2">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">{formatINR(order.subtotal)}</span>
            </div>

            {order.discount > 0 ? (
              <div className="flex justify-between text-emerald-700">
                <span>Discount / Savings</span>
                <span className="font-medium">- {formatINR(order.discount)}</span>
              </div>
            ) : null}

            <div className="flex justify-between text-muted-foreground">
              <span>Insured Transit</span>
              <span className="font-semibold text-emerald-700">FREE</span>
            </div>

            <div className="flex justify-between text-muted-foreground">
              <span>GST (3% Indian Gold Tax)</span>
              <span className="font-medium text-foreground">{formatINR(order.tax)}</span>
            </div>

            <div className="gold-rule my-2" />

            <div className="flex items-baseline justify-between pt-1">
              <span className="font-display text-base font-semibold text-foreground">
                Total Paid (Demo)
              </span>
              <span className="font-sans text-2xl font-semibold text-foreground tracking-tight">
                {formatINR(order.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
        <a
          href="#order-details-card"
          className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-card px-6 py-3 font-sans text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-secondary"
        >
          View Order
        </a>

        <Link
          to="/collections"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-sans text-xs font-medium text-primary-foreground shadow-soft transition-all hover:bg-brown"
        >
          Continue Shopping <ArrowRight size={15} />
        </Link>

        <Link
          to="/admin"
          className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-background px-6 py-3 font-sans text-xs font-medium text-gold-deep transition-all hover:bg-gold-deep hover:text-white"
        >
          View in Admin Dashboard
        </Link>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 font-sans text-xs font-medium text-muted-foreground shadow-xs transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Printer size={15} className="text-gold-deep" /> Print Demo Invoice
        </button>
      </div>
    </div>
  );
}
