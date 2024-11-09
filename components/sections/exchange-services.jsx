"use client";

import { motion } from "framer-motion";
import {
  Repeat,
  Wallet,
  Building2,
  ArrowRightLeft,
  Globe,
  Shield,
} from "lucide-react";

const services = [
  {
    title: "Spot Exchange",
    description: "Instant currency exchange at current market rates",
    icon: Repeat,
    features: [
      "Real-time exchange rates",
      "Zero hidden fees",
      "Instant transfers",
      "Competitive spreads",
    ],
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-blue-500/0",
  },
  {
    title: "Multi-Currency Wallet",
    description: "Hold and manage multiple currencies in one account",
    icon: Wallet,
    features: [
      "Hold 5 major currencies",
      "Free internal transfers",
      "Real-time balance updates",
      "Secure fund management",
    ],
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-purple-500/0",
  },
  {
    title: "Business Exchange",
    description: "Tailored solutions for business currency needs",
    icon: Building2,
    features: [
      "Volume-based rates",
      "Batch processing",
      "API integration",
      "Dedicated support",
    ],
    color: "text-indigo-500",
    gradient: "from-indigo-500/20 to-indigo-500/0",
  },
  {
    title: "Currency Conversion",
    description: "Easy currency conversion with live rates",
    icon: ArrowRightLeft,
    features: [
      "Live exchange rates",
      "Rate alerts",
      "Price history",
      "Market analysis",
    ],
    color: "text-green-500",
    gradient: "from-green-500/20 to-green-500/0",
  },
  {
    title: "International Transfers",
    description: "Send money across borders efficiently",
    icon: Globe,
    features: [
      "Fast processing",
      "Track transfers",
      "Competitive rates",
      "Secure transfers",
    ],
    color: "text-orange-500",
    gradient: "from-orange-500/20 to-orange-500/0",
  },
  {
    title: "Secure Transactions",
    description: "Bank-grade security for all exchanges",
    icon: Shield,
    features: [
      "End-to-end encryption",
      "2FA authentication",
      "Transaction monitoring",
      "Fraud protection",
    ],
    color: "text-red-500",
    gradient: "from-red-500/20 to-red-500/0",
  },
];

export default function ExchangeServices() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Comprehensive Exchange Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need for seamless currency exchange between USD, GBP,
            EUR, NGN, and INR.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl transition-shadow hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 rounded-xl ${service.color} bg-white dark:bg-gray-900`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${service.color.replace(
                            "text-",
                            "bg-"
                          )}`}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
