"use client";

import { motion } from "framer-motion";
import { UserPlus, ArrowLeftRight, Send, Wallet } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up and verify your identity to start exchanging currencies instantly.",
    color: "bg-blue-500",
  },
  {
    icon: Wallet,
    title: "Fund Your Account",
    description:
      "Add funds in any of our supported currencies - USD, GBP, EUR, NGN, or INR.",
    color: "bg-green-500",
  },
  {
    icon: ArrowLeftRight,
    title: "Exchange Currency",
    description:
      "Convert between currencies at competitive rates with real-time market prices.",
    color: "bg-indigo-500",
  },
  {
    icon: Send,
    title: "Transfer or Withdraw",
    description:
      "Send your exchanged currency to any bank account or withdraw to your local bank.",
    color: "bg-purple-500",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Get started in minutes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Follow these simple steps to start sending money globally with ease
            and confidence
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                )}

                <div className="relative flex flex-col items-center">
                  {/* Step Number */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg mb-6">
                    <Icon
                      className={`w-6 h-6 ${step.color.replace(
                        "bg-",
                        "text-"
                      )}`}
                    />
                  </div>

                  {/* Step Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
