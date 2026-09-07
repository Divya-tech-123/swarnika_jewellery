import gold from "@/assets/cat-gold.jpg";
import diamond from "@/assets/cat-diamond.jpg";
import bridal from "@/assets/cat-bridal.jpg";
import necklaces from "@/assets/cat-necklaces.jpg";
import earrings from "@/assets/cat-earrings.jpg";
import bangles from "@/assets/cat-bangles.jpg";
import rings from "@/assets/cat-rings.jpg";
import mangalsutra from "@/assets/cat-mangalsutra.jpg";

export const images = {
  gold,
  diamond,
  bridal,
  necklaces,
  earrings,
  bangles,
  rings,
  mangalsutra,
};

export type Category = {
  name: string;
  image: string;
  to: string;
  count: string;
};

export const categories: Category[] = [
  { name: "Gold Jewellery", image: gold, to: "/gold-jewellery", count: "240+ designs" },
  { name: "Diamond Jewellery", image: diamond, to: "/diamond-jewellery", count: "180+ designs" },
  { name: "Bridal Jewellery", image: bridal, to: "/bridal", count: "90+ sets" },
  { name: "Necklaces", image: necklaces, to: "/collections", count: "150+ designs" },
  { name: "Earrings", image: earrings, to: "/collections", count: "210+ designs" },
  { name: "Bangles", image: bangles, to: "/collections", count: "120+ designs" },
  { name: "Rings", image: rings, to: "/collections", count: "170+ designs" },
  { name: "Mangalsutra", image: mangalsutra, to: "/collections", count: "60+ designs" },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  mrp?: number;
  rating: number;
  reviews: number;
  image: string;
  purity: string;
  weight: string;
  tags: ("bestseller" | "new" | "offer" | "gold" | "diamond" | "bridal")[];
  description: string;
};

export const products: Product[] = [
  {
    id: "kanchi-temple-haram",
    name: "Kanchi Temple Gold Haram",
    category: "Necklaces",
    price: 184500,
    mrp: 199000,
    rating: 4.8,
    reviews: 214,
    image: necklaces,
    purity: "22K BIS Hallmarked",
    weight: "38.420 g",
    tags: ["bestseller", "gold", "offer"],
    description:
      "A South Indian temple-inspired haram with layered domes and hand-finished granulation, made for weddings and family ceremonies.",
  },
  {
    id: "lakshmi-bridal-set",
    name: "Lakshmi Bridal Necklace Set",
    category: "Bridal",
    price: 312000,
    rating: 4.9,
    reviews: 168,
    image: bridal,
    purity: "22K BIS Hallmarked",
    weight: "62.180 g",
    tags: ["bestseller", "bridal", "gold"],
    description:
      "A complete bridal ensemble with choker, long haram, jhumkas and maang tikka in uncut stone and pearl detailing.",
  },
  {
    id: "pearl-jhumka",
    name: "Antique Pearl Jhumkas",
    category: "Earrings",
    price: 46800,
    mrp: 52000,
    rating: 4.7,
    reviews: 342,
    image: earrings,
    purity: "22K BIS Hallmarked",
    weight: "9.640 g",
    tags: ["bestseller", "new", "gold", "offer"],
    description:
      "Featherlight jhumkas with a hand-set stone crown and freshwater pearl drops — comfortable enough for all-day wear.",
  },
  {
    id: "meena-bangles",
    name: "Meena Work Bangle Pair",
    category: "Bangles",
    price: 128900,
    rating: 4.6,
    reviews: 121,
    image: bangles,
    purity: "22K BIS Hallmarked",
    weight: "26.100 g",
    tags: ["bestseller", "gold"],
    description:
      "A pair of broad bangles with enamel meena work and stone-set florals, finished in an antique matte tone.",
  },
  {
    id: "solitaire-promise-ring",
    name: "Solitaire Promise Ring",
    category: "Rings",
    price: 74500,
    mrp: 82000,
    rating: 4.9,
    reviews: 289,
    image: rings,
    purity: "18K Gold · IGI Certified",
    weight: "3.180 g",
    tags: ["new", "diamond", "offer"],
    description:
      "A 0.35ct certified centre solitaire held in four claws, with pavé shoulders that catch light from every angle.",
  },
  {
    id: "everyday-diamond-pendant",
    name: "Everyday Diamond Pendant",
    category: "Diamond",
    price: 38900,
    rating: 4.8,
    reviews: 407,
    image: diamond,
    purity: "18K Gold · IGI Certified",
    weight: "2.040 g",
    tags: ["new", "diamond"],
    description:
      "A marquise halo pendant on a fine cable chain — light, layered and made for daily wear.",
  },
  {
    id: "ganesha-mangalsutra",
    name: "Ganesha Mangalsutra",
    category: "Mangalsutra",
    price: 29800,
    mrp: 34000,
    rating: 4.7,
    reviews: 256,
    image: mangalsutra,
    purity: "22K BIS Hallmarked",
    weight: "6.720 g",
    tags: ["new", "gold", "offer"],
    description:
      "Traditional black beads with gold spacers and a Ganesha pendant, sized for comfortable everyday wear.",
  },
  {
    id: "classic-gold-choker",
    name: "Classic Gold Choker",
    category: "Necklaces",
    price: 96400,
    rating: 4.6,
    reviews: 98,
    image: gold,
    purity: "22K BIS Hallmarked",
    weight: "21.360 g",
    tags: ["new", "gold"],
    description:
      "A festive choker with teardrop motifs and a fringe of gold beads — a versatile piece for receptions and pujas.",
  },
];

export const bestSellers = products.filter((p) => p.tags.includes("bestseller"));
export const newArrivals = products.filter((p) => p.tags.includes("new"));
export const offerProducts = products.filter((p) => p.tags.includes("offer"));

export const occasions = [
  { name: "Wedding", image: bridal, note: "Complete bridal sets" },
  { name: "Engagement", image: rings, note: "Solitaires & bands" },
  { name: "Festivals", image: gold, note: "Festive gold picks" },
  { name: "Daily Wear", image: diamond, note: "Light & lasting" },
  { name: "Gifting", image: earrings, note: "Under ₹50,000" },
];

export const testimonials = [
  {
    name: "Sravani Reddy",
    city: "Hyderabad",
    rating: 5,
    review:
      "I bought my wedding set here and the finishing was better than what I saw in showrooms. The team helped me pick sizes over a video call.",
    purchased: "Lakshmi Bridal Necklace Set",
  },
  {
    name: "Anitha Varma",
    city: "Vijayawada",
    rating: 5,
    review:
      "The jhumkas are so light that I wore them the whole reception without any pain. Packaging felt genuinely premium.",
    purchased: "Antique Pearl Jhumkas",
  },
  {
    name: "Kiran Kumar",
    city: "Bengaluru",
    rating: 4,
    review:
      "Ordered a solitaire for our anniversary. Certificate and hallmark details were all clear, and delivery came two days early.",
    purchased: "Solitaire Promise Ring",
  },
  {
    name: "Divya Lakshmi",
    city: "Chennai",
    rating: 5,
    review:
      "Exchanged a bangle for a bigger size without any fuss. That trust is why I keep coming back for family gifting.",
    purchased: "Meena Work Bangle Pair",
  },
];

export const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
