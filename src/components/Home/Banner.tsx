"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaShoppingBag, FaTruck, FaShieldAlt } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { slides } from "@/utils/constant/banner-constant";

export default function Banner() {


  const features = [
    { icon: FaTruck, text: "Free Shipping", subtext: "Above $50" },
    { icon: FaShieldAlt, text: "Secure Payment", subtext: "100% Protected" },
    { icon: FaShoppingBag, text: "Easy Returns", subtext: "30 Days Policy" },
    { icon: FaStar, text: "Premium Quality", subtext: "Guaranteed" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-gradient-to-r from-green-200 to-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      {/* Main Banner */}
      <div className="relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          effect="fade"
          speed={1500}
          pagination={{
            clickable: true,
            el: ".hero-pagination",
            renderBullet: (index, className) => {
              return `<span class="${className} !w-12 !h-1 !bg-white/60 !mx-1 !rounded-full !transition-all !duration-500 hover:!bg-white !scale-110"></span>`;
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[Pagination, Autoplay, EffectFade, Navigation]}
          className="hero-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className={`relative min-h-[50vh] lg:min-h-[60vh] bg-gradient-to-br ${slide.bgGradient} container mx-auto mt-2 `}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2px, transparent 0)`,
                    backgroundSize: '50px 50px'
                  }}></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10">
                  <div className="container mx-auto px-4 h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-12">
                      {/* Text Content */}
                      <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`${slide.textColor} space-y-8 py-8 lg:py-0`}
                      >
                        {/* Badge */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-lg px-6 py-3 rounded-full border border-white/30 shadow-2xl"
                        >
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <span className="font-bold text-sm tracking-wider">{slide.badge}</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1, delay: 0.7 }}
                          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight tracking-tight min-w-48"
                        >
                          <motion.span
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="block"
                          >
                            {slide.title}
                          </motion.span>

                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 1.2 }}
                          className="text-xl md:text-2xl lg:text-3xl font-light opacity-90 tracking-wide"
                        >
                          {slide.subtitle}
                        </motion.p>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 1.4 }}
                          className="text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl font-light">
                          {slide.desc}
                        </motion.p>

                      </motion.div>

                      {/* Image */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                        className="relative h-96 lg:h-full flex items-center justify-center"
                      >
                        <div className="relative w-full h-full max-w-2xl max-h-[600px]">
                          <Image
                            src={slide.img}
                            alt={slide.title}
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />

                          {/* Floating Elements */}
                          <motion.div
                            animate={{
                              y: [0, -20, 0],
                              rotate: [0, 5, 0]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-2xl rotate-12"
                          >
                            <FaStar className="text-white text-2xl" />
                          </motion.div>

                          <motion.div
                            animate={{
                              y: [0, 5, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 1
                            }}
                            className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 flex items-center justify-center shadow-2xl"
                          >
                            <div className="text-center">
                              <div className="text-white font-bold text-2xl">50%</div>
                              <div className="text-white/80 text-sm">OFF</div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* Features Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative bg-white/80 backdrop-blur-lg border-t border-gray-100 shadow-2xl"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 mb-4">
                  <feature.icon className="text-white text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{feature.text}</h3>
                <p className="text-gray-600 text-sm">{feature.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Custom Styles */}
      <style jsx global>{`
        .hero-swiper {
          width: 100%;
          height: 100%;
        }
        
        .hero-swiper .swiper-pagination-bullet {
          transition: all 0.5s ease;
        }
        
        .hero-swiper .swiper-pagination-bullet-active {
          background: white !important;
          transform: scale(1.2);
        }
        
        .hero-swiper .swiper-slide {
          opacity: 0 !important;
          transition: opacity 1.5s ease-in-out;
        }
        
        .hero-swiper .swiper-slide-active {
          opacity: 1 !important;
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          display: none;
        }
      `}</style>
    </section>
  );
}