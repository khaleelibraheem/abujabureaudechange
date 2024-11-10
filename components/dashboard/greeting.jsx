"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Sun, Moon, Coffee, Calendar } from "lucide-react";

export function GreetingSection() {
  const { user } = useUser();
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const getGreetingConfig = () => {
    if (currentHour < 12)
      return {
        text: "Good Morning",
        icon: Coffee,
        color: "text-yellow-600",
      };
    if (currentHour < 18)
      return {
        text: "Good Afternoon",
        icon: Sun,
        color: "text-orange-500",
      };
    return {
      text: "Good Evening",
      icon: Moon,
      color: "text-blue-600",
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
      <Card className="rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-start gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-2 sm:p-3">
              <greeting.icon
                className={`w-5 h-5 sm:w-6 sm:h-6 ${greeting.color} dark:text-gray-200`}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex flex-wrap items-center gap-1 sm:gap-2">
                {greeting.text},
                <span className="flex items-center">{user?.firstName}</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-0.5 sm:mt-1 line-clamp-2 sm:line-clamp-none">
                Welcome back to your dashboard. Here&apos;s your financial
                overview.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 w-full sm:w-auto justify-start sm:justify-end mt-2 sm:mt-0">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
