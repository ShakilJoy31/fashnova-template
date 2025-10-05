"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { ProductCardProps } from "@/types/product/productCardTypes";
import { useCart } from "@/hooks/CartContext";
import { useWishlist } from "@/hooks/WishlistContext";
import { useRouter } from "next/navigation";
import { FaCartArrowDown } from "react-icons/fa";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
  imageHeight = "h-[480px]",
  showRating = true,
}) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/products/product-details/${product.slug}`);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`relative group bg-white rounded-none overflow-hidden flex flex-col h-full ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Main Content */}
      <div className="relative flex-1">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-neutral-50">
          <div
            onClick={() => router.push(`/products/product-details/${product.slug}`)}
            className={`relative w-full ${imageHeight} cursor-pointer bg-white`}
          >
            {/* Image Loading */}
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 animate-pulse" />
            )}

            <Image
              src={product.imageUrl[0]}
              alt={product.name}
              fill
              className={`object-contain transition-all duration-1000 ${isImageLoaded ? 'opacity-100' : 'opacity-0'
                } ${isHovered ? 'scale-105' : 'scale-100'}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => setIsImageLoaded(true)}
              priority
            />

            {/* Overlay Effects */}
            {/* <div className={`absolute inset-0 bg-black transition-all duration-500 ${isHovered ? 'opacity-10' : 'opacity-0'
              }`} /> */}

            {/* Premium Badge */}
            {discount > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute top-2 left-2"
              >
                <div className="bg-purple-600 text-white px-4 py-2 text-sm font-light tracking-widest uppercase">
                  -{discount}%
                </div>
              </motion.div>
            )}

          </div>
        </div>

        {/* Product Info */}
        <div className="p-1 md:p-2 lg:p-3 bg-white flex-1 flex flex-col">
          {/* Category */}
          {product.category && (
            <p className="text-xs text-neutral-500 uppercase tracking-widest font-light mb-2">
              {product.category}
            </p>
          )}

          {/* Product Name */}
          <h3
            onClick={() => router.push(`/products/product-details/${product.slug}`)}
            className="text-xl font-light text-black mb-3 cursor-pointer hover:opacity-70 transition-opacity duration-300 leading-tight"
          >
            {product.name.slice(0, 20)}{product.name.length > 20 ? '...' : ''}
          </h3>

          {/* Rating */}
          {showRating && product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${i < Math.floor(product.rating!)
                      ? "text-black"
                      : "text-neutral-300"
                      }`}
                    size={12}
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-600 font-light">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Price & Actions */}
          <div className="block md:flex items-center justify-between ">
            <div className="flex items-baseline gap-3 mb-4 md:mb-0">
              <span className="text-lg font-light text-black">
                ৳{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-500 line-through font-light">
                  ৳{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ">
              <AnimatePresence mode="wait">
                {isWishlisted ? (
                  <motion.button
                    key="filled"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWishlist}
                    className="w-full md:w-12 h-12 hover:cursor-pointer bg-neutral-100 hover:bg-purple-600 hover:text-white flex items-center justify-center transition-all duration-300 border border-neutral-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <FaHeart size={20} className="text-red-500" />
                  </motion.button>
                ) : (
                  <motion.button
                    key="outlined"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWishlist}
                    className="w-full md:w-12 h-12 hover:cursor-pointer bg-neutral-100 hover:bg-purple-600 hover:text-white flex items-center justify-center transition-all duration-300 border border-neutral-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <FaRegHeart size={20} />
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="w-full md:w-12 h-12 hover:cursor-pointer bg-neutral-100 hover:bg-purple-600 hover:text-white flex items-center justify-center transition-all duration-300 border border-neutral-200"
              >
                <FaCartArrowDown size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* View Details Button - Always at the bottom */}
      <div className="mt-auto p-1 md:p-2 lg:p-3 border-t border-purple-500">
        <motion.button
          whileHover={{ scale: 1.019, backgroundColor: "#800080", color: "#fff" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleViewDetails}
          className="w-full h-12 hover:cursor-pointer bg-neutral-100 hover:bg-black hover:text-white transition-all duration-300 border border-neutral-200 flex items-center justify-center font-light tracking-wide"
        >
          View Details
        </motion.button>
      </div>

      {/* Hover Border Effect */}
      <motion.div
        className="absolute inset-0 border border-neutral-200 pointer-events-none"
        animate={{
          borderColor: isHovered ? "#000" : "#e5e5e5"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProductCard;