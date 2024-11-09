"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Building2,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Clock,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { useBanking } from "@/contexts/BankingContext";
import { toast } from "sonner"; 
import {
  formatNumberWithCommas,
  parseFormattedNumber,
  formatCurrency,
} from "@/lib/utils";

const fundingMethods = [
  {
    id: "bank-transfer",
    title: "Bank Transfer",
    shortTitle: "Bank",
    description: "Transfer from your bank account",
    icon: Building2,
    processingTime: "1-2 business days",
    fee: "Free",
  },
  {
    id: "card",
    title: "Debit/Credit Card",
    shortTitle: "Card",
    description: "Instant funding with card",
    icon: CreditCard,
    processingTime: "Instant",
    fee: "2.5%",
  },
  {
    id: "crypto",
    title: "Cryptocurrency",
    shortTitle: "Crypto",
    description: "Fund with digital currencies",
    icon: Wallet,
    processingTime: "10-30 minutes",
    fee: "1%",
  },
];

export default function FundAccountPage() {
  const { handleFunding } = useBanking();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [displayAmount, setDisplayAmount] = useState("");

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


   const handleFundingSubmit = () => {
     if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
       toast.error("Please enter a valid amount");
       return;
     }

     handleFunding(parseFloat(amount), selectedCurrency);
     toast.success(
       `Successfully funded ${formatCurrency(
         parseFloat(amount),
         selectedCurrency
       )}`
     );
     setAmount("");
     setDisplayAmount("");
   };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Fund Account
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Choose your preferred method to add funds to your account
        </p>
      </div>

      {/* Amount Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Amount</CardTitle>
          <CardDescription>
            Select currency and enter the amount you want to fund
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="text"
                placeholder="Enter amount"
                value={displayAmount}
                onChange={handleAmountChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <Select
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {["USD", "EUR", "GBP", "NGN", "INR"].map((currency) => (
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

      {/* Funding Methods Tabs */}
      <Tabs defaultValue="bank-transfer" className="w-full">
        <TabsList className="w-full h-auto grid grid-cols-3 bg-muted p-1 mb-6">
          {fundingMethods.map((method) => (
            <TabsTrigger
              key={method.id}
              value={method.id}
              className="data-[state=active]:bg-background"
            >
              <div className="flex items-center gap-2 py-2">
                <method.icon className="h-4 w-4" />
                <span className="font-medium hidden sm:inline">
                  {method.title}
                </span>
                <span className="font-medium sm:hidden">
                  {method.shortTitle}
                </span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {fundingMethods.map((method) => (
          <TabsContent key={method.id} value={method.id}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                    <method.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle>{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </div>
                </div>

                <div className="hidden sm:grid grid-cols-3 gap-4 mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-start gap-2">
                    <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm">{method.processingTime}</span>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <BadgeCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm">Fee: {method.fee}</span>
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm">Secure Transfer</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {method.id === "bank-transfer" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bank Name</label>
                      <Input
                        placeholder="Enter bank name"
                        value="Kuda Bank"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Account Number
                      </label>
                      <Input
                        placeholder="Enter account number"
                        value="123456789"
                        readOnly
                      />
                    </div>
                  </div>
                )}

                {method.id === "card" && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Card Number</label>
                      <Input placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Expiry Date
                        </label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVV</label>
                        <Input
                          placeholder="123"
                          type="password"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {method.id === "crypto" && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Select Cryptocurrency
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cryptocurrency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                          <SelectItem value="usdt">Tether (USDT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Send funds to the following address:
                      </p>
                      <div className="relative">
                        <code className="block w-full p-4 bg-white dark:bg-gray-900 rounded-lg text-sm break-all">
                          bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                            )
                          }
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleFundingSubmit}
                >
                  Proceed to Fund <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Security Note */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p className="font-medium text-gray-900 dark:text-white mb-1">
            Secure Transaction
          </p>
          All transactions are protected with bank-grade security and
          encryption.
        </div>
      </div>
    </motion.div>
  );
}
