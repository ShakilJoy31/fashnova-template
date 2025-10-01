"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiUser, FiHeart, FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { FaLeaf } from "react-icons/fa";
import { useCart } from "@/hooks/CartContext";
import Button from "../reusable-components/Button";
import { useWishlist } from "@/hooks/WishlistContext";
import Link from "next/link";
import { useChat } from "@/hooks/ChatContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { totalItems } = useCart();
  const { totalItems: wishlistTotalItem } = useWishlist();
  const { setIsChatOpen } = useChat();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "#", hasDropdown: true },
    { name: "Shop", href: "/products" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
    { name: "Offers", href: "/offers", isHighlighted: true },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-white"
      }`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm py-2 hidden lg:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className="text-green-400">📞</span>
            <span>24/7 Support: </span>
            <span className="text-green-400 font-semibold">+099949343</span>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-4">
              <Link href="/about-us" className="hover:text-green-400 transition-colors duration-200">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-green-400 transition-colors duration-200">
                Contact Us
              </Link>
              <Link href="/" className="hover:text-green-400 transition-colors duration-200">
                My Account
              </Link>
            </div>
            <div className="h-4 w-px bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <span>🌐 English</span>
              <FiChevronDown className="text-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-1">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => router.push("/")}
              className="cursor-pointer flex-shrink-0"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-600 p-2 rounded-full">
                  <FaLeaf className="text-white text-2xl" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">Gramer Hat</h1>
                  <p className="text-xs text-gray-500">The Organic Food</p>
                </div>
              </div>
            </motion.div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products (e.g. iPhone, MacBook, Headphones)"
                  className="w-full px-6 py-3 rounded-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-200">
                  <FiSearch className="text-lg" />
                </button>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <Button className="relative flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200 p-2">
                <FiHeart className="text-xl" />
                <span className="text-sm hidden lg:inline">Wishlist</span>
                <span className={`absolute -top-1 -right-1 ${wishlistTotalItem === 0 ? '' : 'bg-red-500'}  text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium`}>
                  {wishlistTotalItem === 0 ? 2 : wishlistTotalItem}
                </span>
              </Button>

              {/* Cart */}
              <Button onClick={()=> router.push('/cart')} className="relative flex hover:cursor-pointer items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200 p-2">
                <FiShoppingCart className="text-xl" />
                <span className="text-sm hidden lg:inline">Cart</span>
                <span className={`absolute -top-1 -right-1 ${totalItems === 0 ? '' : 'bg-red-500'}  text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium`}>
                  {totalItems === 0 ? '' : totalItems}
                </span>
              </Button>

              {/* Profile */}
              <button className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-200">
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
                className="w-full px-4 py-1 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 bg-gray-50"
              />
              <FiSearch className="absolute right-3 top-2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between py-1">
            <div className="flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`relative group py-2 text-sm font-medium transition-colors duration-200 ${link.isHighlighted
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-green-600"
                    }`}
                >
                  {link.name}
                  {link.hasDropdown && <FiChevronDown className="inline ml-1 text-xs" />}

                  {/* Hover underline effect */}
                  {!link.isHighlighted && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <Link href="/terms-and-condition" className="hover:underline hover:text-green-500 transition-colors duration-200">
                Privacy Policy
              </Link>
              <a href="#" className="hover:text-gray-700 transition-colors duration-200">
                Terms & Conditions
              </a>
              <div 
                onClick={() => setIsChatOpen(true)}
                className="flex items-center hover:cursor-pointer space-x-1 bg-gray-100 px-3 py-1 rounded-full hover:bg-green-50 hover:text-green-600 transition-all duration-200 group"
              >
                <span className="text-green-500 group-hover:animate-pulse">●</span>
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
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`block py-2 px-4 rounded-lg transition-colors duration-200 ${link.isHighlighted
                          ? "bg-red-50 text-red-600 font-semibold"
                          : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                      {link.hasDropdown && <FiChevronDown className="inline ml-2 text-xs" />}
                    </Link>
                  ))}

                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      Privacy Policy
                    </a>
                    <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      Terms & Conditions
                    </a>
                    <div 
                      onClick={() => {
                        setIsChatOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-1 py-2 px-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                      <span className="text-green-500">●</span>
                      <span>Live Support</span>
                    </div>
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