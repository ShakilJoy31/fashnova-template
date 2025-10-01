"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { slidesMobile } from "@/utils/constant/homeBanner";

export default function BannerMobile() {

  return (
    <section className="md:hidden px-4 py-2">
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".mobile-pagination",
          renderBullet: (index, className) => {
            return `<span class="${className} !w-2.5 !h-2.5 !rounded-full !mx-1 transition-all duration-300"></span>`;
          },
        }}
        modules={[Pagination, Autoplay]}
      >
        {slidesMobile.map((slide, index) => (
          <SwiperSlide key={index}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`rounded-xl shadow-md p-4 flex items-center justify-between relative h-[120px] bg-gradient-to-br ${slide.bgGradient}`}
            >
              {/* Left Text */}
              <div className="flex-1 absolute left-4 z-50 ">
                <h3 className="font-bold text-white text-sm md:text-base truncate">
                  {slide.title}
                </h3>
                <p className="text-gray-300 text-xs md:text-sm truncate">
                  {slide.subtitle}
                </p>
              </div>

              {/* Right Image */}
              <div className="w-32 h-28 flex-shrink-0 absolute right-4">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="mobile-pagination flex justify-center mt-3"></div>

      {/* Custom styles for active bullet */}
      <style jsx global>{`
        .mobile-pagination .swiper-pagination-bullet {
          background: #d1d5db; /* gray-300 */
          opacity: 1;
        }
        .mobile-pagination .swiper-pagination-bullet-active {
          background: #2563eb !important; /* blue-600 */
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}
