"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 -z-10" />
      <div className="container px-4 mx-auto">
        <motion.div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Bridging Global Currencies
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            As a leading currency exchange platform, we specialize in providing
            seamless exchanges between USD, GBP, EUR, NGN, and INR. Our mission
            is to make international currency exchange accessible, affordable,
            and efficient for everyone.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
