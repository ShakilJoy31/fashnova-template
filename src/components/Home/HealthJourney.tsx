"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaSearch, FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";

const fashionFeatures = [
  {
    icon: FaSearch,
    text: "Curated Selection",
    subtext: "Handpicked premium fashion pieces"
  },
  {
    icon: FaShippingFast,
    text: "Express Delivery",
    subtext: "Next day shipping available"
  },
  {
    icon: FaShieldAlt,
    text: "Quality Guarantee",
    subtext: "Premium quality assurance"
  },
  {
    icon: FaHeadset,
    text: "Style Consultation",
    subtext: "Personal styling experts"
  }
];

export default function FashionExperience() {
    const scrollContainerRef = useRef(null);
    const [currentFeature, setCurrentFeature] = useState(0);

    const handleFeatureClick = (index) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const featureWidth = container.children[index].offsetWidth;
            const scrollPosition = featureWidth * index;

            container.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });

            setCurrentFeature(index);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;

        const handleScroll = () => {
            if (container) {
                const scrollLeft = container.scrollLeft;
                const featureWidth = container.children[0].offsetWidth;
                const newIndex = Math.round(scrollLeft / featureWidth);
                setCurrentFeature(newIndex);
            }
        };

        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="container mx-auto py-4 px-2 "
        >
            {/* Luxury Fashion Container */}
            <div className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 lg:p-16 xl:p-20 overflow-hidden">
                
                {/* Abstract Luxury Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                {/* Geometric Accents */}
                <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/30"></div>
                <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-white/30"></div>
                <div className="absolute top-8 left-8 w-2 h-2 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-8 right-8 w-2 h-2 bg-white/20 rounded-full"></div>

                {/* Premium Features Section */}
                <div className="relative mb-16 md:mb-20">
                    <div 
                        className="flex overflow-x-auto pb-6 snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0 scrollbar-hide"
                        ref={scrollContainerRef}
                    >
                        {fashionFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                                whileHover={{ scale: 1.05, y: -8 }}
                                className="text-center group cursor-pointer flex-shrink-0 w-4/5 md:w-auto snap-center md:snap-none mr-6 last:mr-0 md:mr-0"
                                onClick={() => handleFeatureClick(index)}
                            >
                                {/* Luxury Feature Card */}
                                <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:bg-white/15">
                                    {/* Icon Container */}
                                    <div className="relative mb-4">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500">
                                            <feature.icon className="text-white text-2xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                                        </div>
                                        {/* Hover Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                    
                                    {/* Text Content */}
                                    <div className="space-y-2">
                                        <h4 className="font-light text-white text-lg tracking-wide group-hover:tracking-widest transition-all duration-500">
                                            {feature.text}
                                        </h4>
                                        <p className="text-gray-400 text-sm font-light tracking-wide group-hover:text-gray-300 transition-colors duration-500">
                                            {feature.subtext}
                                        </p>
                                    </div>

                                    {/* Active Indicator */}
                                    {currentFeature === index && (
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                                        />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Scroll Indicators */}
                    <div className="flex justify-center mt-8 md:hidden">
                        {fashionFeatures.map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                                    currentFeature === index 
                                        ? 'bg-white scale-125' 
                                        : 'bg-white/30 scale-100'
                                }`}
                            ></motion.div>
                        ))}
                    </div>
                </div>

                {/* Luxury CTA Section */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6">
                        <motion.h3
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight"
                        >
                            Elevate Your
                            <br />
                            <span className="font-normal italic">Style Journey</span>
                        </motion.h3>
                        
                        <motion.p
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-gray-300 text-lg md:text-xl leading-relaxed font-light tracking-wide max-w-2xl"
                        >
                            Join the community of style-conscious individuals who trust us for premium fashion curation and exceptional service.
                        </motion.p>
                    </div>

                    {/* Action Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4 justify-end items-start"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-black px-8 py-4 rounded-lg font-light text-lg tracking-wide transition-all duration-500 flex items-center gap-4 group min-w-[200px] justify-center"
                        >
                            Explore Collection
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.05, borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="border-2 border-white/30 text-white hover:border-white px-8 py-4 rounded-lg font-light text-lg tracking-wide transition-all duration-500 backdrop-blur-md min-w-[200px]"
                        >
                            Style Guide
                        </motion.button>
                    </motion.div>
                </div>

                {/* Bottom Decorative Line */}
                <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                />
            </div>
        </motion.div>
    );
}