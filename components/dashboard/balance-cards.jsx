"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
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
  // Handle negative amounts
  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);

  // Special handling for NGN (Naira)
  if (currencyCode === "NGN") {
    let formatted = absoluteAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Add compact notation for large numbers
    if (absoluteAmount >= 1000000) {
      formatted = (absoluteAmount / 1000000).toFixed(1) + "M";
    } else if (absoluteAmount >= 1000) {
      formatted = (absoluteAmount / 1000).toFixed(1) + "K";
    }

    return `₦${isNegative ? "-" : ""}${formatted}`;
  }

  // For other currencies, use the standard formatter
  const options = {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (absoluteAmount >= 1000000) {
    options.notation = "compact";
    options.compactDisplay = "short";
    options.maximumSignificantDigits = 3;
  }

  try {
    const formatter = new Intl.NumberFormat("en-US", options);
    let formatted = formatter.format(amount);

    if (amount === 0) {
      return formatter.format(0);
    }

    return formatted;
  } catch (error) {
    // Fallback formatting
    const fallbackSymbol =
      {
        USD: "$",
        EUR: "€",
        GBP: "£",
        JPY: "¥",
      }[currencyCode] || currencyCode + " ";

    const formatted = absoluteAmount.toFixed(2);
    return `${isNegative ? "-" : ""}${fallbackSymbol}${formatted}`;
  }
};

// Example of how to format different amounts
const examples = [
  { amount: 1234.56, code: "NGN" }, // ₦1,234.56
  { amount: 1000000, code: "NGN" }, // ₦1.0M
  { amount: 50000, code: "NGN" }, // ₦50.0K
  { amount: -1234.56, code: "NGN" }, // -₦1,234.56
  { amount: 1234.56, code: "USD" }, // $1,234.56
];

export function BalanceCards() {
  const [showBalances, setShowBalances] = useState(true);
  const { balances } = useBanking();

  const currencies = Object.entries(balances).map(([code, balance]) => ({
    code,
    balance,
    change: (((balance - balance * 0.977) / (balance * 0.977)) * 100).toFixed(
      1
    ) === "NaN" ? 0 : (((balance - balance * 0.977) / (balance * 0.977)) * 100).toFixed(1),
    trend: balance >= balance * 0.977 ? "up" : "down",
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
            <Card className="h-full hover:shadow-md transition-shadow duration-200">
              <div className="rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                      {currency.code}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Balance
                    </span>
                  </div>
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
                        <DropdownMenuItem>Send</DropdownMenuItem>
                      </Link>
                      <Link href="/dashboard/receive-money" passHref>
                        <DropdownMenuItem>Receive</DropdownMenuItem>
                      </Link>
                      <Link href="/dashboard/convert" passHref>
                        <DropdownMenuItem>Convert</DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="text-xl font-bold text-gray-900 dark:text-white truncate font-mono">
                    {showBalances
                      ? formatCurrency(currency.balance, currency.code)
                      : "••••••"}
                  </div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex items-center text-sm ${
                        currency.trend === "up"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {currency.trend === "up" ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      {currency.change}%
                    </div>
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
