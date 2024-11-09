"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLiveRates } from "@/app/hooks/useExchangeRates";
import { Card } from "@/components/ui/card";
import {
  formatNumberWithCommas,
  parseFormattedNumber,
  formatCurrency,
} from "@/lib/utils";

// import { useLiveRates } from "@/hooks/useExchangeRates";

const supportedCurrencies = ["USD", "EUR", "GBP", "NGN", "INR"];

export default function SendMoneyPage() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [displayAmount, setDisplayAmount] = useState("");

  const { data: rates } = useLiveRates(fromCurrency);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setAmount("");
      setDisplayAmount("");
      return;
    }

    // Remove existing commas before formatting
    const rawValue = value.replace(/,/g, "");
    if (isNaN(rawValue) || rawValue === "") return;

    const formattedValue = formatNumberWithCommas(rawValue);
    setDisplayAmount(formattedValue);
    setAmount(rawValue); // Keep the raw number for calculations
  };

  const convertedAmount = rates?.conversion_rates?.[toCurrency]
    ? formatNumberWithCommas(
        (parseFloat(amount || 0) * rates.conversion_rates[toCurrency]).toFixed(
          2
        )
      )
    : "0.00";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Send Money
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Transfer money to bank accounts worldwide with competitive rates.
        </p>
      </div>

      <Card className="rounded-2xl p-6 space-y-6">
        <div className="space-y-4">
          {/* Amount and Currency Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                You Send
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Amount"
                  value={displayAmount}
                  onChange={handleAmountChange}
                  className="text-right"
                />
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                They Receive
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={convertedAmount}
                  readOnly
                  className="text-right"
                />
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
          </div>

          {/* Recipient Details */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Recipient&apos;s Bank Account
            </label>
            <Input placeholder="Account Number" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Bank Name
            </label>
            <Input placeholder="Recipient's Bank Name" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Swift/BIC Code
              </label>
              <Input placeholder="SWIFT/BIC Code" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Routing Number
              </label>
              <Input placeholder="Routing Number" />
            </div>
          </div>
        </div>

        <Button className="w-full">Continue to Review</Button>
      </Card>

      {/* Exchange Rate Info */}
      <Card className="rounded-lg p-4 text-sm text-gray-600 dark:text-gray-400">
        <p>
          Exchange Rate: 1 {fromCurrency} ={" "}
          {rates?.conversion_rates?.[toCurrency]
            ? formatNumberWithCommas(
                rates.conversion_rates[toCurrency].toFixed(4)
              )
            : "0.0000"}{" "}
          {toCurrency}
        </p>
        <p className="mt-1">Estimated delivery: 1-2 business days</p>
      </Card>
    </motion.div>
  );
}
