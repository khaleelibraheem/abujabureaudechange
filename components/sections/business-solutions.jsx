"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Code,
  ListChecks,
  Users,
  FileText,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    title: "Volume-Based Pricing",
    description:
      "Better rates for higher volume exchanges with transparent pricing.",
    icon: LineChart,
    color: "text-blue-500",
  },
  {
    title: "API Integration",
    description:
      "Seamlessly integrate our exchange services into your systems.",
    icon: Code,
    color: "text-purple-500",
  },
  {
    title: "Batch Processing",
    description: "Process multiple currency exchanges efficiently at once.",
    icon: ListChecks,
    color: "text-indigo-500",
  },
  {
    title: "Team Management",
    description: "Multi-user access with role-based permissions.",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "Detailed Reports",
    description: "Comprehensive reporting and analytics for all transactions.",
    icon: FileText,
    color: "text-orange-500",
  },
  {
    title: "Dedicated Support",
    description: "Priority support from our business exchange specialists.",
    icon: Headphones,
    color: "text-red-500",
  },
];

export default function BusinessSolutions() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Business Exchange Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Tailored currency exchange solutions for businesses of all sizes
            with premium features and dedicated support.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl"
            >
              <div className={`${feature.color} mb-4`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            asChild
          >
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
