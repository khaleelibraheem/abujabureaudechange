// components/sections/features.js
"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Globe,
  Smartphone,
  CreditCard,
  PiggyBank,
  ArrowRight,
  RefreshCcw,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: RefreshCcw,
    title: "Real-Time Exchange Rates",
    description:
      "Get live rates for USD, GBP, EUR, NGN, and INR updated every second from global forex markets.",
    color: "text-yellow-500",
    gradient: "from-yellow-500/20 to-yellow-500/0",
  },
  {
    icon: Zap,
    title: "Instant Transfers",
    description:
      "Execute currency exchanges instantly between any of our supported currencies with immediate settlement.",
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-blue-500/0",
  },
  {
    icon: LineChart,
    title: "Competitive Rates",
    description:
      "Benefit from our industry-leading exchange rates with spreads as low as 0.1% on major currency pairs.",

    color: "text-green-500",
    gradient: "from-green-500/20 to-green-500/0",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description:
      "Every transaction is protected with bank-grade security and real-time fraud monitoring.",
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-purple-500/0",
  },
  {
    icon: CreditCard,
    title: "Virtual Cards",
    description:
      "Create secure virtual cards for easy online spending, safer transactions, and seamless financial management.",
    color: "text-pink-500",
    gradient: "from-pink-500/20 to-pink-500/0",
  },
  {
    icon: PiggyBank,
    title: "Great Rates",
    description:
      "Get the best exchange rates with minimal fees on all your transactions, saving you more.",
    color: "text-orange-500",
    gradient: "from-orange-500/20 to-orange-500/0",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to send money globally
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Experience the future of international money transfers with our
            comprehensive suite of features
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-2xl p-8 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Content */}
                  <div className="relative">
                    <div
                      className={`inline-flex p-3 rounded-lg ${feature.color} bg-white dark:bg-gray-900 mb-4`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Link href="/services">
              View All Features <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
