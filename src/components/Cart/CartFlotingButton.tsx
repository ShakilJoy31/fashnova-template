"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/CartContext";
import { useRouter } from "next/navigation";
import { FaShoppingBag, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Button from "../reusable-components/Button";

export default function CartFloatingButton() {
  const { items, totalItems } = useCart();
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);
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
      (acc: number, item) => acc + item.price * item.quantity,
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
      router.push("/cart");
    }
  };

  if (totalItems === 0) return null;

  return (
    <div
      className={`fixed bottom-1/2 right-0 z-50 transition-all duration-300 ease-in-out ${isCollapsed ? 'translate-x-36' : 'translate-x-0'
        }`}
    >
      <Button
        onClick={toggleCollapse}
        className={`absolute hover:cursor-pointer left-6 z-60 top-5 -translate-y-1/2 -translate-x-8 bg-green-700 text-white p-2 rounded-l-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-green-800 ${isCollapsed ? 'opacity-100' : 'opacity-100'
          }`}
      >
        {isCollapsed ? (
          <FaChevronLeft className="text-sm" />
        ) : (
          <FaChevronRight className="text-sm" />
        )}
      </Button>

      {/* Main Cart Card */}
      <div
        className={`w-40 rounded-tl-md rounded-bl-md overflow-hidden shadow-lg transition-all duration-300 ease-in-out cursor-pointer ${isCollapsed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        onClick={handleClick}
      >
        {/* Top section */}
        <div className="bg-blue-50 flex flex-col items-center py-4">
          <FaShoppingBag className="text-green-600 text-2xl mb-1" />
          <p className="text-gray-800 text-sm font-medium">{totalItems} Items</p>
        </div>

        {/* Bottom section */}
        <div className="bg-green-700 text-center py-3">
          <p className="text-white font-bold text-xl">
            ৳{totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Collapsed State - Thin Line */}
      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out cursor-pointer ${isCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsCollapsed(false)}
      >
        <div className="w-2 h-16 bg-gradient-to-b from-green-600 to-green-700 rounded-l-lg shadow-lg"></div>
      </div>
    </div>
  );
}