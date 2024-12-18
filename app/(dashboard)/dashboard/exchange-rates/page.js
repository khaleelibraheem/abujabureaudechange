"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  RefreshCcw,
  AlertTriangle,
  TrendingUp,
  Clock,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { RateChart } from "@/components/charts/rate-chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useHistoricalRates } from "@/app/hooks/useExchangeRates";
import staticRates from "@/lib/mock-data/static-rates";

const supportedCurrencies = ["USD", "GBP", "EUR", "NGN", "INR"];

const RateCardSkeleton = () => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
    <div className="flex justify-between items-center mb-4">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-4 w-16" />
    </div>
    <Skeleton className="h-10 w-32 mb-4" />
    <Skeleton className="h-4 w-24" />
  </div>
);

export default function ExchangeRates() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [currentTime, setCurrentTime] = useState("");
  const [mounted, setMounted] = useState(false);

  const {
    data: historicalRates,
    isLoading: loadingHistory,
    isError: historyError,
  } = useHistoricalRates(baseCurrency, selectedCurrency, 30);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate rate change (mock data - updates every second)
  const getRateChange = () => {
    if (!mounted) return { value: 0, trend: "up" }; // Default values for server-side rendering
    return {
      value: Math.random() * 2 - 1, // Random value between -1 and 1
      trend: Math.random() > 0.5 ? "up" : "down",
    };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Exchange Rates
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Live currency rates and historical data
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select value={baseCurrency} onValueChange={setBaseCurrency}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Base Currency" />
            </SelectTrigger>
            <SelectContent>
              {supportedCurrencies.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            className="animate-spin"
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Exchange Rates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {supportedCurrencies
          .filter((curr) => curr !== baseCurrency)
          .map((currency) => {
            const rate = staticRates[baseCurrency][currency];
            const change = getRateChange();

            return (
              <motion.div
                key={currency}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="cursor-pointer"
                onClick={() => setSelectedCurrency(currency)}
              >
                <Card
                  className={`hover:shadow-lg transition-shadow ${
                    selectedCurrency === currency
                      ? "ring-2 ring-indigo-500 dark:ring-indigo-400"
                      : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <CardHeader className="p-0">
                        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {baseCurrency}/{currency}
                        </CardTitle>
                      </CardHeader>
                      <div
                        className={`flex items-center gap-1 ${
                          change.trend === "up"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {change.trend === "up" ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                          {change.value.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {rate.toFixed(4)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {currency}
                      </span>
                    </div>

                    {currentTime && (
                      <CardDescription className="text-[12px] text-gray-500 dark:text-gray-400">
                        Last updated: {currentTime}
                      </CardDescription>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
      </div>

      {/* Historical Chart */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Historical Rates</CardTitle>
          <CardDescription>
            30-day price history for {baseCurrency}/{selectedCurrency}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {historyError ? (
            <div className="text-center text-red-500 dark:text-red-400 py-8">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
              <p>Error loading historical data. Please try again later.</p>
            </div>
          ) : loadingHistory ? (
            <div className="h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
          ) : (
            historicalRates && (
              <div className="w-full">
                <RateChart
                  data={historicalRates}
                  currency={`${baseCurrency}/${selectedCurrency}`}
                />
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: TrendingUp,
            title: "Market Trends",
            description: "Daily analysis of currency movements",
          },
          {
            icon: Clock,
            title: "Market Hours",
            description: "24/7 forex market monitoring",
          },
          {
            icon: LineChart,
            title: "Price Alerts",
            description: "Set up notifications for rate changes",
          },
        ].map((feature, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                  <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
