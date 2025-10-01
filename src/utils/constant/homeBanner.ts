import { FaLeaf, FaStar, FaTruck, FaShieldAlt, FaRecycle } from "react-icons/fa";
// Example images (replace with your own assets)
import banner1 from "../../../public/Product-image/onion.png";
import banner2 from "../../../public/Product-image/Strawberrie.png";
import banner3 from "../../../public/Product-image/Kale-Sprouts.png";
import banner4 from "../../../public/Product-image/carrots.png";

export const homeBannerOffer = [
  {
    bg: "from-amber-400 to-orange-500",
    icon: FaStar,
    badge: "Pre Offer",
    discount: "50% OFF",
    desc: "Organic Vegetables",
    code: "AUGUST24",
    minSpend: "$200",
    btnColor: "text-amber-600"
  },
  {
    bg: "from-green-500 to-emerald-600",
    icon: FaLeaf,
    badge: "Fresh Deal",
    discount: "30% OFF",
    desc: "All Fruits",
    code: "FRESH30",
    minSpend: "$100",
    btnColor: "text-green-600"
  }
]




export const slides = [
  {
    id: 1,
    title: "Fresh Organic Carrots",
    subtitle: "Vine-Ripened Perfection",
    desc: "Juicy, sun-kissed tomatoes bursting with flavor, harvested at perfect ripeness from our organic farms",
    img: banner4,
    bgGradient: "from-red-500 to-rose-600",
    textColor: "text-white",
    buttonStyle: "bg-white text-red-600 hover:bg-red-50",
    badge: "Farm Fresh"
  },
  {
    id: 1,
    title: "Farm Fresh Organic Vegetables",
    subtitle: "100% Certified Organic",
    desc: "Harvested at peak freshness from our sustainable farms, delivered straight to your doorstep",
    img: banner1,
    bgGradient: "from-emerald-500 to-green-600",
    textColor: "text-white",
    buttonStyle: "bg-white text-emerald-600 hover:bg-emerald-50",
    badge: "Seasonal Special"
  },
  {
    id: 2,
    title: "Sweet Organic Berries",
    subtitle: "Sun-Ripened Perfection",
    desc: "Naturally sweet berries packed with antioxidants and flavor. Perfect for your healthy lifestyle",
    img: banner2,
    bgGradient: "from-rose-500 to-pink-600",
    textColor: "text-white",
    buttonStyle: "bg-white text-rose-600 hover:bg-rose-50",
    badge: "New Harvest"
  },
  {
    id: 3,
    title: "Fresh Microgreens",
    subtitle: "Nutrient-Dense Superfoods",
    desc: "Power-packed microgreens with concentrated vitamins and minerals for optimal health",
    img: banner3,
    bgGradient: "from-teal-500 to-cyan-600",
    textColor: "text-white",
    buttonStyle: "bg-white text-teal-600 hover:bg-teal-50",
    badge: "Limited Stock"
  },
];




export const features = [
    { icon: FaTruck, text: "Free Delivery", subtext: "Over $50" },
    { icon: FaShieldAlt, text: "Quality Guarantee", subtext: "100% Organic" },
    { icon: FaRecycle, text: "Eco Packaging", subtext: "Sustainable" },
    { icon: FaLeaf, text: "Farm Fresh", subtext: "Daily Harvest" },
  ];


  export const slidesMobile = [
    {
      id: 1,
      title: "Best Different Types of Vegetables",
      subtitle: "Quickly aggregate fresh organic produce",
      img: banner1,
      bgGradient: "from-emerald-500 to-green-600",
    },
    {
      id: 2,
      title: "Fresh Organic Carrots",
      subtitle: "Vine-Ripened Perfection",
      img: banner4,
      bgGradient: "from-rose-500 to-pink-600",
    },
    {
      id: 3,
      title: "Sweet Organic Berries",
      subtitle: "Sun-Ripened Perfection",
      img: banner2,
      bgGradient: "from-teal-500 to-cyan-600",
    },
    {
      id: 4,
      title: "Fresh Microgreens",
      subtitle: "Nutrient-Dense Superfoods",
      img: banner3,
      bgGradient: "from-red-500 to-rose-600",
    },
  ];