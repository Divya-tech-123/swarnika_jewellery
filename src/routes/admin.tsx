import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowUpDown,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  Eye,
  Filter,
  Package,
  RefreshCw,
  Search,
  ShieldCheck,
  Truck,
  User,
  X,
} from "lucide-react";
import { formatINR } from "@/lib/shop-data";
import { useShop, type Order, type OrderStatus } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Order Management — Swarnika Jewellers" },
      {
        name: "description",
        content: "Admin portal for Swarnika Jewellers demo orders and status management.",
      },
    ],
  }),
  component: AdminPage,
});

const statusOptions: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const statusStyles: Record<OrderStatus, { bg: string; text: string; border: string }> = {
  Pending: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-800 dark:text-amber-300",
    border: "border-amber-300",
  },
  Confirmed: {
    bg: "bg-sky-50 dark:bg-sky-950/30",
    text: "text-sky-800 dark:text-sky-300",
    border: "border-sky-300",
  },
  Processing: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    text: "text-purple-800 dark:text-purple-300",
    border: "border-purple-300",
  },
  Shipped: {
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    text: "text-indigo-800 dark:text-indigo-300",
    border: "border-indigo-300",
  },
  Delivered: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-800 dark:text-emerald-300",
    border: "border-emerald-300",
  },
  Cancelled: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-800 dark:text-rose-300",
    border: "border-rose-300",
  },
};

function AdminPage() {
  const { orders, updateOrderStatus, resetOrders } = useShop();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("All");
  const [activeModalOrder, setActiveModalOrder] = useState<Order | null>(null);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer.phone.includes(searchQuery) ||
        o.deliveryAddress.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = selectedStatusFilter === "All" || o.orderStatus === selectedStatusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, searchQuery, selectedStatusFilter]);

  // Statistics
  const totalRevenue = useMemo(() => {
    return orders.filter((o) => o.orderStatus !== "Cancelled").reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const pendingCount = useMemo(
    () => orders.filter((o) => o.orderStatus === "Pending" || o.orderStatus === "Confirmed").length,
    [orders],
  );

  const deliveredCount = useMemo(
    () => orders.filter((o) => o.orderStatus === "Delivered").length,
    [orders],
  );

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Order ${orderId} status updated to "${newStatus}"`);
    if (activeModalOrder && activeModalOrder.id === orderId) {
      setActiveModalOrder((prev) => (prev ? { ...prev, orderStatus: newStatus } : null));
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border/80 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gold-deep/15 px-3 py-0.5 text-xs font-semibold text-gold-deep">
              Store Manager Portal
            </span>
            <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[0.65rem] text-muted-foreground">
              Demo Environment
            </span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Admin Order Management
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage customer orders, track fulfilment stages and update dispatch statuses in real
            time.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              resetOrders();
              toast.info("Demo orders restored to initial seed state.");
            }}
            className="flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <RefreshCw size={14} /> Reset Demo Data
          </button>
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-all hover:bg-brown"
          >
            <ExternalLink size={14} /> View Store
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-soft">
          <span className="text-xs text-muted-foreground">Total Orders</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-3xl font-bold text-foreground">{orders.length}</span>
            <Package size={22} className="text-gold-deep opacity-70" />
          </div>
        </div>

        <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-soft">
          <span className="text-xs text-muted-foreground">Total Order Value</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              {formatINR(totalRevenue)}
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-soft">
          <span className="text-xs text-muted-foreground">Pending / Confirmed</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-3xl font-bold text-amber-700">{pendingCount}</span>
            <Clock size={22} className="text-amber-600 opacity-70" />
          </div>
        </div>

        <div className="rounded-3xl border border-border/80 bg-card p-5 shadow-soft">
          <span className="text-xs text-muted-foreground">Delivered Orders</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-3xl font-bold text-emerald-700">
              {deliveredCount}
            </span>
            <CheckCircle size={22} className="text-emerald-600 opacity-70" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        {/* Status Filter Tabs */}
        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto rounded-full border border-border bg-card p-1">
          {["All", ...statusOptions].map((tab) => {
            const active = selectedStatusFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedStatusFilter(tab)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[280px]">
          <Search
            size={16}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID, name, phone, city..."
            className="w-full rounded-full border border-border bg-card py-2 pr-4 pl-9 text-xs outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/80 bg-secondary/50 text-[0.7rem] font-semibold tracking-wider text-muted-foreground uppercase">
              <tr>
                <th className="py-3.5 pr-4 pl-6">Order ID & Date</th>
                <th className="px-4 py-3.5">Customer</th>
                <th className="px-4 py-3.5">Jewellery Items</th>
                <th className="px-4 py-3.5">Total Amount</th>
                <th className="px-4 py-3.5">Payment Method</th>
                <th className="px-4 py-3.5">Current Status</th>
                <th className="px-4 py-3.5">Update Status</th>
                <th className="py-3.5 pr-6 pl-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    No demo orders match the specified filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const style = statusStyles[order.orderStatus];
                  const orderDate = new Date(order.orderDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <tr key={order.id} className="transition-colors hover:bg-secondary/30">
                      {/* Order ID & Date */}
                      <td className="py-4 pr-4 pl-6">
                        <div className="font-mono font-bold text-foreground">{order.id}</div>
                        <div className="text-[0.68rem] text-muted-foreground">{orderDate}</div>
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-4">
                        <div className="font-semibold text-foreground">
                          {order.customer.fullName}
                        </div>
                        <div className="text-[0.68rem] text-muted-foreground">
                          +91 {order.customer.phone}
                        </div>
                        <div className="text-[0.68rem] text-muted-foreground">
                          {order.deliveryAddress.city}
                        </div>
                      </td>

                      {/* Items */}
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-7 w-7 rounded-lg object-cover"
                              />
                              <span className="truncate max-w-[150px] font-medium text-foreground">
                                {item.product.name}
                              </span>
                              <span className="text-muted-foreground">x{item.qty}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-4 py-4">
                        <div className="font-sans font-semibold text-sm text-foreground">
                          {formatINR(order.total)}
                        </div>
                        <div className="font-sans text-[0.65rem] text-emerald-700">
                          3% GST Included
                        </div>
                      </td>

                      {/* Payment Method */}
                      <td className="px-4 py-4">
                        <div className="font-medium text-foreground">{order.paymentMethod}</div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                          {order.demoPaymentStatus}
                        </span>
                      </td>

                      {/* Order Status Badge */}
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.72rem] font-semibold ${style.bg} ${style.text} ${style.border}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      {/* Status Update Dropdown */}
                      <td className="px-4 py-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value as OrderStatus)
                          }
                          className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground outline-none focus:border-gold"
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Details button */}
                      <td className="py-4 pr-6 pl-4 text-right">
                        <button
                          type="button"
                          onClick={() => setActiveModalOrder(order)}
                          className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-secondary/60 px-3 py-1 text-xs font-medium text-gold-deep transition-colors hover:bg-gold hover:text-white"
                        >
                          <Eye size={13} /> View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Order Modal */}
      {activeModalOrder ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setActiveModalOrder(null)}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm"
          />

          <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gold/40 bg-card p-6 shadow-lift sm:p-8">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <div>
                <span className="eyebrow">Order Inspection</span>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {activeModalOrder.id}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalOrder(null)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Lifecycle Status Controller */}
            <div className="mt-5 rounded-2xl border border-gold/30 bg-secondary/50 p-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Lifecycle Stage (Admin Update):
              </label>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {statusOptions.map((st) => {
                  const active = activeModalOrder.orderStatus === st;
                  const style = statusStyles[st];
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(activeModalOrder.id, st)}
                      className={`rounded-full border px-3.5 py-1 text-xs font-semibold transition-all ${
                        active
                          ? `${style.bg} ${style.text} ${style.border} ring-2 ring-gold/40 shadow-xs`
                          : "border-border bg-background text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customer & Address Details */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/70 p-4">
                <span className="text-[0.68rem] tracking-wider text-muted-foreground uppercase font-semibold">
                  Customer
                </span>
                <p className="mt-1 font-semibold text-foreground">
                  {activeModalOrder.customer.fullName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Phone: +91 {activeModalOrder.customer.phone}
                </p>
                <p className="text-xs text-muted-foreground">
                  Email: {activeModalOrder.customer.email}
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 p-4">
                <span className="text-[0.68rem] tracking-wider text-muted-foreground uppercase font-semibold">
                  Delivery Destination
                </span>
                <p className="mt-1 text-xs text-foreground leading-relaxed">
                  {activeModalOrder.deliveryAddress.house},{" "}
                  {activeModalOrder.deliveryAddress.street}, {activeModalOrder.deliveryAddress.area}
                  , {activeModalOrder.deliveryAddress.city},{" "}
                  {activeModalOrder.deliveryAddress.state} -{" "}
                  {activeModalOrder.deliveryAddress.pincode}
                </p>
                <p className="mt-2 text-xs font-medium text-gold-deep">
                  Estimated Delivery: {activeModalOrder.estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="mt-5 rounded-2xl border border-border/70 p-4">
              <span className="text-[0.68rem] tracking-wider text-muted-foreground uppercase font-semibold">
                Ordered Items
              </span>
              <div className="mt-3 divide-y divide-border/60">
                {activeModalOrder.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={it.product.image}
                        alt={it.product.name}
                        className="h-11 w-11 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-semibold text-xs text-foreground">{it.product.name}</p>
                        <p className="text-[0.68rem] text-muted-foreground">
                          {it.product.purity} • {it.product.weight}{" "}
                          {it.variant ? `• ${it.variant}` : ""} • Qty: {it.qty}
                        </p>
                      </div>
                    </div>
                    <span className="font-sans font-semibold text-sm text-foreground">
                      {formatINR(it.price * it.qty)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial summary */}
            <div className="mt-5 flex justify-between items-center rounded-2xl bg-secondary/50 p-4">
              <div>
                <span className="text-xs text-muted-foreground">Payment Method:</span>
                <p className="font-sans font-medium text-xs text-foreground">
                  {activeModalOrder.paymentMethod}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground">Total Paid:</span>
                <p className="font-sans text-xl font-semibold text-foreground">
                  {formatINR(activeModalOrder.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
