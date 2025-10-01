"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { features } from "@/utils/constant/homeBanner";

export default function HealthyJourney() {
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

    // Optional: Update current feature on scroll
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="container mx-auto py-4 "
        >

            <div className="relative bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-4 md:p-6 lg:p-8 xl:p-12 shadow-2xl overflow-hidden">
                

                {/* Scrollable Features Section */}
                <div className="relative mb-8 md:mb-12">
                    <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-2 md:overflow-visible md:pb-0"
                        ref={scrollContainerRef}>
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="text-center group cursor-pointer flex-shrink-0 w-4/5 md:w-auto snap-center md:snap-none mr-4 last:mr-0 md:mr-0"
                                onClick={() => handleFeatureClick(index)}
                            >
                                <div className="flex items-center gap-x-2 bg-white/10 backdrop-blur-sm rounded-2xl p-3 md:bg-transparent md:backdrop-blur-none md:p-0">
                                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                        <feature.icon className="text-white text-2xl" />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-bold text-white text-[12px] lg:text-lg mb-1">{feature.text}</h4>
                                        <p className="text-gray-300 text-[10px] flex justify-start">{feature.subtext}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile scroll indicators */}
                    <div className="flex justify-center mt-4 md:hidden">
                        {features.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full mx-1 ${currentFeature === index ? 'bg-white' : 'bg-white/30'}`}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="text-white">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4">
                            Start Your Healthy Journey Today
                        </h3>
                        <p className="text-emerald-100 text-md md:text-lg leading-relaxed">
                            Join thousands of families who trust us for the freshest, most nutritious organic produce delivered to their doorstep
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-2xl font-bold text-md md:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 justify-center"
                        >
                            Browse Products
                            <FaArrowRight />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-4 py-2 rounded-2xl font-bold text-lg transition-all duration-300"
                        >
                            Learn More
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}