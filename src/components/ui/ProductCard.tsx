"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ProductCardProps } from "@/types/product/productCardTypes";
import { useCart } from "@/hooks/CartContext";
import { useWishlist } from "@/hooks/WishlistContext";
import { useRouter } from "next/navigation";
import Button from "../reusable-components/Button";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
  imageHeight = "h-48",
  // showCategory = true,
  showRating = true,
  showActions = true,
}) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
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

  return (
    <div
      className={`relative group rounded-[22px] w-full max-w-sm p-[2px] ${className}`}
    >
      {/* Gradient Shadow (now outside overflow clipping) */}
      <div className="absolute -inset-2 rounded-[24px] bg-gradient-to-r from-[#6671AE] via-[#4584A8] to-[#76867A] blur-2xl opacity-0 group-hover:opacity-70 transition duration-500 pointer-events-none" />

      {/* Gradient Border */}
      {/* <div className="absolute inset-0 rounded-[22px] bg-gradient-to-r from-[#6671AE] via-[#4584A8] to-[#76867A]" /> */}

      {/* Card Content */}
      <div className="relative rounded-[20px] bg-white dark:bg-zinc-900 transition-all duration-300">
        {/* Product Image */}
        <div
          onClick={() =>
            router.push(`/products/product-details/${product.slug}`)
          }
          className={`relative w-full ${imageHeight} hover:cursor-pointer rounded-2xl overflow-hidden`}
        >
          <Image
            src={product.imageUrl[0]}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 hover:scale-105 "
          />
        </div>

        {/* Name */}
        <h3
          onClick={() =>
            router.push(`/products/product-details/${product.slug}`)
          }
          className="text-lg font-bold text-neutral-800 dark:text-white mt-2 hover:cursor-pointer line-clamp-1 px-2"
        >
          {product.name}
        </h3>

        {/* Rating */}
        {showRating && product.rating && (
          <div className="flex items-center px-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating!)
                    ? "text-yellow-400"
                    : "text-gray-300"
                  }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Price & Actions */}
        {showActions && (
          <div className="flex justify-between items-center px-2 ">
            {/* Price */}
            <div className="flex items-center">
              <span className="text-lg font-bold text-black dark:text-white">
                ৳{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-500 dark:text-neutral-400 line-through ml-2">
                  ৳{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Wishlist */}
            <Button
              onClick={handleWishlist}
              className="p-2 rounded-full hover:cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isWishlisted ? (
                  <motion.div
                    key="filled"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaHeart size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="outlined"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaRegHeart size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className=" h-10 flex gap-x-[1px]">

          <Button
             onClick={() =>
            router.push(`/products/product-details/${product.slug}`)
          }
            className="w-full h-full hover:cursor-pointer rounded-bl-[22px] text-white flex items-center justify-center space-x-2 bg-gradient-to-r from-green-700 to-pink-700 text-xs font-bold hover:opacity-90 transition-colors" >
            <span>Details</span>
          </Button>

          <Button
            onClick={handleAddToCart}
            className="w-full h-full hover:cursor-pointer rounded-br-[22px] text-white flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-700 to-green-700 text-xs font-bold hover:opacity-90 transition-colors"
          >
            <span>Add to Cart</span>
          </Button>

        </div>

      </div>
    </div>
  );
};

export default ProductCard;
