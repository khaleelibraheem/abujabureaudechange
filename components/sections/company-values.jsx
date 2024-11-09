"use client";

import { motion } from "framer-motion";
import { Scale, Shield, Clock, Users, Globe, LineChart } from "lucide-react";

const values = [
  {
    icon: Scale,
    title: "Fair Exchange Rates",
    description:
      "We commit to providing competitive rates that reflect true market values, ensuring you get the best value for your exchanges.",
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-blue-500/0",
  },
  {
    icon: Shield,
    title: "Regulatory Compliance",
    description:
      "Licensed and regulated in all operating jurisdictions, ensuring your transactions are secure and compliant.",
    color: "text-indigo-500",
    gradient: "from-indigo-500/20 to-indigo-500/0",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Round-the-clock service for international currency exchange needs, because global finance never sleeps.",
    color: "text-green-500",
    gradient: "from-green-500/20 to-green-500/0",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Dedicated to providing exceptional service across all supported currencies with personalized support.",
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-purple-500/0",
  },
  {
    icon: Globe,
    title: "Global Access",
    description:
      "Seamless currency exchange between USD, GBP, EUR, NGN, and INR, connecting major financial markets.",
    color: "text-orange-500",
    gradient: "from-orange-500/20 to-orange-500/0",
  },
  {
    icon: LineChart,
    title: "Market Excellence",
    description:
      "Stay ahead with real-time rates and market insights for informed currency exchange decisions.",
    color: "text-pink-500",
    gradient: "from-pink-500/20 to-pink-500/0",
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

export default function CompanyValues() {
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
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Built on principles that prioritize security, efficiency, and
            excellence in global currency exchange.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="relative group"
              >
                <div className="relative h-full p-8 bg-white dark:bg-gray-900 rounded-2xl transition-shadow hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                  {/* Content */}
                  <div className="relative">
                    <div
                      className={`inline-flex p-3 rounded-lg ${value.color} bg-white dark:bg-gray-900 mb-4`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center"
        >
          <div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              5+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Major Currencies
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              100K+
            </div>
            <div className="text-gray-600 dark:text-gray-300">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              99.9%
            </div>
            <div className="text-gray-600 dark:text-gray-300">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-300">Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
