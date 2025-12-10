import Image from "next/image";
import React from "react";
import bannerImg from "../../../public/about-us-banner.jpg";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";

export default function AboutBanner() {
  return (
    <section className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src={bannerImg}
          alt="About Our Company"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 bg-blue-600 rounded-full mb-4">
            <span className="text-sm font-semibold tracking-wider uppercase">
              Our Story
            </span>
          </div>
          
          <Heading className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Crafting Exceptional
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Shopping Experiences
            </span>
          </Heading>
          
          <Paragraph className="mt-6 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            We&apos;re redefining online shopping by combining cutting-edge technology 
            with unparalleled customer service to bring you the finest products 
            from around the world.
          </Paragraph>
          
          {/* Stats Preview */}
          <div className="flex justify-center gap-8 mt-8 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">10K+</div>
              <div className="text-sm opacity-80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">5★</div>
              <div className="text-sm opacity-80">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">24/7</div>
              <div className="text-sm opacity-80">Support</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}