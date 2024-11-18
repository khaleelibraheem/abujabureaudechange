"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Sun, Moon, Coffee, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

export function GreetingSection() {
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreetingConfig = () => {
    const hour = currentTime.getHours();
    if (hour < 12)
      return {
        text: "Good Morning",
        icon: Coffee,
        color: "text-yellow-600",
        gradient: "from-yellow-500/20 to-transparent",
      };
    if (hour < 18)
      return {
        text: "Good Afternoon",
        icon: Sun,
        color: "text-orange-500",
        gradient: "from-orange-500/20 to-transparent",
      };
    return {
      text: "Good Evening",
      icon: Moon,
      color: "text-blue-600",
      gradient: "from-blue-500/20 to-transparent",
    };
  };

  const greeting = getGreetingConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="relative overflow-hidden rounded-xl p-4 sm:p-6">
        {/* Gradient Background */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l opacity-40 pointer-events-none dark:opacity-20"
          style={{
            backgroundImage: `linear-gradient(to left, ${greeting.gradient})`,
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 space-y-4">
          {/* Greeting Section */}
          <div className="flex items-start gap-3 sm:gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-full bg-gray-100 dark:bg-gray-800 p-2.5 sm:p-3 shadow-sm"
            >
              <greeting.icon
                className={`w-5 h-5 sm:w-6 sm:h-6 ${greeting.color} dark:text-gray-200`}
              />
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-1"
              >
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {greeting.text}, {user?.firstName}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 sm:line-clamp-1">
                  Welcome back! Here&apos;s your financial snapshot for today.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Date Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-start sm:justify-end"
          >
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/80 px-2.5 py-1 rounded-full">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
