"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  SendHorizontal,
  QrCode,
  Coins,
  ArrowLeftRight,
  Sparkles,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

const actions = [
  {
    title: "Send Money",
    description: "Fast & secure transfers worldwide",
    icon: SendHorizontal,
    href: "/dashboard/send-money",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    borderColor: "group-hover:border-blue-500",
    gradient: "from-blue-500/20 via-blue-400/10 to-transparent",
    accent: "shadow-blue-500/10",
    isNew: false,
    isFeatured: true,
  },
  {
    title: "Receive Money",
    description: "Get paid easily with QR codes",
    icon: QrCode,
    href: "/dashboard/receive-money",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-500/10",
    borderColor: "group-hover:border-purple-500",
    gradient: "from-purple-500/20 via-purple-400/10 to-transparent",
    accent: "shadow-purple-500/10",
    isNew: true,
    isFeatured: false,
  },
  {
    title: "Crypto Exchange",
    description: "Trade crypto instantly",
    icon: Coins,
    href: "/dashboard/crypto",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-500/10",
    borderColor: "group-hover:border-orange-500",
    gradient: "from-orange-500/20 via-orange-400/10 to-transparent",
    accent: "shadow-orange-500/10",
    isNew: false,
    isFeatured: false,
  },
  {
    title: "Quick Convert",
    description: "Real-time currency exchange",
    icon: ArrowLeftRight,
    href: "/dashboard/convert",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-500/10",
    borderColor: "group-hover:border-green-500",
    gradient: "from-green-500/20 via-green-400/10 to-transparent",
    accent: "shadow-green-500/10",
    isNew: false,
    isFeatured: false,
  },
];

export function QuickActions() {
  const [activeAction, setActiveAction] = useState(null);
  const [touchStart, setTouchStart] = useState(null);

  const handleTouchStart = (action) => {
    setTouchStart(new Date().getTime());
    setActiveAction(action);
  };

  const handleTouchEnd = () => {
    const touchDuration = new Date().getTime() - touchStart;
    if (touchDuration < 100) {
      // Quick tap animation
      setTimeout(() => setActiveAction(null), 200);
    } else {
      setActiveAction(null);
    }
    setTouchStart(null);
  };

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 sm:px-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h2>
          <Badge variant="secondary" className="hidden sm:flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            New Features
          </Badge>
        </div>
        <Badge
          variant="outline"
          className="hidden sm:flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <TrendingUp className="h-3 w-3 mr-1" />
          Most Used
        </Badge>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 sm:px-0">
        <AnimatePresence mode="wait">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="col-span-1"
            >
              <Link href={action.href} className="block h-full">
                <Card
                  className={cn(
                    "h-full overflow-hidden transition-all duration-300",
                    "hover:shadow-lg dark:hover:shadow-2xl",
                    activeAction?.title === action.title && "scale-95",
                    action.accent
                  )}
                >
                  <motion.div
                    onTouchStart={() => handleTouchStart(action)}
                    onTouchEnd={handleTouchEnd}
                    className={cn(
                      "group relative h-full p-3 sm:p-4",
                      "border-2 border-transparent rounded-xl",
                      "transition-all duration-300",
                      action.borderColor
                    )}
                  >
                    {/* Gradient Background */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(145deg, ${action.gradient})`,
                      }}
                    />

                    {/* Content Container */}
                    <div className="relative z-10 space-y-2 sm:space-y-3">
                      {/* Icon & Badges Row */}
                      <div className="flex items-start justify-between">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            "inline-flex p-2 sm:p-3 rounded-xl",
                            action.bgColor,
                            "transition-transform"
                          )}
                        >
                          <action.icon
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${action.color}`}
                          />
                        </motion.div>

                        {/* Mobile-optimized badges */}
                        <div className="flex gap-1 sm:gap-2">
                          {action.isNew && (
                            <Badge
                              variant="default"
                              className={cn(
                                "bg-blue-500 text-[10px] sm:text-xs",
                                "px-1.5 py-0.5 sm:px-2 sm:py-1"
                              )}
                            >
                              New
                            </Badge>
                          )}
                          {action.isFeatured && (
                            <Badge
                              variant="default"
                              className={cn(
                                "bg-purple-500 text-[10px] sm:text-xs",
                                "px-1.5 py-0.5 sm:px-2 sm:py-1"
                              )}
                            >
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white line-clamp-1">
                            {action.title}
                          </h3>
                          <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600 sm:hidden" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
