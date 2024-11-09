// components/sections/trusted-by.js
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const companies = [
  { name: "Company 1", logo: "/logos/company1.svg" },
  { name: "Company 2", logo: "/logos/company2.svg" },
  { name: "Company 3", logo: "/logos/company3.svg" },
  { name: "Company 4", logo: "/logos/company4.svg" },
  { name: "Company 5", logo: "/logos/company5.svg" },
];

export default function TrustedBySection() {
  return (
    <section className="py-16 bg-white dark:bg-slate-800">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Trusted Worldwide
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            Trusted by leading companies
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Join thousands of satisfied customers who trust us with their
            international transfers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-70"
        >
          {/* Replace these divs with actual company logos */}
          <div className="h-12 w-full max-w-[120px] bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-12 w-full max-w-[120px] bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-12 w-full max-w-[120px] bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-12 w-full max-w-[120px] bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-12 w-full max-w-[120px] bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
              $5B+
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Transactions processed
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
              180+
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Countries supported
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
              99.9%
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              System uptime
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
              24/7
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Customer support
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


