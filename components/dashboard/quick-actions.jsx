// components/dashboard/quick-actions.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SendHorizontal, QrCode, Coins, ArrowLeftRight } from "lucide-react";
import { Card } from "../ui/card";

const actions = [
  {
    title: "Send Money",
    description: "Transfer to bank accounts worldwide",
    icon: SendHorizontal,
    href: "/dashboard/send-money",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    borderColor: "group-hover:border-blue-500",
  },
  {
    title: "Receive Money",
    description: "Generate QR code for easy transfers",
    icon: QrCode,
    href: "/dashboard/receive-money",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-500/10",
    borderColor: "group-hover:border-purple-500",
  },
  {
    title: "Crypto Exchange",
    description: "Buy, sell, and exchange crypto",
    icon: Coins,
    href: "/dashboard/crypto",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-500/10",
    borderColor: "group-hover:border-orange-500",
  },
  {
    title: "Quick Convert",
    description: "Instant currency conversion",
    icon: ArrowLeftRight,
    href: "/dashboard/convert",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-500/10",
    borderColor: "group-hover:border-green-500",
  },
];

export function QuickActions() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white px-4 sm:px-0">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:px-0">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="col-span-1"
          >
            <Card className="lg:min-h-[216px] lg:min-w-[178px]">
              <Link href={action.href} className="block h-full">
                <div
                  className={`group relative h-full p-4 sm:p-6 rounded-2xl border-2 border-transparent transition-all duration-300 ${action.borderColor}`}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex p-3 rounded-xl ${action.bgColor}`}
                  >
                    <action.icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${action.color}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-4">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {action.description}
                    </p>
                  </div>

                  {/* Hover State Indicator */}
                  <div
                    className={`absolute inset-x-0 bottom-0 h-0.5 ${action.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full`}
                  />
                </div>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
