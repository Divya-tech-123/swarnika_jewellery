import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  CreditCard,
  Info,
  Loader2,
  Lock,
  QrCode,
  ShieldCheck,
  Smartphone,
  Truck,
  Wallet,
} from "lucide-react";
import { formatINR } from "@/lib/shop-data";
import { generateOrderId, useShop, type Order } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Demo Checkout — Swarnika Jewellers" },
      {
        name: "description",
        content: "Simulated checkout and demo payment for Swarnika Jewellers jewellery orders.",
      },
    ],
  }),
  component: CheckoutPage,
});

type PaymentMethod = "upi" | "card" | "netbanking" | "wallet" | "cod";

const indianStates = [
  "Telangana",
  "Andhra Pradesh",
  "Karnataka",
  "Tamil Nadu",
  "Maharashtra",
  "Delhi",
  "Kerala",
  "Gujarat",
  "Rajasthan",
  "West Bengal",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Punjab",
  "Haryana",
];

const popularBanks = [
  "HDFC Bank",
  "State Bank of India (SBI)",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
  "Bank of Baroda",
];

const popularWallets = ["PhonePe Wallet", "Paytm Wallet", "Amazon Pay", "MobiKwik"];

function CheckoutPage() {
  const router = useRouter();
  const {
    cartProducts,
    cartSubtotal,
    cartMrpSavings,
    cartShipping,
    cartTax,
    cartTotal,
    addOrder,
    clearCart,
  } = useShop();

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: "Priya Sundaram",
    phone: "9876543210",
    email: "priya.sundaram@example.com",
    house: "Flat 304, Royal Palms",
    street: "Jubilee Hills Road No. 36",
    area: "Near Peddamma Temple",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033",
    country: "India",
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("priya@oksbi");
  const [selectedUpiApp, setSelectedUpiApp] = useState("Google Pay");
  const [showQr, setShowQr] = useState(false);

  // Card State
  const [cardNumber, setCardNumber] = useState("4532 8921 7392 4810");
  const [cardName, setCardName] = useState("Priya Sundaram");
  const [cardExpiry, setCardExpiry] = useState("08/28");
  const [cardCvv, setCardCvv] = useState("782");

  // Net banking & Wallet state
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [selectedWallet, setSelectedWallet] = useState("PhonePe Wallet");

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Payment Processing Simulation
  const [processingState, setProcessingState] = useState<
    "idle" | "processing" | "verifying" | "success"
  >("idle");

  if (cartProducts.length === 0 && processingState === "idle") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add items to cart before proceeding to checkout.
        </p>
        <Link
          to="/collections"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-xs text-primary-foreground"
        >
          Browse Jewellery
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\s+/g, ""))) {
      errs.phone = "Enter a valid 10-digit mobile number";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!formData.house.trim()) errs.house = "House / Flat number is required";
    if (!formData.street.trim()) errs.street = "Street address is required";
    if (!formData.area.trim()) errs.area = "Area / Landmark is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.state.trim()) errs.state = "State is required";
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.replace(/\s+/g, ""))) {
      errs.pincode = "Enter a valid 6-digit Pincode";
    }

    if (paymentMethod === "upi") {
      if (!upiId.trim() || !upiId.includes("@")) {
        errs.upiId = "Enter a valid UPI ID (e.g. name@upi)";
      }
    }

    if (paymentMethod === "card") {
      const cleanCard = cardNumber.replace(/\s+/g, "");
      if (cleanCard.length < 15 || cleanCard.length > 19) {
        errs.cardNumber = "Enter a valid 16-digit card number";
      }
      if (!cardName.trim()) errs.cardName = "Cardholder name is required";
      if (!cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        errs.cardExpiry = "Expiry format must be MM/YY";
      }
      if (!cardCvv.trim() || cardCvv.length < 3) {
        errs.cardCvv = "Enter a valid 3-digit CVV";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required checkout fields correctly.");
      return;
    }

    // Begin Simulated Payment Flow
    setProcessingState("processing");

    // Phase 1: Processing (1 second)
    setTimeout(() => {
      setProcessingState("verifying");

      // Phase 2: Verifying (1.2 seconds)
      setTimeout(() => {
        setProcessingState("success");

        // Phase 3: Success & Order Creation (1 second)
        setTimeout(() => {
          const orderId = generateOrderId();
          const deliveryDate = new Date();
          deliveryDate.setDate(deliveryDate.getDate() + 4);

          const formattedDelivery = deliveryDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          let methodLabel = "UPI";
          if (paymentMethod === "upi") methodLabel = `UPI (${selectedUpiApp} - ${upiId})`;
          else if (paymentMethod === "card")
            methodLabel = `Card (ending in ${cardNumber.replace(/\s+/g, "").slice(-4)})`;
          else if (paymentMethod === "netbanking") methodLabel = `Net Banking (${selectedBank})`;
          else if (paymentMethod === "wallet") methodLabel = `Wallet (${selectedWallet})`;
          else if (paymentMethod === "cod") methodLabel = "Cash on Delivery";

          const newOrder: Order = {
            id: orderId,
            customer: {
              fullName: formData.fullName,
              phone: formData.phone,
              email: formData.email,
            },
            deliveryAddress: {
              house: formData.house,
              street: formData.street,
              area: formData.area,
              city: formData.city,
              state: formData.state,
              pincode: formData.pincode,
              country: formData.country,
            },
            items: cartProducts.map((cp) => ({
              product: cp.product,
              qty: cp.qty,
              variant: cp.variant,
              price: cp.product.price,
            })),
            subtotal: cartSubtotal,
            discount: cartMrpSavings,
            shipping: cartShipping,
            tax: cartTax,
            total: cartTotal,
            paymentMethod: methodLabel,
            demoPaymentStatus: "Demo Payment Successful",
            orderStatus: "Confirmed",
            orderDate: new Date().toISOString(),
            estimatedDelivery: formattedDelivery,
          };

          addOrder(newOrder);
          clearCart();

          // Store for order-success route display
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem("sj-last-order", JSON.stringify(newOrder));
          }

          router.navigate({
            to: "/order-success",
            search: { orderId: newOrder.id },
          });
        }, 900);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Demo Notice Banner */}
      <div className="mb-8 rounded-2xl border border-gold/40 bg-amber-500/10 p-4 text-amber-900 shadow-sm dark:text-amber-200">
        <div className="flex items-start gap-3">
          <Info size={20} className="mt-0.5 shrink-0 text-gold-deep" />
          <div className="text-xs leading-relaxed sm:text-sm">
            <strong className="font-semibold text-gold-deep">Simulated Demo Checkout:</strong> This
            is a demonstration checkout experience for Swarnika Jewellers. No real card charge, UPI
            debit, or financial transaction will occur. You can safely test all payment options.
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="eyebrow">Secure Checkout</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Complete Your Order
        </h1>
        <div className="gold-rule mt-4" />
      </div>

      <form onSubmit={handlePay} className="grid gap-10 lg:grid-cols-[1fr_420px]">
        {/* Left Column: Form Details & Payment */}
        <div className="space-y-8">
          {/* Step 1: Customer Information */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-soft sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-deep text-xs font-bold text-white">
                1
              </span>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Customer Information
              </h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-foreground">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Priya Sundaram"
                  className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-colors ${
                    errors.fullName ? "border-destructive" : "border-border focus:border-gold"
                  }`}
                />
                {errors.fullName ? (
                  <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>
                ) : null}
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">
                  Mobile Number (for SMS & OTP) *
                </label>
                <div className="relative mt-1.5">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={formData.phone}
                    maxLength={10}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    className={`w-full rounded-xl border bg-background py-2.5 pr-4 pl-12 text-sm outline-none transition-colors ${
                      errors.phone ? "border-destructive" : "border-border focus:border-gold"
                    }`}
                  />
                </div>
                {errors.phone ? (
                  <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
                ) : null}
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">
                  Email Address (for invoice) *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="priya@example.com"
                  className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-colors ${
                    errors.email ? "border-destructive" : "border-border focus:border-gold"
                  }`}
                />
                {errors.email ? (
                  <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                ) : null}
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Address */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-soft sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-deep text-xs font-bold text-white">
                2
              </span>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Insured Delivery Address
              </h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-foreground">
                  House / Flat / Door No. *
                </label>
                <input
                  type="text"
                  value={formData.house}
                  onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                  placeholder="Flat 304, Royal Palms"
                  className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ${
                    errors.house ? "border-destructive" : "border-border focus:border-gold"
                  }`}
                />
                {errors.house ? (
                  <p className="mt-1 text-xs text-destructive">{errors.house}</p>
                ) : null}
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">Street Name / Road *</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="Road No. 36"
                  className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ${
                    errors.street ? "border-destructive" : "border-border focus:border-gold"
                  }`}
                />
                {errors.street ? (
                  <p className="mt-1 text-xs text-destructive">{errors.street}</p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-foreground">
                  Area / Locality / Landmark *
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="Jubilee Hills, near Peddamma Temple"
                  className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ${
                    errors.area ? "border-destructive" : "border-border focus:border-gold"
                  }`}
                />
                {errors.area ? (
                  <p className="mt-1 text-xs text-destructive">{errors.area}</p>
                ) : null}
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Hyderabad"
                  className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ${
                    errors.city ? "border-destructive" : "border-border focus:border-gold"
                  }`}
                />
                {errors.city ? (
                  <p className="mt-1 text-xs text-destructive">{errors.city}</p>
                ) : null}
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">State *</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold"
                >
                  {indianStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">Pincode *</label>
                <input
                  type="text"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="500033"
                  className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ${
                    errors.pincode ? "border-destructive" : "border-border focus:border-gold"
                  }`}
                />
                {errors.pincode ? (
                  <p className="mt-1 text-xs text-destructive">{errors.pincode}</p>
                ) : null}
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">Country</label>
                <input
                  type="text"
                  disabled
                  value={formData.country}
                  className="mt-1.5 w-full rounded-xl border border-border bg-secondary/60 px-4 py-2.5 text-sm text-muted-foreground outline-none"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Demo Payment Method Screen */}
          <div className="rounded-3xl border border-gold/40 bg-card p-6 shadow-soft sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-deep text-xs font-bold text-white">
                  3
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Select Demo Payment Method
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Encrypted 256-bit simulated gateway
                  </p>
                </div>
              </div>
              <Lock size={16} className="text-gold-deep" />
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {[
                { id: "upi", label: "UPI", icon: Smartphone },
                { id: "card", label: "Card", icon: CreditCard },
                { id: "netbanking", label: "Net Banking", icon: Building2 },
                { id: "wallet", label: "Wallet", icon: Wallet },
                { id: "cod", label: "Cash on Del.", icon: Truck },
              ].map(({ id, label, icon: Icon }) => {
                const active = paymentMethod === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPaymentMethod(id as PaymentMethod)}
                    className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-xs font-medium transition-all ${
                      active
                        ? "border-gold-deep bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-background text-foreground hover:border-gold hover:bg-secondary/40"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: UPI Form */}
            {paymentMethod === "upi" ? (
              <div className="mt-6 rounded-2xl border border-gold/30 bg-secondary/40 p-5">
                <h3 className="text-sm font-semibold text-foreground">
                  Instant UPI Payment (Demo)
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Google Pay", "PhonePe", "Paytm UPI", "BHIM"].map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setSelectedUpiApp(app)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                        selectedUpiApp === app
                          ? "border-gold-deep bg-background text-gold-deep font-semibold shadow-xs"
                          : "border-border/60 bg-background/60 text-muted-foreground hover:bg-background"
                      }`}
                    >
                      {app}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="text-xs font-medium text-foreground">
                    Enter Virtual Payment Address (UPI ID)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. yourname@okhdfcbank"
                    className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ${
                      errors.upiId ? "border-destructive" : "border-border focus:border-gold"
                    }`}
                  />
                  {errors.upiId ? (
                    <p className="mt-1 text-xs text-destructive">{errors.upiId}</p>
                  ) : null}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Or pay using QR code scanner:</span>
                  <button
                    type="button"
                    onClick={() => setShowQr(!showQr)}
                    className="inline-flex items-center gap-1 font-medium text-gold-deep underline"
                  >
                    <QrCode size={14} /> {showQr ? "Hide Demo QR" : "Show Demo QR"}
                  </button>
                </div>

                {showQr ? (
                  <div className="mt-4 flex flex-col items-center rounded-xl bg-background p-4 text-center">
                    <div className="grid h-36 w-36 place-items-center rounded-xl border-2 border-dashed border-gold/60 bg-secondary">
                      <QrCode size={90} className="text-gold-deep" />
                    </div>
                    <p className="mt-2 text-[0.7rem] text-muted-foreground">
                      Demo QR Code for testing purpose. Simulated payment will approve on click
                      below.
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* Tab 2: Credit / Debit Card Form */}
            {paymentMethod === "card" ? (
              <div className="mt-6 rounded-2xl border border-gold/30 bg-secondary/40 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">
                    Card Details (Demo Mode)
                  </h3>
                  <div className="flex items-center gap-1.5 text-[0.65rem] text-muted-foreground">
                    <span className="rounded bg-background px-1.5 py-0.5 font-bold">VISA</span>
                    <span className="rounded bg-background px-1.5 py-0.5 font-bold">
                      Mastercard
                    </span>
                    <span className="rounded bg-background px-1.5 py-0.5 font-bold">RuPay</span>
                  </div>
                </div>

                <div className="mt-4 space-y-3.5">
                  <div>
                    <label className="text-xs font-medium text-foreground">Card Number</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 0000 0000 0000"
                      className={`mt-1 w-full rounded-xl border bg-background px-4 py-2.5 text-sm font-mono outline-none ${
                        errors.cardNumber ? "border-destructive" : "border-border focus:border-gold"
                      }`}
                    />
                    {errors.cardNumber ? (
                      <p className="mt-1 text-xs text-destructive">{errors.cardNumber}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-foreground">Name on Card</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name as printed on card"
                      className={`mt-1 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ${
                        errors.cardName ? "border-destructive" : "border-border focus:border-gold"
                      }`}
                    />
                    {errors.cardName ? (
                      <p className="mt-1 text-xs text-destructive">{errors.cardName}</p>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-foreground">Expiry Date</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className={`mt-1 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ${
                          errors.cardExpiry
                            ? "border-destructive"
                            : "border-border focus:border-gold"
                        }`}
                      />
                      {errors.cardExpiry ? (
                        <p className="mt-1 text-xs text-destructive">{errors.cardExpiry}</p>
                      ) : null}
                    </div>

                    <div>
                      <label className="text-xs font-medium text-foreground">
                        CVV / Security Code
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className={`mt-1 w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ${
                          errors.cardCvv ? "border-destructive" : "border-border focus:border-gold"
                        }`}
                      />
                      {errors.cardCvv ? (
                        <p className="mt-1 text-xs text-destructive">{errors.cardCvv}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Tab 3: Net Banking Form */}
            {paymentMethod === "netbanking" ? (
              <div className="mt-6 rounded-2xl border border-gold/30 bg-secondary/40 p-5">
                <h3 className="text-sm font-semibold text-foreground">
                  Select Net Banking Institution
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Simulated bank authentication portal for demonstration.
                </p>

                <div className="mt-4">
                  <label className="text-xs font-medium text-foreground">Select Your Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold"
                  >
                    {popularBanks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : null}

            {/* Tab 4: Wallet Form */}
            {paymentMethod === "wallet" ? (
              <div className="mt-6 rounded-2xl border border-gold/30 bg-secondary/40 p-5">
                <h3 className="text-sm font-semibold text-foreground">Select Digital Wallet</h3>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {popularWallets.map((wallet) => (
                    <button
                      key={wallet}
                      type="button"
                      onClick={() => setSelectedWallet(wallet)}
                      className={`rounded-xl border p-3 text-xs font-medium transition-all ${
                        selectedWallet === wallet
                          ? "border-gold-deep bg-background text-gold-deep font-semibold shadow-xs"
                          : "border-border/80 bg-background/60 text-muted-foreground hover:bg-background"
                      }`}
                    >
                      {wallet}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Tab 5: Cash on Delivery Form */}
            {paymentMethod === "cod" ? (
              <div className="mt-6 rounded-2xl border border-gold/30 bg-secondary/40 p-5">
                <h3 className="text-sm font-semibold text-foreground">Cash on Insured Delivery</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Pay with cash or card upon delivery. An OTP will be sent to your registered mobile
                  number before the courier handover for security.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-background px-3 py-2 text-xs font-medium text-gold-deep">
                  <ShieldCheck size={16} /> Max COD limit for jewellery: ₹2,00,000
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Right Column: Order Summary & Pay Action */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-gold/35 bg-card p-6 shadow-lift">
            <h2 className="font-display text-2xl font-semibold text-foreground">Order Summary</h2>
            <div className="gold-rule mt-4" />

            {/* Compact Product List */}
            <div className="mt-5 max-h-72 space-y-3 overflow-y-auto pr-1">
              {cartProducts.map(({ product, qty, variant }) => (
                <div key={`${product.id}-${variant || "std"}`} className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-14 w-14 shrink-0 rounded-xl border border-gold/20 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-sans text-xs font-medium text-foreground">
                      {product.name}
                    </p>
                    <p className="font-sans text-[0.68rem] text-muted-foreground">
                      Qty: {qty} {variant ? `• ${variant}` : ""}
                    </p>
                    <p className="font-sans text-xs font-semibold text-gold-deep">
                      {formatINR(product.price * qty)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="gold-rule my-4" />

            {/* Price Calculations */}
            <div className="space-y-2.5 font-sans text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">{formatINR(cartSubtotal)}</span>
              </div>

              {cartMrpSavings > 0 ? (
                <div className="flex justify-between text-emerald-700">
                  <span>Savings</span>
                  <span className="font-medium">- {formatINR(cartMrpSavings)}</span>
                </div>
              ) : null}

              <div className="flex justify-between">
                <span>Insured Doorstep Shipping</span>
                <span className="font-semibold text-emerald-700">FREE</span>
              </div>

              <div className="flex justify-between">
                <span>Applicable GST (3%)</span>
                <span className="font-medium text-foreground">{formatINR(cartTax)}</span>
              </div>

              <div className="gold-rule my-3" />

              <div className="flex items-baseline justify-between text-foreground">
                <span className="font-display text-base font-semibold">Total Amount</span>
                <span className="font-sans text-2xl font-semibold tracking-tight">
                  {formatINR(cartTotal)}
                </span>
              </div>
            </div>

            {/* Pay Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={processingState !== "idle"}
                className="relative flex w-full items-center justify-center gap-2 rounded-full border border-gold-deep bg-primary py-4 font-sans text-xs font-medium tracking-wide text-primary-foreground uppercase shadow-lift transition-all hover:bg-brown active:scale-98 disabled:opacity-75"
              >
                {paymentMethod === "cod" ? (
                  <span>Place Demo Order ({formatINR(cartTotal)})</span>
                ) : (
                  <span>Pay {formatINR(cartTotal)} (Demo)</span>
                )}
              </button>
            </div>

            <p className="mt-3 text-center font-sans text-[0.68rem] text-muted-foreground">
              Simulated demonstration. No banking charge. 100% test environment.
            </p>
          </div>
        </div>
      </form>

      {/* Simulated Payment Processing Modal Overlay */}
      {processingState !== "idle" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-foreground/50 backdrop-blur-md" />
          <div className="relative z-10 w-full max-w-md rounded-3xl border border-gold/40 bg-card p-8 text-center shadow-lift">
            {processingState === "processing" ? (
              <div className="py-6">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-gold border-t-transparent animate-spin">
                  <Loader2 size={28} className="text-gold-deep" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
                  Processing Payment...
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Initiating secure demo transaction with payment network
                </p>
              </div>
            ) : null}

            {processingState === "verifying" ? (
              <div className="py-6">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/20">
                  <ShieldCheck size={36} className="text-gold-deep animate-pulse" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
                  Verifying Payment...
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Confirming authorization with simulated banking gateway
                </p>
              </div>
            ) : null}

            {processingState === "success" ? (
              <div className="py-6">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-emerald-800">
                  Payment Successful!
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Generating order invoice & shipping confirmation...
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
