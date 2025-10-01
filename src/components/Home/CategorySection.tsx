// components/Home/CategorySection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaHeart, FaShoppingCart, FaRegHeart, FaLeaf, FaSeedling } from "react-icons/fa";
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
    <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-4 overflow-hidden">
      {/* Abstract Organic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-green-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-amber-200 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-rose-200 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-green-200 mb-6"
          >
            <div className="flex gap-1">
              <FaLeaf className="text-green-500 animate-bounce" />
              <FaSeedling className="text-emerald-500 animate-bounce delay-100" />
              <FaLeaf className="text-lime-500 animate-bounce delay-200" />
            </div>
            <span className="text-green-800 font-bold text-sm uppercase tracking-wider">100% Organic & Fresh</span>
          </motion.div>
          
          <Heading className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 mb-6 leading-tight">
            Farm to Table
          </Heading>
          
          <Paragraph className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover the purest organic produce, harvested at peak freshness and delivered directly from our sustainable farms to nourish your family
          </Paragraph>
        </motion.div>

        {/* Enhanced Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={() => scrollCategories('left')}
              className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-green-600" />
            </Button>
            
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-green-800">Browse Categories</h3>
            
            <Button
              onClick={() => scrollCategories('right')}
              className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-green-600" />
            </Button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4 px-4 py-6 scroll-smooth">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateCategory(cat.name)}
                className={`flex-shrink-0 cursor-pointer group relative ${
                  activeCategory === cat.name ? '' : ''
                }`}
              >
                <div className={`w-24 h-20 rounded-3xl p-1 transition-all duration-500 ${
                  activeCategory === cat.name 
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-2xl' 
                    : 'bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl'
                }`}>
                  <div className={`w-full h-full rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-500 ${
                    activeCategory === cat.name ? 'bg-white' : 'bg-gradient-to-br from-green-50 to-emerald-100'
                  }`}>
                    <div className={`text-2xl transition-colors duration-500 ${
                      activeCategory === cat.name ? 'text-green-600' : 'text-green-500'
                    }`}>
                      <FaLeaf />
                    </div>
                    <span className={`font-semibold text-center text-sm px-2 transition-colors duration-500 ${
                      activeCategory === cat.name ? 'text-green-700' : 'text-gray-700'
                    }`}>
                      {cat.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Revolutionary Product Showcase */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-20">
          {/* Interactive Featured Product */}
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-2xl overflow-hidden border border-green-200">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, green 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div 
                  onClick={() => router.push(`/products/product-details/${selectedProduct.slug}`)}
                  className="relative cursor-pointer group"
                >
                  {/* Product Image with Organic Frame */}
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src={selectedProduct.imageUrl[0] || "/placeholder.jpg"}
                      alt={selectedProduct.name}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Organic Certification Overlay */}
                    <div className="absolute top-2 left-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                        <FaLeaf className="text-white" />
                        CERTIFIED ORGANIC
                      </div>
                    </div>

                    {/* Floating Price Tag */}
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-2xl shadow-2xl">
                        <div className="text-md md:text-2xl font-black">${selectedProduct.price}</div>
                        {selectedProduct.originalPrice && (
                          <div className="text-xs line-through opacity-80">${selectedProduct.originalPrice}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Heading className="text-lg md:text-xl lg:text-3xl font-black text-gray-900 mb-2">
                          {selectedProduct.name}
                        </Heading>
                        <Paragraph className="text-gray-600 text-lg leading-relaxed">
                          {selectedProduct.description.substring(0, 120)}...
                        </Paragraph>
                      </div>
                    </div>

                    {/* Rating and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-full">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'stroke-current'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-green-800">
                            ({selectedProduct.reviewCount})
                          </span>
                        </div>
                      </div>

                     
                    </div>

                     <div className="gap-3 relative flex gap-x-2 mt-2 ">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(selectedProduct);
                          }}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                        >
                          <FaShoppingCart />
                          Add to Cart
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWishlist(selectedProduct);
                          }}
                          className="p-3 rounded-2xl border-2 border-green-200 hover:border-green-300 bg-white hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl"
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
                                <FaHeart className="text-rose-500 text-xl" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="outlined"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <FaRegHeart className="text-green-600 text-xl" />
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
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer"
              >
                <div className="relative bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-green-200">
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.imageUrl[0] || "/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <FaShoppingCart className="w-4 h-4 text-green-600" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWishlist(product);
                        }}
                        className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
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
                              <FaHeart className="w-4 h-4 text-rose-500" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="outlined"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FaRegHeart className="w-4 h-4 text-green-600" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Heading className="font-bold text-gray-900 text-lg line-clamp-1">
                        {product.name}
                      </Heading>
                      <div className="text-lg font-black text-green-600">
                        ${product.price}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                      </div>
                      
                      <div className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                        {product.category}
                      </div>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedProduct?.id === product.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            
            
            <Heading className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-4">
              Ready to Taste the Difference?
            </Heading>
            <Paragraph className="text-green-100 text-md md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of families who have transformed their health with our farm-fresh organic produce
            </Paragraph>
            
            <Button 
              onClick={() => router.push('/products')}
              className="bg-white text-green-600 hover:bg-green-50 hover:cursor-pointer px-6 py-3 w-full md:w-auto rounded-2xl font-black text-md lg:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              Explore All Products
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}