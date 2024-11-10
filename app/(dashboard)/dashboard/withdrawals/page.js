"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  CreditCard,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Clock,
  BadgeCheck,
  AlertCircle,
  Info,
  Copy,
  Network,
  Scan,
  Plus,
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBanking } from "@/contexts/BankingContext";
import { toast } from "sonner";

// Animation variants
const variants = {
  cardVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  listVariants: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }
};

const withdrawalMethods = [
  {
    id: "bank-transfer",
    title: "Bank Transfer",
    shortTitle: "Bank",
    description: "Withdraw to your bank account",
    icon: Building2,
    processingTime: "1-2 business days",
    fee: "Free",
    minAmount: 50,
    maxAmount: 50000,
    color: "blue",
  },
  {
    id: "card",
    title: "Debit Card",
    shortTitle: "Card",
    description: "Instant withdrawal to card",
    icon: CreditCard,
    processingTime: "Instant",
    fee: "1.5%",
    minAmount: 10,
    maxAmount: 25000,
    color: "green",
  },
  {
    id: "crypto",
    title: "Cryptocurrency",
    shortTitle: "Crypto",
    description: "Withdraw to crypto wallet",
    icon: Wallet,
    processingTime: "10-30 minutes",
    fee: "Network fee",
    minAmount: 20,
    maxAmount: 100000,
    color: "purple",
  },
];

const CURRENCY_SYMBOLS = {
  NGN: "₦",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  INR: "₹",

};

// Format amount with proper currency symbol and separators

const formatAmount = (value, currency) => {
  // Remove all non-numeric characters except decimal point
  const cleaned = value.replace(/[^0-9.]/g, "");

  // Ensure only one decimal point
  const parts = cleaned.split(".");
  const formatted =
    parts[0] + (parts.length > 1 ? "." + parts[1].slice(0, 2) : "");

  if (formatted === "") return "";

  const number = parseFloat(formatted);
  if (isNaN(number)) return "";

  return number.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

const formatCurrency = (amount, currency) => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      notation: amount > 99999 ? "compact" : "standard",
    }).format(amount);
  } catch (error) {
    // Fallback formatting for unsupported currencies
    const symbol = CURRENCY_SYMBOLS[currency] || currency + " ";
    return `${symbol}${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
};

export default function WithdrawalsPage() {
  const { balances, bankAccounts, handleWithdrawal } = useBanking();
  const [selectedCurrency, setSelectedCurrency] = useState(
    Object.keys(balances)[0]
  );
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("bank-transfer");
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle amount input change
  const handleAmountChange = (e) => {
    const inputValue = e.target.value;

    // Remove currency symbols and commas
    const rawValue = inputValue.replace(/[^0-9.]/g, "");

    // Validate decimal places
    if (rawValue.includes(".")) {
      const decimalPlaces = rawValue.split(".")[1];
      if (decimalPlaces && decimalPlaces.length > 2) return;
    }

    // Update the raw amount
    setAmount(rawValue);
  };

  // Calculate fees based on method
  const calculateFee = (method, amount) => {
    const numAmount = parseFloat(amount) || 0;
    switch (method) {
      case "card":
        return numAmount * 0.015; // 1.5%
      case "crypto":
        return 5; // Fixed network fee
      default:
        return 0;
    }
  };

  // Function to get currency symbol
  const getCurrencySymbol = (currency) => {
    return CURRENCY_SYMBOLS[currency] || currency;
  };

  // Handle currency change
  const handleCurrencyChange = (newCurrency) => {
    setSelectedCurrency(newCurrency);
    // Optionally recalculate the amount if needed
    if (amount) {
      const numAmount = parseFloat(amount);
      if (!isNaN(numAmount)) {
        setAmount(numAmount.toString());
      }
    }
  };
  const handleWithdrawalSubmit = async () => {
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const method = withdrawalMethods.find((m) => m.id === selectedMethod);
    if (numAmount < method.minAmount || numAmount > method.maxAmount) {
      toast.error(
        `Amount must be between ${formatCurrency(
          method.minAmount,
          selectedCurrency
        )} and ${formatCurrency(method.maxAmount, selectedCurrency)}`
      );
      return;
    }

    if (numAmount > balances[selectedCurrency]) {
      toast.error("Insufficient balance");
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const success = handleWithdrawal(numAmount, selectedCurrency);

      if (success) {
        toast.success(
          `Successfully withdrawn ${formatCurrency(
            numAmount,
            selectedCurrency
          )}`
        );
        setAmount("");
      } else {
        throw new Error("Withdrawal failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants.containerVariants}
      className="max-w-4xl mx-auto space-y-8 pb-8"
    >
      {/* Header */}
      <motion.div variants={variants.listVariants} className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Withdraw Funds
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Quick and secure withdrawals to your preferred destination
        </p>
      </motion.div>

      {/* Enhanced Balance Cards */}
      <motion.div
        variants={variants.containerVariants}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
      >
        {Object.entries(balances).map(([currency, balance]) => (
          <motion.div
            key={currency}
            variants={variants.cardVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`relative overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer ${
                currency === selectedCurrency ? "ring-2 ring-indigo-500" : ""
              }`}
              onClick={() => setSelectedCurrency(currency)}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-blue-500" />
              <CardContent className="pt-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {currency}
                    </p>
                    {currency === selectedCurrency && (
                      <Badge variant="secondary" className="text-xs">
                        Selected
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">
                    {formatCurrency(balance, currency)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Available Balance
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Amount Input Section */}
      <motion.div variants={variants.listVariants}>
        <Card className="border-none shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <span>Withdrawal Amount</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the amount you wish to withdraw</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>
              Available balance:{" "}
              {formatCurrency(balances[selectedCurrency], selectedCurrency)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="0.00"
                  onChange={handleAmountChange}
                  value={
                    amount ? `${formatAmount(amount, selectedCurrency)}` : ""
                  }
                  className="text-lg pl-8 font-mono"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono">
                  {getCurrencySymbol(selectedCurrency)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Select Currency
                  </label>
                  <Select
                    value={selectedCurrency}
                    onValueChange={handleCurrencyChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(balances).map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono">
                              {getCurrencySymbol(currency)}
                            </span>
                            <span>{currency}</span>
                            <span className="text-gray-500 text-sm">
                              ({formatCurrency(balances[currency], currency)})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {parseFloat(amount) > 0 && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 gap-4 text-sm"
                >
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">Fee</p>
                    <p className="font-medium text-gray-900 dark:text-white font-mono">
                      {formatCurrency(
                        calculateFee(selectedMethod, amount),
                        selectedCurrency
                      )}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">
                      You&apos;ll receive
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white font-mono">
                      {formatCurrency(
                        parseFloat(amount) -
                          calculateFee(selectedMethod, amount),
                        selectedCurrency
                      )}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Withdrawal Methods */}
      <motion.div variants={variants.listVariants}>
        <Tabs
          value={selectedMethod}
          onValueChange={setSelectedMethod}
          className="w-full"
        >
          <TabsList className="w-full h-auto grid grid-cols-3 bg-muted p-1 mb-6">
            {withdrawalMethods.map((method) => (
              <TabsTrigger
                key={method.id}
                value={method.id}
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 transition-all duration-200"
              >
                <div className="flex items-center gap-2 py-2">
                  <div
                    className={`p-1.5 rounded-lg bg-${method.color}-50 dark:bg-${method.color}-900/20`}
                  >
                    <method.icon
                      className={`h-4 w-4 text-${method.color}-600 dark:text-${method.color}-400`}
                    />
                  </div>
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

          {withdrawalMethods.map((method) => (
            <TabsContent key={method.id} value={method.id}>
              <Card className="border-none shadow-lg">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-lg bg-${method.color}-50 dark:bg-${method.color}-900/20`}
                    >
                      <method.icon
                        className={`h-6 w-6 text-${method.color}-600 dark:text-${method.color}-400`}
                      />
                    </div>
                    <div>
                      <CardTitle>{method.title}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </div>
                  </div>

                  {/* Method Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Processing Time</p>
                        <p className="text-xs text-gray-500">
                          {method.processingTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <BadgeCheck className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Transaction Fee</p>
                        <p className="text-xs text-gray-500">{method.fee}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <ShieldCheck className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Security</p>
                        <p className="text-xs text-gray-500">Fully Protected</p>
                      </div>
                    </div>
                  </div>

                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Withdrawal Limits</AlertTitle>
                    <AlertDescription>
                      Min: {formatCurrency(method.minAmount, selectedCurrency)}{" "}
                      | Max:{" "}
                      {formatCurrency(method.maxAmount, selectedCurrency)} per
                      transaction
                    </AlertDescription>
                  </Alert>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                  {method.id === "bank-transfer" && (
                    <div className="space-y-6">
                      <Select
                        value={selectedBank}
                        onValueChange={setSelectedBank}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a saved bank account" />
                        </SelectTrigger>
                        <SelectContent>
                          <div className="p-2 space-y-2">
                            {bankAccounts.map((account) => (
                              <SelectItem
                                key={account.id}
                                value={account.id.toString()}
                              >
                                <div className="flex items-center gap-3">
                                  <Building2 className="h-4 w-4 text-gray-500" />
                                  <div className="flex flex-col">
                                    <span className="font-medium">
                                      {account.bankName}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      ••••{account.accountNumber.slice(-4)}
                                    </span>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                            <SelectItem value="new" className="text-indigo-600">
                              <div className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Add New Bank Account
                              </div>
                            </SelectItem>
                          </div>
                        </SelectContent>
                      </Select>

                      <AnimatePresence>
                        {selectedBank === "new" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Bank Name
                                </label>
                                <Input placeholder="Enter bank name" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Account Number
                                </label>
                                <Input placeholder="Enter account number" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Account Name
                                </label>
                                <Input placeholder="Enter account name" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Swift/BIC Code
                                </label>
                                <Input placeholder="Optional" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <Info className="h-4 w-4 text-blue-500" />
                              <p className="text-sm text-blue-600 dark:text-blue-400">
                                New bank accounts require 24h verification
                                period
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {method.id === "card" && (
                    <div className="space-y-6">
                      <div className="relative">
                        <label className="text-sm font-medium">
                          Card Number
                        </label>
                        <div className="mt-1 relative">
                          <Input
                            placeholder="0000 0000 0000 0000"
                            className="pl-10 font-mono"
                          />
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Scan className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Expiry Date
                          </label>
                          <Input placeholder="MM/YY" className="font-mono" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">CVV</label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-4 w-4 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  3-digit security code on the back of your card
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Input
                            type="password"
                            maxLength={3}
                            className="font-mono"
                            placeholder="•••"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Your card details are encrypted and secure
                        </p>
                      </div>
                    </div>
                  )}

                  {method.id === "crypto" && (
                    <div className="space-y-6">
                      <Select defaultValue="btc">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <div className="p-2 space-y-2">
                            {[
                              {
                                id: "btc",
                                name: "Bitcoin",
                                symbol: "BTC",
                                icon: "₿",
                              },
                              {
                                id: "eth",
                                name: "Ethereum",
                                symbol: "ETH",
                                icon: "Ξ",
                              },
                              {
                                id: "usdt",
                                name: "Tether",
                                symbol: "USDT",
                                icon: "₮",
                              },
                            ].map((crypto) => (
                              <SelectItem key={crypto.id} value={crypto.id}>
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    <span className="text-lg">
                                      {crypto.icon}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-medium">{crypto.name}</p>
                                    <p className="text-xs text-gray-500">
                                      {crypto.symbol}
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </div>
                        </SelectContent>
                      </Select>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Wallet Address
                        </label>
                        <div className="relative">
                          <Input
                            placeholder="Enter your wallet address"
                            className="pr-24 font-mono text-sm"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Paste
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Network</label>
                        <Select defaultValue="native">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              {
                                id: "native",
                                name: "Native Network",
                                desc: "Default blockchain",
                              },
                              {
                                id: "bsc",
                                name: "BNB Smart Chain",
                                desc: "BSC network",
                              },
                              {
                                id: "polygon",
                                name: "Polygon Network",
                                desc: "MATIC network",
                              },
                            ].map((network) => (
                              <SelectItem key={network.id} value={network.id}>
                                <div className="flex items-center gap-3">
                                  <Network className="h-4 w-4 text-gray-500" />
                                  <div>
                                    <p className="font-medium">
                                      {network.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {network.desc}
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertTitle className="text-yellow-600">
                          Important
                        </AlertTitle>
                        <AlertDescription className="text-yellow-600">
                          Please ensure you&apos;ve selected the correct
                          network. Wrong network selection may result in lost
                          funds.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  <div className="space-y-4">
                    <Button
                      size="lg"
                      className="w-full relative"
                      disabled={isProcessing || !amount || amount <= 0}
                      onClick={handleWithdrawalSubmit}
                    >
                      {isProcessing ? (
                        <>
                          <span className="animate-pulse">Processing...</span>
                        </>
                      ) : (
                        <>
                          Withdraw{" "}
                          {amount > 0 &&
                            formatCurrency(amount, selectedCurrency)}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {amount > 0 && (
                      <div className="text-center text-sm text-gray-500">
                        You&apos;ll receive approximately{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(
                            parseFloat(amount) -
                              calculateFee(selectedMethod, amount),
                            selectedCurrency
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* Security Info */}
      <motion.div
        variants={variants.listVariants}
        className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg p-4"
      >
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          <div className="space-y-1">
            <p className="font-medium text-gray-900 dark:text-white">
              Secure Transaction
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              All withdrawals are protected with bank-grade encryption and
              require 2FA verification for your security.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}