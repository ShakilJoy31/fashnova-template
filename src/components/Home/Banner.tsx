"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLeaf, FaSeedling, FaArrowRight, FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";


import BannerMobile from "./BannerMobile";
import { homeBannerOffer, slides } from "@/utils/constant/homeBanner";


export default function Banner() {


  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden">

      <div className="absolute inset-0">
       
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-pink-300 to-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float delay-1000"></div>
        <div className="absolute top-40 left-4 w-80 h-80 bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float delay-500"></div>
      </div>


      <div>
        <BannerMobile></BannerMobile>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Main Banner Grid */}

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mb-4">
          {/* Hero Carousel - 3/4 width */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="xl:col-span-3"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl hidden md:block">
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                effect="fade"
                speed={1000}
                pagination={{
                  clickable: true,
                  el: ".hero-pagination",
                  renderBullet: (className) => {
                    return `<span class="${className} !w-3 !h-3 !bg-white/80 !mx-1 !rounded-full !transition-all !duration-300 hover:!scale-125"></span>`;
                  },
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                modules={[Pagination, Autoplay, EffectFade]}
                className="hero-swiper"
              >
                {slides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className={`relative min-h-[850px] lg:min-h-[600px] bg-gradient-to-br ${slide.bgGradient}`}>
                      {/* Content */}
                      <div className="absolute inset-0 z-10 flex items-center">
                        <div className="container mx-auto px-4 md:px-6 lg:px-8 ">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                            {/* Text Content */}
                            <motion.div
                              initial={{ opacity: 0, x: -50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className={`${slide.textColor} space-y-6 lg:col-span-2 `}
                            >
                              {/* Badge */}
                              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                                <FaSeedling className="text-white" />
                                <span className="font-semibold text-sm">{slide.badge}</span>
                              </div>

                              {/* Title */}
                              <h1 className="text-3xl md:text-4xl lg:text-6xl font-black leading-tight">
                                {slide.title}
                              </h1>

                              {/* Subtitle */}
                              <p className="lg:text-xl font-semibold opacity-90">
                                {slide.subtitle}
                              </p>

                              {/* Description */}
                              <p className="text-sm lg:text-lg opacity-80 leading-relaxed max-w-2xl">
                                {slide.desc}
                              </p>

                              {/* CTA Button */}
                              <motion.button
                                whileHover={{ scale: 1.05, x: 10 }}
                                whileTap={{ scale: 0.95 }}
                                className={`${slide.buttonStyle} px-8 py-4 rounded-2xl font-bold text-lg w-full lg:w-auto shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 group`}
                              >
                                Shop Now
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                              </motion.button>
                            </motion.div>

                            {/* Image */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="relative h-96 lg:h-[500px] "
                            >
                              <Image
                                src={slide.img}
                                alt={slide.title}
                                fill
                                className="object-contain drop-shadow-2xl w-full"
                                priority
                              />

                              {/* Floating Elements */}
                              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl">
                                <FaStar className="text-white text-2xl" />
                              </div>
                              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                <FaLeaf className="text-white text-4xl" />
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </div>


                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Pagination */}
              <div className="hero-pagination absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex justify-center"></div>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-4 lg:gap-6"
          >
            {homeBannerOffer.map((coupon, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`relative bg-gradient-to-br ${coupon.bg} rounded-2xl p-2 md:p-4 lg:p-6 text-white shadow-2xl overflow-hidden group cursor-pointer`}
              >
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 2px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }}></div>

                <div className="relative z-10">
                  <div className="grid md:flex items-start justify-between mb-2 gap-y-2">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mb-2">
                        <coupon.icon className="text-yellow-300" />
                        {coupon.badge}
                      </div>
                      <h4 className="text-md md:text-xl font-black mb-1">{coupon.discount}</h4>
                      <p className="text-amber-100 text-xs md:text-sm">{coupon.desc}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                        <p className="font-black text-md md:text-lg lg:text-xl ">{coupon.code}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:flex items-center justify-between gap-y-2">
                    <span className="text-amber-100 text-sm">Min. spend {coupon.minSpend}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`bg-white ${coupon.btnColor} px-4 py-2 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      Use Code
                    </motion.button>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </motion.div>
            ))}


            {/* Stats Card for desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-2xl border border-green-100 hidden md:block"
            >
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  <FaSeedling />
                  Trusted By
                </div>
                <h4 className="text-3xl font-black text-gray-900 mb-2">10K+</h4>
                <p className="text-gray-600 text-sm">Happy Families</p>
                <div className="flex justify-center mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="text-amber-400 text-sm mx-0.5" />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .hero-swiper {
          border-radius: 1.5rem;
          overflow: hidden;
        }
        
        .hero-swiper .swiper-pagination-bullet-active {
          background: white !important;
          transform: scale(1.4);
        }
        
        .hero-swiper .swiper-slide {
          opacity: 0 !important;
          transition: opacity 1s ease-in-out;
        }
        
        .hero-swiper .swiper-slide-active {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}