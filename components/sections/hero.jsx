// components/sections/hero.js
"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pb-24 pt-24 overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 -z-10" />

      {/* Gradient blob */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl dark:bg-indigo-500/10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl dark:bg-sky-500/10" />

      <div className="container relative z-10 px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-full mb-8"
            >
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-sm font-medium">Live Exchange Rates</span>
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>

            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 mb-8">
              Premium Currency Exchange in <br />
              <span className="text-indigo-600 dark:text-indigo-400">
                Five Major Currencies
              </span>
            </motion.h1>

            <motion.p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Exchange between USD, GBP, EUR, NGN, and INR with real-time rates,
              instant transfers, and the most competitive spreads in the market.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto"
                asChild
              >
                <Link href="/sign-up">
                  Start Exchange <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/services#exchange-rates">View Live Rates</Link>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div className="mt-12 grid grid-cols-3 gap-8">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  5
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Major Currencies
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  0.1%
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Exchange Spread
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  24/7
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Live Rates
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Exchange Rate Preview Card */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative">
              <div className="hidden xl:block absolute inset-0 bg-gradient-to-tr from-indigo-500 to-sky-500 rounded-3xl blur-2xl opacity-20" />
              <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Live Exchange Rates
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Updated just now
                    </span>
                  </div>

                  {/* Example rates */}
                  <div className="space-y-4">
                    {[
                      { from: "USD", to: "NGN", rate: "1 = ₦1669.34" },
                      { from: "GBP", to: "NGN", rate: "1 = ₦2181.35" },
                      { from: "EUR", to: "NGN", rate: "1 = ₦1796.91" },
                      { from: "USD", to: "INR", rate: "1 = ₹84.40" },
                    ].map((rate) => (
                      <div
                        key={`${rate.from}-${rate.to}`}
                        className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {rate.from}/{rate.to}
                          </span>
                        </div>
                        <span className="text-gray-900 dark:text-white">
                          {rate.rate}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Wave separator - Fixed positioning */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-auto fill-white dark:fill-slate-800"
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,50 C280,100 720,0 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
}