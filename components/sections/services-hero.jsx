"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const highlights = [
  {
    icon: Globe,
    text: "5 Major Currencies",
  },
  {
    icon: Shield,
    text: "Secure Transfers",
  },
  {
    icon: Zap,
    text: "Instant Exchange",
  },
];

export default function ServicesHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 -z-10" />

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Premium Currency Exchange Services
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience seamless currency exchange between USD, GBP, EUR, NGN,
            and INR with competitive rates and instant processing.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-12">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            asChild
          >
            <Link href="/sign-up">
              Start Exchanging <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
