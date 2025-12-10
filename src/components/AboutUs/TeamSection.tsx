import React from "react";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";
import MotionWrapper from "../reusable-components/MotionWrapper";

const team = [
    {
        name: "Sarah Johnson",
        role: "Founder & CEO",
        image: "/team-1.jpg",
        description: "Visionary leader with 10+ years in e-commerce"
    },
    {
        name: "Mike Chen",
        role: "CTO",
        image: "/team-2.jpg",
        description: "Tech innovator and software architecture expert"
    },
    {
        name: "Emily Davis",
        role: "Head of Customer Experience",
        image: "/team-3.jpg",
        description: "Customer satisfaction champion"
    },
    {
        name: "Alex Rodriguez",
        role: "Product Director",
        image: "/team-4.jpg",
        description: "Curator of exceptional products"
    }
];

export default function TeamSection() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <MotionWrapper direction="up" delay={0.1}>
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                            Our Team
                        </span>
                        <Heading className="mt-4 text-4xl md:text-5xl font-bold">
                            Meet The Experts
                        </Heading>
                        <Paragraph className="mt-6 text-xl text-gray-600 dark:text-gray-300">
                            Passionate professionals dedicated to delivering 
                            exceptional shopping experiences every day.
                        </Paragraph>
                    </MotionWrapper>
                </div>

                {/* Team Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <MotionWrapper 
                            key={index} 
                            direction="up" 
                            delay={0.1 + index * 0.1}
                        >
                            <div className="group text-center bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                {/* Avatar */}
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg group-hover:scale-110" />
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-600 group-hover:scale-105 transition-transform duration-300">
                                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 flex items-center justify-center">
                                            <span className="text-2xl">👤</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <Heading className="text-xl font-bold mb-2">
                                    {member.name}
                                </Heading>
                                <div className="text-blue-600 font-semibold mb-3">
                                    {member.role}
                                </div>
                                <Paragraph className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                    {member.description}
                                </Paragraph>

                                {/* Social Links */}
                                <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {['LinkedIn', 'Twitter', 'GitHub'].map((social, idx) => (
                                        <button
                                            key={idx}
                                            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                                            aria-label={`${member.name}'s ${social}`}
                                        >
                                            <span className="text-xs font-semibold">
                                                {social[0]}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </MotionWrapper>
                    ))}
                </div>

                {/* CTA */}
                <MotionWrapper direction="up" delay={0.3}>
                    <div className="text-center mt-16">
                        <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                            <Heading className="text-2xl md:text-3xl font-bold mb-4">
                                Join Our Growing Team
                            </Heading>
                            <Paragraph className="text-gray-600 dark:text-gray-300 mb-6">
                                We&apos;re always looking for talented individuals who share 
                                our passion for innovation and customer satisfaction.
                            </Paragraph>
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                                View Open Positions
                            </button>
                        </div>
                    </div>
                </MotionWrapper>
            </div>
        </section>
    );
}