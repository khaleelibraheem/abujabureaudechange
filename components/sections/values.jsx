"use client";

import { motion } from "framer-motion";
import { Shield, Heart, Users, Trophy, Target, Clock } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description: "We prioritize the security of your money and data above all else."
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make starts with our customers' needs."
  },
  {
    icon: Users,
    title: "Inclusivity",
    description: "Making financial services accessible to everyone, everywhere."
  },
  {
    icon: Trophy,
    title: "Excellence",
    description: "Striving for excellence in every transaction and interaction."
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Continuously improving our services through technology."
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "Delivering consistent, dependable service around the clock."
  }
];

export default function Values() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Values
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            These core values guide everything we do and help us maintain our commitment 
            to excellence in global money transfers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative h-full p-8 bg-white dark:bg-gray-900 rounded-2xl transition-shadow hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}