"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreHorizontal,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Send,
  Download,
  RefreshCw,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { useBanking } from "@/contexts/BankingContext";
import Link from "next/link";
import { cn } from "@/lib/utils";

const formatCurrency = (amount, currencyCode) => {
  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);
  let formatted;

  if (currencyCode === "NGN") {
    formatted = `₦${absoluteAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  } else {
    try {
      formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(absoluteAmount);
    } catch (error) {
      const fallbackSymbol =
        { USD: "$", EUR: "€", GBP: "£", JPY: "¥" }[currencyCode] ||
        `${currencyCode} `;
      formatted = `${fallbackSymbol}${absoluteAmount.toFixed(2)}`;
    }
  }

  if (isNegative) {
    formatted = `-${formatted}`;
  }

  const formattedLength = formatted.length;
  const sizeClass =
    formattedLength > 12
      ? "text-lg"
      : formattedLength > 9
      ? "text-xl"
      : "text-2xl";

  return { value: formatted, sizeClass };
};

export function BalanceCards() {
  const [showBalances, setShowBalances] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { balances } = useBanking();

  useEffect(() => {
    const stored = localStorage.getItem("showBalances");
    if (stored !== null) setShowBalances(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("showBalances", JSON.stringify(showBalances));
  }, [showBalances]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const currencies = Object.entries(balances).map(([code, balance]) => {
    const change =
      parseFloat(
        (((balance - balance * 0.977) / (balance * 0.977)) * 100).toFixed(1)
      ) || 0;
    return {
      code,
      balance,
      change,
      trend: balance >= balance * 0.977 ? "up" : "down",
    };
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between px-4 sm:px-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-tr from-indigo-100 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/20">
            <Wallet className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Balances
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currencies.length} currencies available
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={cn(
              "flex-1 sm:flex-none transition-all duration-300",
              isRefreshing && "opacity-50"
            )}
          >
            <RefreshCw
              className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")}
            />
            <span className="text-sm">Refresh</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalances(!showBalances)}
            className="flex-1 sm:flex-none hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {showBalances ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                <span className="text-sm">Hide</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                <span className="text-sm">Show</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:px-0">
        <AnimatePresence mode="wait">
          {currencies.map((currency, index) => (
            <motion.div
              key={currency.code}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden bg-white dark:bg-gray-900">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md">
                      <span className="font-mono text-sm font-medium">
                        {currency.code}
                      </span>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4 text-gray-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href="/dashboard/send-money">
                          <DropdownMenuItem>
                            <Send className="h-4 w-4 mr-2" />
                            Send
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/dashboard/receive-money">
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Receive
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <Link href="/dashboard/convert">
                          <DropdownMenuItem>
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Convert
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div>
                    <motion.p
                      className={cn(
                        "font-mono font-bold mb-3",
                        formatCurrency(currency.balance, currency.code)
                          .sizeClass
                      )}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {showBalances
                        ? formatCurrency(currency.balance, currency.code).value
                        : "••••••"}
                    </motion.p>

                    <div className="flex items-center gap-1.5">
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          currency.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {currency.trend === "up" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )}
                        {currency.change}%
                      </div>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">24h</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
