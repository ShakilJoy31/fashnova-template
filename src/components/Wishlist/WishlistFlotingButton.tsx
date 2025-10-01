"use client";

import { useEffect, useState } from "react";
import { FaHeart, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useWishlist } from "@/hooks/WishlistContext";
import { useRouter } from "next/navigation";
import Button from "../reusable-components/Button";

export default function WishlistFloatingButton() {
  const { items, totalItems } = useWishlist();
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);


  useEffect(() => {
    const checkMobile = () => {
      setIsCollapsed(window.innerWidth < 768)
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // calculate total price
  useEffect(() => {
    const price = items.reduce(
      (acc: number, item) => acc + item.price * (item.quantity ?? 1),
      0
    );
    setTotalPrice(price);
  }, [items]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
    } else {
      router.push("/wishlist");
    }
  };

  if (totalItems === 0) return null;

  return (
    <div
      className={`fixed bottom-1/2 left-0 z-50 transition-all duration-300 ease-in-out ${isCollapsed ? '-translate-x-36' : 'translate-x-0'
        }`}>
      <Button
        onClick={toggleCollapse}
        className={`absolute hover:cursor-pointer right-6 z-60 top-5 -translate-y-1/2 translate-x-8 bg-pink-600 text-white p-2 rounded-r-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-pink-700 ${isCollapsed ? 'opacity-100' : 'opacity-100'
          }`}
      >
        {isCollapsed ? (
          <FaChevronRight className="text-sm text-white" />
        ) : (
          <FaChevronLeft className="text-sm text-white" />
        )}
      </Button>


      {/* Main Wishlist Card */}
      <div
        className={`w-40 rounded-tr-md rounded-br-md overflow-hidden shadow-lg transition-all duration-300 ease-in-out cursor-pointer ${isCollapsed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        onClick={handleClick}
      >
        {/* Top section */}
        <div className="bg-rose-50 flex flex-col items-center py-4">
          <FaHeart className="text-pink-600 text-2xl mb-1" />
          <p className="text-gray-800 text-sm font-medium">
            {totalItems} Items
          </p>
        </div>

        {/* Bottom section */}
        <div className="bg-pink-600 text-center py-3">
          <p className="text-white font-bold text-xl">
            ৳{totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Collapsed State - Thin Line */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out cursor-pointer ${isCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsCollapsed(false)}
      >
        <div className="w-2 h-16 bg-gradient-to-b from-pink-500 to-pink-600 rounded-r-lg shadow-lg"></div>
      </div>
    </div>
  );
}