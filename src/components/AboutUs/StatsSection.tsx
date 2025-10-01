"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  icon?: string;
}

const stats: StatItem[] = [
  { value: 250, suffix: "k+", label: "Happy Customers", icon: "👥" },
  { value: 50, suffix: "k+", label: "Products Available", icon: "📦" },
  { value: 150, label: "Countries Served", icon: "🌎" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", icon: "⭐" },
];

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

function StatItemComponent({ stat, index }: { stat: StatItem; index: number }) {
  const count = useCountUp(stat.value, 2000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <div className="relative">
        <div className="text-4xl mb-4 opacity-20 group-hover:scale-110 transition-transform duration-300">
          {stat.icon}
        </div>
        <Heading className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-2">
          {count}
          {stat.suffix}
        </Heading>
      </div>
      <Paragraph className="text-lg font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
        {stat.label}
      </Paragraph>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Heading className="text-4xl md:text-5xl font-bold mb-6">
            Numbers That Speak
          </Heading>
          <Paragraph className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our growth and success are reflected in these numbers, 
            but our true achievement is the trust of our customers.
          </Paragraph>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItemComponent key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Paragraph className="text-lg text-gray-600 dark:text-gray-300">
            Join millions of satisfied customers worldwide
          </Paragraph>
        </motion.div>
      </div>
    </section>
  );
}