"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp, RefreshCcw, ArrowLeftRight } from "lucide-react";
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
import { useLiveRates } from "@/app/hooks/useExchangeRates";
const supportedCurrencies = ["USD", "EUR", "GBP", "NGN", "INR"];
import { formatNumberWithCommas } from "@/lib/utils";

function QuickConvertPage() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [displayAmount, setDisplayAmount] = useState("");

  const { data: rates, isLoading, refetch } = useLiveRates(fromCurrency);

  useEffect(() => {
    setLastUpdated(new Date());
  }, [rates]);

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

  const convertedAmount = rates?.conversion_rates?.[toCurrency]
    ? formatNumberWithCommas(
        (parseFloat(amount || 0) * rates.conversion_rates[toCurrency]).toFixed(
          2
        )
      )
    : "0.00";

  const rate = rates?.conversion_rates?.[toCurrency]
    ? rates.conversion_rates[toCurrency]
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Quick Convert
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Convert between currencies with real-time exchange rates.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Currency Converter</CardTitle>
              <CardDescription>
                Get instant currency conversions
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => refetch()}
              className={isLoading ? "animate-spin" : ""}
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* From Currency */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              From
            </label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Amount"
                  value={displayAmount}
                  onChange={handleAmountChange}
                  className="text-lg text-right"
                />
              </div>
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
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwapCurrencies}
              className="rotate-90 lg:rotate-0"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          {/* To Currency */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              To
            </label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  value={convertedAmount}
                  readOnly
                  className="text-lg bg-gray-50 dark:bg-gray-800"
                />
              </div>
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exchange Rate Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Exchange Rate
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              1 {fromCurrency} = {formatNumberWithCommas(rate.toFixed(4))}{" "}
              {toCurrency}
            </p>
            {lastUpdated && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            {rate > 0 ? (
              <>
                <ArrowUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500">+0.25%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-4 w-4 text-red-500" />
                <span className="text-red-500">-0.13%</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              About this rate
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Our rates are provided by reliable financial data providers and
              are updated in real-time.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Send money?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Want to make a transfer at this rate? Visit our send money page to
              get started.
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

export default QuickConvertPage;
