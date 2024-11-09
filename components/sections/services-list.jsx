// components/sections/services-list.js
"use client";

import { motion } from "framer-motion";
import {
  Banknote,
  CreditCard,
  Smartphone,
  ArrowLeftRight,
  Building2,
  Wallet,
} from "lucide-react";

const serviceColors = {
  blue: {
    background: "bg-blue-500/10 dark:bg-blue-500/20",
    text: "text-blue-500 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  purple: {
    background: "bg-purple-500/10 dark:bg-purple-500/20",
    text: "text-purple-500 dark:text-purple-400",
    dot: "bg-purple-500",
  },
  green: {
    background: "bg-green-500/10 dark:bg-green-500/20",
    text: "text-green-500 dark:text-green-400",
    dot: "bg-green-500",
  },
  orange: {
    background: "bg-orange-500/10 dark:bg-orange-500/20",
    text: "text-orange-500 dark:text-orange-400",
    dot: "bg-orange-500",
  },
  indigo: {
    background: "bg-indigo-500/10 dark:bg-indigo-500/20",
    text: "text-indigo-500 dark:text-indigo-400",
    dot: "bg-indigo-500",
  },
  pink: {
    background: "bg-pink-500/10 dark:bg-pink-500/20",
    text: "text-pink-500 dark:text-pink-400",
    dot: "bg-pink-500",
  },
};

const services = [
  {
    icon: Banknote,
    title: "International Money Transfer",
    description:
      "Send money to over 180 countries with competitive exchange rates and low fees.",
    features: [
      "Real-time exchange rates",
      "Instant transfers available",
      "Track your transfer",
      "Multiple payout options",
    ],
    color: "blue",
  },
  {
    icon: CreditCard,
    title: "Virtual Cards",
    description:
      "Create virtual cards for secure online transactions and international purchases.",
    features: [
      "Zero annual fees",
      "Multiple currencies",
      "Instant card creation",
      "Spending controls",
    ],
    color: "purple",
  },
  {
    icon: Smartphone,
    title: "Mobile Wallet",
    description:
      "Manage your money on the go with our secure and user-friendly mobile wallet.",
    features: [
      "Easy top-up",
      "QR payments",
      "Bill payments",
      "Transaction history",
    ],
    color: "green",
  },
  {
    icon: ArrowLeftRight,
    title: "Currency Exchange",
    description:
      "Get the best rates for currency exchange with real-time market updates.",
    features: [
      "Live exchange rates",
      "Rate alerts",
      "Market analysis",
      "Rate lock-in",
    ],
    color: "orange",
  },
  {
    icon: Building2,
    title: "Business Solutions",
    description:
      "Tailored solutions for businesses with international payment needs.",
    features: [
      "Bulk payments",
      "API integration",
      "Multi-user access",
      "Custom reports",
    ],
    color: "indigo",
  },
  {
    icon: Wallet,
    title: "Multi-Currency Account",
    description:
      "Hold and manage multiple currencies in one account with ease.",
    features: [
      "No monthly fees",
      "Local account details",
      "Interest earning",
      "Free conversions",
    ],
    color: "pink",
  },
];

export default function ServicesList() {
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
            Our Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Comprehensive financial solutions designed to meet all your
            international money transfer needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colorScheme = serviceColors[service.color];

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
                    <div className={`p-3 rounded-xl ${colorScheme.background}`}>
                      <Icon className={`w-6 h-6 ${colorScheme.text}`} />
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
                          className={`w-1.5 h-1.5 rounded-full ${colorScheme.dot}`}
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
