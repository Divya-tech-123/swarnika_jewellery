import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./shop-data";

export type CartLine = { id: string; qty: number; variant?: string };

export type CustomerInfo = {
  fullName: string;
  phone: string;
  email: string;
};

export type DeliveryAddress = {
  house: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

export type OrderItem = {
  product: Product;
  qty: number;
  variant?: string;
  price: number;
};

export type OrderStatus =
  "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  customer: CustomerInfo;
  deliveryAddress: DeliveryAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  demoPaymentStatus: string;
  orderStatus: OrderStatus;
  orderDate: string;
  estimatedDelivery: string;
};

type ShopStore = {
  cart: CartLine[];
  wishlist: string[];
  orders: Order[];
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  addToCart: (id: string, qty?: number, variant?: string) => void;
  removeFromCart: (id: string, variant?: string) => void;
  setQty: (id: string, qty: number, variant?: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  cartMrpSavings: number;
  cartShipping: number;
  cartTax: number;
  cartTotal: number;
  cartProducts: { product: Product; qty: number; variant?: string }[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  resetOrders: () => void;
};

const ShopContext = createContext<ShopStore | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const generateOrderId = (): string => {
  const date = new Date();
  const yyyy = date.getFullYear().toString();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  return `SWK${yyyy}${mm}${dd}${randomSuffix}`;
};

const initialSampleOrders: Order[] = [
  {
    id: "SWK20260905001",
    customer: {
      fullName: "Ananya Sharma",
      phone: "9848022338",
      email: "ananya.sharma@example.com",
    },
    deliveryAddress: {
      house: "Flat 402, Golden Heights",
      street: "Road No. 12, Banjara Hills",
      area: "Near City Center Mall",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500034",
      country: "India",
    },
    items: [
      {
        product: products[0],
        qty: 1,
        variant: 'Standard (18")',
        price: products[0].price,
      },
    ],
    subtotal: products[0].price,
    discount: 14500,
    shipping: 0,
    tax: Math.round(products[0].price * 0.03),
    total: products[0].price + Math.round(products[0].price * 0.03),
    paymentMethod: "UPI (Google Pay)",
    demoPaymentStatus: "Demo Payment Successful",
    orderStatus: "Shipped",
    orderDate: "2026-09-05T10:30:00.000Z",
    estimatedDelivery: "09 Sep 2026",
  },
  {
    id: "SWK20260906002",
    customer: {
      fullName: "Raghavendra Rao",
      phone: "9123456780",
      email: "raghav.rao@example.com",
    },
    deliveryAddress: {
      house: "Villa 18, Palm Meadows",
      street: "Whitefield Main Road",
      area: "Next to ITPL",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560066",
      country: "India",
    },
    items: [
      {
        product: products[4],
        qty: 1,
        variant: "Ring Size: 14",
        price: products[4].price,
      },
    ],
    subtotal: products[4].price,
    discount: 7500,
    shipping: 0,
    tax: Math.round(products[4].price * 0.03),
    total: products[4].price + Math.round(products[4].price * 0.03),
    paymentMethod: "Credit Card (HDFC)",
    demoPaymentStatus: "Demo Payment Successful",
    orderStatus: "Confirmed",
    orderDate: "2026-09-06T15:20:00.000Z",
    estimatedDelivery: "10 Sep 2026",
  },
];

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCart(read<CartLine[]>("sj-cart", []));
    setWishlist(read<string[]>("sj-wishlist", []));
    const storedOrders = read<Order[]>("sj-orders", []);
    setOrders(storedOrders.length > 0 ? storedOrders : initialSampleOrders);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem("sj-cart", JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (ready) window.localStorage.setItem("sj-wishlist", JSON.stringify(wishlist));
  }, [wishlist, ready]);

  useEffect(() => {
    if (ready) window.localStorage.setItem("sj-orders", JSON.stringify(orders));
  }, [orders, ready]);

  const value = useMemo<ShopStore>(() => {
    const cartProducts = cart
      .map((line) => {
        const product = products.find((p) => p.id === line.id);
        return product ? { product, qty: line.qty, variant: line.variant } : null;
      })
      .filter((v): v is { product: Product; qty: number; variant?: string } => v !== null);

    const cartSubtotal = cartProducts.reduce((sum, l) => sum + l.product.price * l.qty, 0);
    const cartMrpSavings = cartProducts.reduce(
      (sum, l) => sum + (l.product.mrp ? Math.max(0, l.product.mrp - l.product.price) * l.qty : 0),
      0,
    );
    const cartShipping = 0; // Free insured delivery
    const cartTax = Math.round(cartSubtotal * 0.03); // 3% GST on jewellery
    const cartTotal = cartSubtotal + cartTax + cartShipping;

    return {
      cart,
      wishlist,
      orders,
      quickViewProduct,
      openQuickView: (product) => setQuickViewProduct(product),
      closeQuickView: () => setQuickViewProduct(null),
      addToCart: (id, qty = 1, variant) =>
        setCart((prev) => {
          const matchIndex = prev.findIndex((l) => l.id === id && l.variant === variant);
          if (matchIndex > -1) {
            const updated = [...prev];
            updated[matchIndex] = { ...updated[matchIndex], qty: updated[matchIndex].qty + qty };
            return updated;
          }
          return [...prev, { id, qty, variant }];
        }),
      removeFromCart: (id, variant) =>
        setCart((prev) =>
          prev.filter((l) => !(l.id === id && (variant === undefined || l.variant === variant))),
        ),
      setQty: (id, qty, variant) =>
        setCart((prev) =>
          qty <= 0
            ? prev.filter((l) => !(l.id === id && (variant === undefined || l.variant === variant)))
            : prev.map((l) =>
                l.id === id && (variant === undefined || l.variant === variant) ? { ...l, qty } : l,
              ),
        ),
      clearCart: () => setCart([]),
      toggleWishlist: (id) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id])),
      isWishlisted: (id) => wishlist.includes(id),
      cartCount: cart.reduce((sum, l) => sum + l.qty, 0),
      cartSubtotal,
      cartMrpSavings,
      cartShipping,
      cartTax,
      cartTotal,
      cartProducts,
      addOrder: (newOrder) => setOrders((prev) => [newOrder, ...prev]),
      updateOrderStatus: (orderId, status) =>
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o)),
        ),
      resetOrders: () => setOrders(initialSampleOrders),
    };
  }, [cart, wishlist, orders, quickViewProduct]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
