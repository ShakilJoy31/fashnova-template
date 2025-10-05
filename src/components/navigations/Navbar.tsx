"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiUser, FiHeart, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/CartContext";
import Button from "../reusable-components/Button";
import { useWishlist } from "@/hooks/WishlistContext";
import Link from "next/link";
import { useChat } from "@/hooks/ChatContext";
import { NavberMarque } from "./NavberMarque";
import Image from "next/image";
import homeLogo from "../../../public/fashnova-logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { totalItems } = useCart();
  const { totalItems: wishlistTotalItem } = useWishlist();
  const { setIsChatOpen } = useChat();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
// Close dropdown when clicking outside
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
      setActiveCategory(null);
      setActiveSubcategory(null);
    }
  };

  // Add event listener only when dropdown is open
  if (isDropdownOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isDropdownOpen]); // Add isDropdownOpen as dependency

  const categories = {
    "Men": {
      icon: "👔",
      subcategories: {
        "Clothing": ["T-Shirts", "Shirts", "Jeans", "Trousers", "Shorts", "Suits", "Jackets", "Sweaters"],
        "Footwear": ["Sneakers", "Formal Shoes", "Sports Shoes", "Sandals", "Boots", "Loafers"],
        "Accessories": ["Watches", "Wallets", "Belts", "Sunglasses", "Caps", "Ties", "Cufflinks"],
        "Grooming": ["Perfumes", "Skincare", "Hair Care", "Shaving Kit", "Beard Care"],
        "Sports": ["Activewear", "Gym Shoes", "Sports Accessories", "Fitness Trackers"]
      }
    },
    "Women": {
      icon: "👗",
      subcategories: {
        "Clothing": ["Dresses", "Tops", "Jeans", "Skirts", "Leggings", "Ethnic Wear", "Jumpsuits"],
        "Footwear": ["Heels", "Flats", "Sandals", "Boots", "Sports Shoes", "Wedges"],
        "Accessories": ["Handbags", "Jewelry", "Watches", "Sunglasses", "Scarves", "Hair Accessories"],
        "Beauty": ["Makeup", "Skincare", "Perfumes", "Hair Care", "Bath & Body"],
        "Lingerie": ["Bras", "Panties", "Sleepwear", "Shapewear"]
      }
    },
    "Kids": {
      icon: "👶",
      subcategories: {
        "Boys": ["T-Shirts", "Shirts", "Shorts", "Jeans", "Footwear", "School Uniforms"],
        "Girls": ["Dresses", "Tops", "Skirts", "Leggings", "Footwear", "Party Wear"],
        "Toys": ["Educational Toys", "Action Figures", "Dolls", "Puzzles", "Building Blocks"],
        "Baby Care": ["Diapers", "Feeding", "Bath Time", "Nursery", "Baby Gear"],
        "Accessories": ["Backpacks", "Watches", "Jewelry", "Hair Accessories"]
      }
    },
    "For Pets": {
      icon: "🐾",
      subcategories: {
        "Dogs": ["Food", "Toys", "Grooming", "Apparel", "Beds", "Collars & Leashes"],
        "Cats": ["Food", "Toys", "Litter", "Scratchers", "Beds", "Carriers"],
        "Small Animals": ["Food", "Habitats", "Toys", "Care Products", "Bedding"],
        "Accessories": ["Collars", "Leashes", "Bowls", "Carriers", "Grooming Tools"]
      }
    },
    "For Home": {
      icon: "🏠",
      subcategories: {
        "Furniture": ["Sofas", "Tables", "Chairs", "Storage", "Decor", "Outdoor"],
        "Kitchen": ["Cookware", "Appliances", "Utensils", "Storage", "Serveware"],
        "Bedding": ["Bed Sheets", "Pillows", "Blankets", "Mattresses", "Duvets"],
        "Decor": ["Lighting", "Wall Art", "Plants", "Rugs", "Curtains"],
        "Cleaning": ["Vacuums", "Mops", "Cleaning Supplies", "Organizers"]
      }
    },
    "Beauty Parlor": {
      icon: "💄",
      subcategories: {
        "Makeup": ["Foundation", "Concealer", "Powder", "Blush", "Bronzer", "Highlighter", "Mascara", "Eyeliner", "Eyeshadow", "Lipstick", "Lip Gloss"],
        "Skincare": ["Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen", "Face Mask", "Eye Cream", "Face Oil", "Exfoliator"],
        "Hair Care": ["Shampoo", "Conditioner", "Hair Mask", "Hair Oil", "Hair Serum", "Hair Spray", "Hair Color", "Styling Products"],
        "Fragrances": ["Perfume", "Eau de Toilette", "Body Mist", "Roll-on", "Scented Candles"],
        "Nail Care": ["Nail Polish", "Gel Polish", "Nail Art", "Nail Files", "Cuticle Oil", "Nail Treatments"],
        "Tools & Brushes": ["Makeup Brushes", "Beauty Blenders", "Eyelash Curler", "Tweezers", "Makeup Mirror", "Hair Styling Tools"],
        "Bath & Body": ["Body Wash", "Body Lotion", "Body Scrub", "Bath Bombs", "Shower Gel", "Hand Cream"]
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "#", hasDropdown: true },
    { name: "Shop", href: "/products" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
    { name: "Offers", href: "/offers", isHighlighted: true },
  ];

  const handleCategoryHover = (category: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveCategory(category);
    setActiveSubcategory(Object.keys(categories[category as keyof typeof categories].subcategories)[0]);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setActiveCategory("Men");
      setActiveSubcategory("Clothing");
    } else {
      setActiveCategory(null);
      setActiveSubcategory(null);
    }
  };

  const handleSubcategoryHover = (subcategory: string) => {
    setActiveSubcategory(subcategory);
  };

  // mainCategory: string, subcategory: string, item: string

  const handleCategoryClick = () => {
    setIsDropdownOpen(false);
    setActiveCategory(null);
    setActiveSubcategory(null);
    setIsMenuOpen(false);
    // router.push(`/products?category=${mainCategory}&subcategory=${subcategory}&item=${item}`);
  };

  const handleMobileCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setActiveSubcategory(null);
    } else {
      setActiveCategory(category);
      setActiveSubcategory(Object.keys(categories[category as keyof typeof categories].subcategories)[0]);
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-white"}`}>
      <div className="border-b border-purple-600">
        <NavberMarque
          items={[
            "Free Shipping on Orders Over $50",
            "New Collection Out Now!",
            "Summer Sale - Up to 40% Off",
          ]}
          speed={60}
        />
      </div>

      {/* Main Navigation */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-1">
            {/* Logo */}
            <Image onClick={()=> router.push('/')}
              src={homeLogo}
              alt={'Fashnova Logo'}
              width={64}
              height={64}
              className="w-12 h-12 relative hover:cursor-pointer "
            />

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products (e.g. iPhone, MacBook, Headphones)"
                  className="w-full px-6 py-3 rounded-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full transition-colors duration-200">
                  <FiSearch className="text-lg" />
                </Button>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <Button className="relative flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors duration-200 p-2">
                <FiHeart className="text-xl" />
                <span className="text-sm hidden lg:inline">Wishlist</span>
                <span className={`absolute -top-1 -right-1 ${wishlistTotalItem === 0 ? '' : 'bg-red-500'} text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium`}>
                  {wishlistTotalItem === 0 ? 2 : wishlistTotalItem}
                </span>
              </Button>

              {/* Cart */}
              <Button onClick={() => router.push('/cart')} className="relative flex hover:cursor-pointer items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors duration-200 p-2">
                <FiShoppingCart className="text-xl" />
                <span className="text-sm hidden lg:inline">Cart</span>
                <span className={`absolute -top-1 -right-1 ${totalItems === 0 ? '' : 'bg-red-500'} text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium`}>
                  {totalItems === 0 ? '' : totalItems}
                </span>
              </Button>

              {/* Profile */}
              <button className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-200">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FiUser className="text-white text-sm" />
                </div>
                <span className="text-sm hidden lg:inline">Account</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-1 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 bg-gray-50"
              />
              <FiSearch className="absolute right-3 top-2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="border-b border-gray-100 bg-white" ref={dropdownRef}>
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between py-1 relative">
            <div className="flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <div key={index} className="relative">
                  {link.hasDropdown ? (
                    <div className="relative">
                      <button
                        onClick={handleDropdownToggle}
                        className={`flex hover:cursor-pointer items-center space-x-1 py-2 text-sm font-medium transition-all duration-200 ${isDropdownOpen
                            ? "text-purple-600 font-semibold"
                            : "text-gray-700 hover:text-purple-600"
                          }`}
                      >
                        <span>{link.name}</span>
                        <FiChevronDown className={`text-xs transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                          }`} />
                      </button>

                      {/* Mega Dropdown */}
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                          >
                            <div className="flex h-96">
                              {/* Main Categories Sidebar */}
                              <div className="w-1/3 bg-gradient-to-b from-purple-50 to-white border-r border-gray-200 overflow-y-auto">
                                {Object.entries(categories).map(([category, data]) => (
                                  <button
                                    key={category}
                                    onMouseEnter={() => handleCategoryHover(category)}
                                    onClick={() => handleCategoryHover(category)}
                                    className={`w-full text-left px-6 hover:cursor-pointer py-4 text-sm font-medium transition-all duration-200 border-l-2 ${activeCategory === category
                                        ? "bg-white text-purple-600 border-purple-600 shadow-sm"
                                        : "text-gray-700 border-transparent hover:bg-white hover:text-purple-500 hover:border-purple-400"
                                      }`}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <span className="text-lg">{data.icon}</span>
                                      <span>{category}</span>
                                    </div>
                                  </button>
                                ))}
                              </div>

                              {/* Subcategories Content */}
                              <div className="w-2/3 p-6 overflow-y-auto">
                                {activeCategory && (
                                  <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                                      <span>{categories[activeCategory as keyof typeof categories].icon}</span>
                                      <span>{activeCategory}</span>
                                    </h3>

                                    <div className="grid grid-cols-2 gap-6">
                                      {Object.entries(categories[activeCategory as keyof typeof categories].subcategories).map(([subcategory, items]) => (
                                        <div key={subcategory} className="space-y-3">
                                          <h4
                                            className={`text-sm font-semibold cursor-pointer transition-colors duration-200 ${activeSubcategory === subcategory
                                                ? "text-purple-600"
                                                : "text-gray-800 hover:text-purple-500"
                                              }`}
                                            onMouseEnter={() => handleSubcategoryHover(subcategory)}
                                            onClick={() => handleSubcategoryHover(subcategory)}
                                          >
                                            {subcategory}
                                          </h4>
                                          <div className="space-y-2">
                                            {items.slice(0, 6).map((item) => (
                                              <button
                                                key={item}
                                                onClick={() => handleCategoryClick()}
                                                className="block w-full text-left text-xs text-gray-600 hover:text-purple-500 hover:bg-purple-50 px-2 py-1 rounded transition-all duration-200"
                                              >
                                                {item}
                                              </button>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    {/* View All Button */}
                                    <div className="pt-4 border-t border-gray-200">
                                      <button
                                        onClick={() => handleCategoryClick()}
                                        className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                                      >
                                        View All {activeCategory} Products →
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`relative group py-2 text-sm font-medium transition-colors duration-200 ${link.isHighlighted
                          ? "text-red-600 font-semibold"
                          : "text-gray-700 hover:text-purple-600"
                        }`}
                    >
                      {link.name}
                      {!link.isHighlighted && (
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <Link href="/terms-and-condition" className="hover:underline hover:text-purple-500 transition-colors duration-200">
                Privacy Policy
              </Link>
              <a href="#" className="hover:text-gray-700 transition-colors duration-200">
                Terms & Conditions
              </a>
              <div
                onClick={() => setIsChatOpen(true)}
                className="flex items-center hover:cursor-pointer space-x-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 group"
              >
                <span className="text-purple-500 group-hover:animate-pulse">●</span>
                <span>Live Support</span>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden bg-white border-t border-gray-200"
              >
                <div className="py-4 space-y-4">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      {link.hasDropdown ? (
                        <div className="space-y-2">
                          <button
                            className={`flex items-center justify-between w-full py-3 px-4 rounded-lg transition-colors duration-200 ${link.isHighlighted
                                ? "bg-red-50 text-red-600 font-semibold"
                                : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                              }`}
                            onClick={() => handleMobileCategoryClick("categories")}
                          >
                            <span>{link.name}</span>
                            <FiChevronDown className={`text-xs transition-transform duration-200 ${activeCategory ? "rotate-180" : ""
                              }`} />
                          </button>

                          <AnimatePresence>
                            {activeCategory && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="ml-4 space-y-3 border-l-2 border-purple-200 pl-4"
                              >
                                {Object.entries(categories).map(([category, data]) => (
                                  <div key={category} className="space-y-2">
                                    <button
                                      className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
                                      onClick={() => handleMobileCategoryClick(category)}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <span>{data.icon}</span>
                                        <span className="font-medium">{category}</span>
                                      </div>
                                      <FiChevronRight className={`text-xs transition-transform duration-200 ${activeCategory === category ? "rotate-90" : ""
                                        }`} />
                                    </button>

                                    <AnimatePresence>
                                      {activeCategory === category && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: "auto" }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="ml-4 space-y-3"
                                        >
                                          {Object.entries(data.subcategories).map(([subcategory, items]) => (
                                            <div key={subcategory} className="space-y-2">
                                              <div className="font-semibold text-sm text-gray-800">{subcategory}</div>
                                              <div className="grid grid-cols-2 gap-2">
                                                {items.map((item) => (
                                                  <button
                                                    key={item}
                                                    onClick={() => handleCategoryClick()}
                                                    className="text-xs text-gray-600 hover:text-purple-500 hover:bg-purple-50 py-2 px-3 rounded-lg transition-all duration-200 text-left"
                                                  >
                                                    {item}
                                                  </button>
                                                ))}
                                              </div>
                                            </div>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className={`block py-3 px-4 rounded-lg transition-colors duration-200 ${link.isHighlighted
                              ? "bg-red-50 text-red-600 font-semibold"
                              : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                            }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      Privacy Policy
                    </a>
                    <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      Terms & Conditions
                    </a>
                    <button
                      onClick={() => {
                        setIsChatOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-1 w-full py-2 px-4 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200"
                    >
                      <span className="text-purple-500">●</span>
                      <span>Live Support</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}