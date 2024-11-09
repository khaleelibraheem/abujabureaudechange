"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "../ui/card";
import { useBanking } from "@/contexts/BankingContext";
import Link from "next/link";

const formatCurrency = (amount, currencyCode) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    notation: amount > 99999 ? "compact" : "standard",
  });
  return formatter.format(amount);
};

export function BalanceCards() {
  const [showBalances, setShowBalances] = useState(true);
  const { balances } = useBanking();

  const currencies = Object.entries(balances).map(([code, balance]) => ({
    code,
    balance,
    change: "+2.3%", // This could be calculated from transaction history in a real app
    trend: "up",
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Your Balances
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowBalances(!showBalances)}
          className="hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {showBalances ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {currencies.map((currency, index) => (
          <motion.div
            key={currency.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <div className="h-full rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {currency.code}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <Link href="/dashboard/send-money" passHref>
                        <DropdownMenuItem asChild>
                          <span>Send</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/dashboard/receive-money" passHref>
                        <DropdownMenuItem asChild>
                          <span>Receive</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/dashboard/convert" passHref>
                        <DropdownMenuItem asChild>
                          <span>Convert</span>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="text-[16px] font-bold text-gray-900 dark:text-white truncate">
                    {showBalances
                      ? formatCurrency(currency.balance, currency.code)
                      : "••••••"}
                  </div>
                  <div
                    className={`flex items-center text-[12px] ${
                      currency.trend === "up"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {currency.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 mr-1 flex-shrink-0" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1 flex-shrink-0" />
                    )}
                    {currency.change}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
