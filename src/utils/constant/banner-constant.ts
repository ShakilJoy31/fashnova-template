import { FaLeaf, FaStar, FaTruck, FaShieldAlt, FaRecycle } from "react-icons/fa";
// Example images (replace with your own assets)
import banner1 from "../../../public/fashion-image/men-with-sunglass.png";
import banner2 from "../../../public/fashion-image/women-with-hat.png";
import banner3 from "../../../public/fashion-image/enjoying-lovely-music.png";
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
      title: "Elevate Your Style",
      subtitle: "Premium Collection",
      desc: "Discover the latest trends in fashion with our exclusive collection. Quality meets style in every piece.",
      badge: "New Arrival",
      bgGradient: "from-purple-900 via-pink-800 to-rose-900",
      textColor: "text-white",
      buttonStyle: "bg-white text-purple-900 hover:bg-gray-100",
      img: banner1
    },
    {
      id: 2,
      title: "Summer Essentials",
      subtitle: "Hot Deals",
      desc: "Get ready for summer with our curated collection of must-have items at unbeatable prices.",
      badge: "50% OFF",
      bgGradient: "from-blue-900 via-cyan-800 to-teal-900",
      textColor: "text-white",
      buttonStyle: "bg-orange-500 text-white hover:bg-orange-600",
      img: banner2
    },
    {
      id: 3,
      title: "Luxury Redefined",
      subtitle: "Exclusive Edition",
      desc: "Experience luxury like never before with our limited edition designer collections.",
      badge: "Limited",
      bgGradient: "from-gray-900 via-gray-800 to-gray-700",
      textColor: "text-white",
      buttonStyle: "bg-gold-500 text-gray-900 hover:bg-gold-600",
      img: banner3
    }
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