// components/Home/CategorySection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaHeart, FaShoppingCart, FaRegHeart, FaPlus } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "../reusable-components/Button";
import { Product } from "@/types/product/productCardTypes";
import { getProductsByCategory } from "@/utils/helper/dataFetcher";
import DataLoader from "../reusable-components/DataLoader";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/hooks/CartContext";
import { useWishlist } from "@/hooks/WishlistContext";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";

interface Category {
  name: string;
}

interface CategorySectionProps {
  categories: Category[];
  categoryProducts: Product[];
  defaultCategory: string;
}

export default function CategorySection({
  categories,
  categoryProducts,
  defaultCategory
}: CategorySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const urlCategory = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(urlCategory || defaultCategory);
  const [products, setProducts] = useState<Product[]>(categoryProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    categoryProducts.length > 0 ? categoryProducts[0] : null
  );
  const [loading, setLoading] = useState(false);

  const updateCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category);
    router.replace(`/?${params.toString()}`, { scroll: false });
    setActiveCategory(category);
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const categoryProducts = await getProductsByCategory(activeCategory);
        setProducts(categoryProducts);
        if (categoryProducts.length > 0) {
          setSelectedProduct(categoryProducts[0]);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [activeCategory]);

  const handleWishlist = (selectProduct: Product) => {
    if (isInWishlist(selectProduct.id)) {
      removeFromWishlist(selectProduct.id);
    } else {
      addToWishlist(selectProduct);
    }
  };

  const handleAddToCart = (cartProduct: Product) => {
    addToCart(cartProduct, 1);
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = 300;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center my-6"><DataLoader /></div>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-neutral-100 py-20 overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-black/5 to-transparent rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-black/3 to-transparent rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Luxury Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          {/* Luxury Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full mb-8"
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-sm font-light tracking-[0.3em] uppercase">New Collection</span>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </motion.div>
          
          <Heading className="text-5xl md:text-6xl lg:text-8xl font-light text-black mb-8 tracking-tight">
            ELEVATE
            <br />
            <span className="font-normal italic">YOUR STYLE</span>
          </Heading>
          
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            Discover curated collections that redefine modern elegance. Each piece is crafted with precision and designed for the contemporary individual.
          </Paragraph>
        </motion.div>

        {/* Luxury Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <div className="flex items-center justify-between mb-12">
            <Button
              onClick={() => scrollCategories('left')}
              className="p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:bg-black hover:text-white group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </Button>
            
            <h3 className="text-xl font-light text-gray-500 tracking-widest uppercase">Collections</h3>
            
            <Button
              onClick={() => scrollCategories('right')}
              className="p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:bg-black hover:text-white group"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </Button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-8 px-4 py-8 scroll-smooth"
          >
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateCategory(cat.name)}
                className="flex-shrink-0 cursor-pointer group"
              >
                <div className={`relative transition-all duration-500 ${
                  activeCategory === cat.name ? 'scale-110' : ''
                }`}>
                  {/* Category Card */}
                  <div className={`w-48 h-60 rounded-2xl p-0.5 transition-all duration-500 ${
                    activeCategory === cat.name 
                      ? 'bg-gradient-to-br from-black via-gray-800 to-gray-900 shadow-2xl' 
                      : 'bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg'
                  }`}>
                    <div className={`w-full h-full rounded-[14px] flex flex-col items-center justify-center gap-6 transition-all duration-500 ${
                      activeCategory === cat.name ? 'bg-black' : 'bg-white'
                    }`}>
                      {/* Icon */}
                      <div className={`text-3xl transition-all duration-500 ${
                        activeCategory === cat.name ? 'text-white' : 'text-gray-400'
                      } group-hover:scale-110`}>
                        <FaPlus />
                      </div>
                      
                      {/* Category Name */}
                      <div className="text-center">
                        <span className={`text-lg font-light transition-colors duration-500 ${
                          activeCategory === cat.name ? 'text-white' : 'text-gray-800'
                        } tracking-wide`}>
                          {cat.name}
                        </span>
                        <div className={`w-8 h-px mx-auto mt-3 transition-all duration-500 ${
                          activeCategory === cat.name ? 'bg-white scale-100' : 'bg-gray-300 scale-50'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Active Indicator */}
                  {activeCategory === cat.name && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rounded-full"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Luxury Product Showcase */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 mb-24">
          {/* Featured Product Showcase */}
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl overflow-hidden">
                {/* Minimalist Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>

                <div 
                  onClick={() => router.push(`/products/product-details/${selectedProduct.slug}`)}
                  className="relative cursor-pointer group"
                >
                  {/* Luxury Product Image */}
                  <div className="relative h-[600px] overflow-hidden bg-gray-50">
                    <Image
                      src={selectedProduct.imageUrl[0] || "/placeholder.jpg"}
                      alt={selectedProduct.name}
                      fill
                      className="object-contain transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 1200px) 100vw, 50vw"
                    />
                    
                    {/* Luxury Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Luxury Badges */}
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-light tracking-wider shadow-lg">
                        FEATURED
                      </div>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute top-6 right-6">
                      <div className="text-right">
                        <div className="text-3xl font-light text-black bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                          ${selectedProduct.price}
                        </div>
                        {selectedProduct.originalPrice && (
                          <div className="text-sm text-gray-500 line-through mt-1 bg-white/70 px-2 py-1 rounded">
                            ${selectedProduct.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Luxury Product Details */}
                  <div className="p-12">
                    <div className="mb-8">
                      <Heading className="text-4xl font-light text-black mb-4 tracking-wide">
                        {selectedProduct.name}
                      </Heading>
                      <Paragraph className="text-gray-600 text-lg leading-relaxed font-light">
                        {selectedProduct.description.substring(0, 150)}...
                      </Paragraph>
                    </div>

                    {/* Rating and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                          <div className="flex text-black">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'stroke-current stroke-1'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-light text-gray-600">
                            ({selectedProduct.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Luxury Action Buttons */}
                    <div className="flex gap-4 mt-8">
                      <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: "#000" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(selectedProduct);
                        }}
                        className="flex-1 bg-black text-white px-8 py-4 rounded-lg font-light tracking-wide hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                      >
                        <FaShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02, borderColor: "#000" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWishlist(selectedProduct);
                        }}
                        className="p-4 rounded-lg border-2 border-gray-200 hover:border-black bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {isInWishlist(selectedProduct.id) ? (
                            <motion.div
                              key="filled"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <FaHeart className="text-black w-5 h-5" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="outlined"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <FaRegHeart className="text-gray-600 w-5 h-5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Product Grid Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  {/* Product Image */}
                  <div className="relative h-80 overflow-hidden bg-gray-50">
                    <Image
                      src={product.imageUrl[0] || "/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                    
                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <FaShoppingCart className="w-4 h-4 text-gray-700" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWishlist(product);
                        }}
                        className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {isInWishlist(product.id) ? (
                            <motion.div
                              key="filled"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FaHeart className="w-4 h-4 text-black" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="outlined"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FaRegHeart className="w-4 h-4 text-gray-700" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>

                    {/* View Details Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/products/product-details/${product.slug}`);
                      }}
                      className="absolute bottom-4 left-4 right-4 bg-black text-white py-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 font-light tracking-wide"
                    >
                      Quick View
                    </motion.button>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Heading className="font-light text-gray-900 text-xl line-clamp-1 tracking-wide">
                        {product.name}
                      </Heading>
                      <div className="text-xl font-light text-black">
                        ${product.price}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex text-black">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current stroke-1'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                      </div>
                      
                      <div className="text-xs font-light text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {product.category}
                      </div>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedProduct?.id === product.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Luxury CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-black rounded-3xl p-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 2px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            <Heading className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide">
              Ready to Redefine Your Style?
            </Heading>
            <Paragraph className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Explore our complete collection of premium fashion pieces designed for the modern individual.
            </Paragraph>
            
            <Button 
              onClick={() => router.push('/products')}
              className="bg-white text-black hover:bg-gray-100 hover:cursor-pointer px-12 py-4 rounded-lg font-light text-lg tracking-wide shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              Discover Collection
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}