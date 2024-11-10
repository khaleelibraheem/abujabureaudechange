"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowDown,
  ArrowUp,
  RefreshCcw,
  ArrowLeftRight,
  TrendingUp,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { formatNumberWithCommas } from "@/lib/utils";
import staticRates from "@/lib/mock-data/static-rates";
import Link from "next/link";

const supportedCurrencies = ["USD", "EUR", "GBP", "NGN", "INR"];

function QuickConvertPage() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [displayAmount, setDisplayAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLastUpdated(new Date());
  }, [fromCurrency, toCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setAmount("");
      setDisplayAmount("");
      return;
    }

    const rawValue = value.replace(/,/g, "");
    if (isNaN(rawValue) || rawValue === "") return;

    const formattedValue = formatNumberWithCommas(rawValue);
    setDisplayAmount(formattedValue);
    setAmount(rawValue);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLastUpdated(new Date());
    }, 500);
  };

  const rate = staticRates[fromCurrency][toCurrency];
  const convertedAmount = formatNumberWithCommas(
    (parseFloat(amount || 0) * rate).toFixed(2)
  );

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Currency Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Get real-time exchange rates for multiple currencies. Quick and easy
            currency conversion at your fingertips.
          </p>
        </div>

        {/* Main Converter Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-500" />
                <div>
                  <CardTitle className="text-lg">Live Exchange Rate</CardTitle>
                  {lastUpdated && (
                    <CardDescription>
                      Updated {lastUpdated.toLocaleTimeString()}
                    </CardDescription>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                className={`${
                  loading ? "animate-spin" : ""
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {/* Current Rate Display */}
            <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <div>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  1 {fromCurrency} = {formatNumberWithCommas(rate.toFixed(4))}{" "}
                  {toCurrency}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {Math.random() > 0.5 ? (
                    <div className="flex items-center text-green-500">
                      <ArrowUp className="h-4 w-4" />
                      <span className="text-sm">+0.25%</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <ArrowDown className="h-4 w-4" />
                      <span className="text-sm">-0.13%</span>
                    </div>
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    vs yesterday
                  </span>
                </div>
              </div>
            </div>

            {/* Converter Section */}
            <div className="space-y-8">
              {/* From Currency */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  From
                </label>
                <div className="flex gap-3">
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedCurrencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    placeholder="Enter amount"
                    value={displayAmount}
                    onChange={handleAmountChange}
                    className="flex-1 text-lg font-medium text-right"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="relative flex justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwapCurrencies}
                  className="relative z-10 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </div>

              {/* To Currency */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  To
                </label>
                <div className="flex gap-3">
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedCurrencies
                        .filter((c) => c !== fromCurrency)
                        .map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    value={convertedAmount}
                    readOnly
                    className="flex-1 text-lg font-medium text-right bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/send-money" className="block">
            <Card className="h-full hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Ready to Send Money?
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Transfer funds at this rate now
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-indigo-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    About Our Rates
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We source our rates from major financial markets, updated in
                    real-time for accuracy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}

export default QuickConvertPage;
