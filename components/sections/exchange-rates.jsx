"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  RefreshCcw,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
import { useHistoricalRates, useLiveRates } from "@/app/hooks/useExchangeRates";
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

  const {
    data: liveRates,
    isLoading: loadingRates,
    isError: ratesError,
    refetch: refetchRates,
  } = useLiveRates(baseCurrency);

  const {
    data: historicalRates,
    isLoading: loadingHistory,
    isError: historyError,
  } = useHistoricalRates(baseCurrency, selectedCurrency, 30);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate rate change (mock data - replace with actual historical comparison)
  const getRateChange = (currency) => {
    return {
      value: Math.random() * 2 - 1, // Random value between -1 and 1
      trend: Math.random() > 0.5 ? "up" : "down",
    };
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900" id="exchange-rates">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <RefreshCcw className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Live Exchange Rates
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Real-Time Currency Exchange Rates
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get competitive exchange rates across major currency pairs with
            real-time updates and market insights.
          </p>
        </motion.div>

        {/* Currency Selector */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Select value={baseCurrency} onValueChange={setBaseCurrency}>
            <SelectTrigger className="w-[180px]">
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
            onClick={() => refetchRates()}
            className=""
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Exchange Rates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {ratesError ? (
            <div className="col-span-full text-center text-red-500 dark:text-red-400">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
              <p>Error loading exchange rates. Please try again later.</p>
            </div>
          ) : loadingRates ? (
            Array(4)
              .fill(0)
              .map((_, i) => <RateCardSkeleton key={i} />)
          ) : (
            supportedCurrencies
              .filter((curr) => curr !== baseCurrency)
              .map((currency) => {
                const rate = staticRates[baseCurrency][currency];
                const change = getRateChange(currency);

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
                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
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
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {rate.toFixed(3)}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            {currency}
                          </span>
                        </div>

                        {currentTime && (
                          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                            Last updated: {currentTime}
                          </CardDescription>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
          )}
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

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: "Real-Time Updates",
              description:
                "Exchange rates updated every minute from global forex markets",
            },
            {
              title: "Competitive Spreads",
              description: "Get the best rates with our low spread commitment",
            },
            {
              title: "Market Insights",
              description:
                "Access trend analysis and market movement notifications",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            asChild
          >
            <Link href="/sign-up">
              Start Transacting Now <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
