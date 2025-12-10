import Image from "next/image";
import React from "react";
import img1 from "../../../public/about-img-3.webp";
import img2 from "../../../public/about-img-4.webp";
import img3 from "../../../public/about-img-5.webp";
import ceoImg from "../../../public/about-author.webp";
import authorSign from "../../../public/author-signature.webp";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import MotionWrapper from "../reusable-components/MotionWrapper";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function AboutSection() {
    const features = [
        "Premium quality products",
        "Fast & free shipping",
        "Secure payment processing",
        "24/7 customer support",
        "Easy returns & exchanges",
        "Sustainable packaging"
    ];

    return (
        <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Images with Modern Layout */}
                    <MotionWrapper direction="left" delay={0.1}>
                        <div className="space-y-6">
                            {/* Main Image */}
                            <div className="relative rounded-2xl overflow-hidden group">
                                <Image
                                    src={img1}
                                    alt="Our Team"
                                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            
                            {/* Secondary Images */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="relative rounded-xl overflow-hidden group">
                                    <Image
                                        src={img2}
                                        alt="Our Process"
                                        className="w-full h-[200px] object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="relative rounded-xl overflow-hidden group">
                                    <Image
                                        src={img3}
                                        alt="Our Products"
                                        className="w-full h-[200px] object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Right Content */}
                    <MotionWrapper direction="right" delay={0.2}>
                        <div className="space-y-8">
                            {/* Header */}
                            <div>
                                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                                    About Our Company
                                </span>
                                <Heading className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                                    Redefining Online
                                    <span className="block text-gray-900 dark:text-white">
                                        Shopping Excellence
                                    </span>
                                </Heading>
                            </div>

                            {/* Main Content */}
                            <div className="space-y-6">
                                <Paragraph className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Founded with a vision to transform the e-commerce landscape, 
                                    we combine innovative technology with exceptional customer 
                                    service to deliver unforgettable shopping experiences.
                                </Paragraph>
                                
                                <Paragraph className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Our commitment to quality, transparency, and customer 
                                    satisfaction has made us a trusted destination for 
                                    millions of shoppers worldwide.
                                </Paragraph>
                            </div>

                            {/* Features Grid */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CEO Section */}
                            <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg">
                                <div className="flex items-start gap-4">
                                    <Image
                                        src={ceoImg}
                                        alt="CEO"
                                        width={80}
                                        height={80}
                                        className="rounded-full object-cover border-4 border-blue-100 dark:border-blue-900"
                                    />
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <Heading className="font-bold text-xl">
                                                    Sarah Johnson
                                                </Heading>
                                                <Paragraph className="text-gray-500 dark:text-gray-400">
                                                    Founder & CEO
                                                </Paragraph>
                                            </div>
                                            <Image
                                                src={authorSign}
                                                alt="CEO signature"
                                                width={100}
                                                height={40}
                                                className="object-contain mt-2 sm:mt-0"
                                            />
                                        </div>
                                        <Paragraph className="mt-4 text-gray-600 dark:text-gray-300 italic">
                                            &ldquo;We believe that every customer deserves an exceptional 
                                            shopping experience. That&apos;s why we&apos;re constantly 
                                            innovating to make online shopping better.&rdquo;
                                        </Paragraph>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
}