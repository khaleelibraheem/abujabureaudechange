// app/(dashboard)/dashboard/crypto/page.js
"use client";

import { motion } from "framer-motion";
import { Coins, Bell, ArrowRight, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card } from "@/components/ui/card";

function CryptoComingSoonPage() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    // In a real app, you would handle the email subscription here
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <PiggyBank className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
        </motion.div>

        {/* Coming Soon Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Stock Investments Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 dark:text-gray-300 mb-8"
        >
          We&apos;re working on bringing you a seamless investments portfolio
          experience. Be the first to know when we launch!
        </motion.p>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            "Diversified Stock Portfolio Options",
            "Real-time Market Price Updates",
            "Secure and Reliable Investments",
          ].map((feature, index) => (
            <Card key={feature} className="p-4 rounded-xl shadow-sm">
              <p className="text-gray-900 dark:text-white font-medium">
                {feature}
              </p>
            </Card>
          ))}
        </motion.div>

        {/* Notification Form */}
        {!isSubscribed ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Bell className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <Button type="submit">
                Notify Me <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-4 rounded-lg"
          >
            Thanks! We&apos;ll notify you when we launch crypto exchange.
          </motion.div>
        )}

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div className="bg-indigo-600 h-2 rounded-full w-16" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            30% Complete
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CryptoComingSoonPage;
