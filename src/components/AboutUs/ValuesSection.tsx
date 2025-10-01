import React from "react";
import { 
    HeartIcon, 
    ShieldCheckIcon, 
    RocketLaunchIcon, 
    SparklesIcon 
} from "@heroicons/react/24/outline";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import MotionWrapper from "../reusable-components/MotionWrapper";

const values = [
    {
        icon: HeartIcon,
        title: "Customer First",
        description: "Every decision we make is with our customers in mind. Your satisfaction is our ultimate goal.",
        color: "text-red-500"
    },
    {
        icon: ShieldCheckIcon,
        title: "Trust & Security",
        description: "We prioritize the security of your data and transactions with enterprise-grade protection.",
        color: "text-blue-500"
    },
    {
        icon: RocketLaunchIcon,
        title: "Innovation",
        description: "Constantly evolving to bring you the latest technology and shopping experiences.",
        color: "text-purple-500"
    },
    {
        icon: SparklesIcon,
        title: "Quality",
        description: "Curated selection of premium products that meet our rigorous quality standards.",
        color: "text-yellow-500"
    }
];

export default function ValuesSection() {
    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <MotionWrapper direction="up" delay={0.1}>
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                            Our Values
                        </span>
                        <Heading className="mt-4 text-4xl md:text-5xl font-bold">
                            What Drives Us Forward
                        </Heading>
                        <Paragraph className="mt-6 text-xl text-gray-600 dark:text-gray-300">
                            These core principles guide everything we do and shape 
                            the exceptional experience we deliver to our customers.
                        </Paragraph>
                    </MotionWrapper>
                </div>

                {/* Values Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <MotionWrapper 
                            key={index} 
                            direction="up" 
                            delay={0.1 + index * 0.1}
                        >
                            <div className="group text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-gray-700 group-hover:scale-110 transition-transform duration-300 ${value.color} mb-6`}>
                                    <value.icon className="w-8 h-8" />
                                </div>
                                <Heading className="text-xl font-bold mb-4">
                                    {value.title}
                                </Heading>
                                <Paragraph className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {value.description}
                                </Paragraph>
                            </div>
                        </MotionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}