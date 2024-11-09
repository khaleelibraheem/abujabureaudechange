"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Sun, Moon } from "lucide-react";

export function GreetingSection() {
  const { user } = useUser();
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const getGreeting = () => {
    if (currentHour < 12) return "Good Morning ☀️";
    if (currentHour < 18) return "Good Afternoon 🌞";
    return "Good Evening 🌙";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {getGreeting()}, {user?.firstName}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Welcome back to your dashboard. Here&apos;s your financial
              overview.
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
