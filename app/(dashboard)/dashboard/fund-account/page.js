"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Building2,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Clock,
  BadgeCheck,
  Copy,
  Check,
  Info,
  AlertCircle,
  QrCode,
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

import QRCode from "react-qr-code";
import { Download } from "lucide-react";

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
  },
};

const CURRENCY_SYMBOLS = {
  NGN: "₦",
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

const fundingMethods = [
  {
    id: "bank-transfer",
    title: "Bank Transfer",
    shortTitle: "Bank",
    description: "Transfer from your bank account",
    icon: Building2,
    processingTime: "1-2 business days",
    fee: "Free",
    color: "blue",
    minAmount: 5,
    maxAmount: Infinity,
  },
  {
    id: "card",
    title: "Debit/Credit Card",
    shortTitle: "Card",
    description: "Instant funding with card",
    icon: CreditCard,
    processingTime: "Instant",
    fee: "2.5%",
    color: "green",
    minAmount: 5,
    maxAmount: Infinity,
  },
  {
    id: "crypto",
    title: "Cryptocurrency",
    shortTitle: "Crypto",
    description: "Fund with digital currencies",
    icon: Wallet,
    processingTime: "10-30 minutes",
    fee: "1%",
    color: "purple",
    minAmount: 5,
    maxAmount: Infinity,
  },
];

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
  // Special handling for NGN to use ₦ symbol
  if (currency === "NGN") {
    return `₦${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  // Regular handling for other currencies
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      notation: "standard",
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

const calculateFee = (method, amount) => {
  switch (method) {
    case "card":
      return amount * 0.025; // 2.5%
    case "crypto":
      return amount * 0.01; // 1%
    default:
      return 0;
  }
};

// QR Code component with download functionality
function QRCodeWithDownload({ value, size = 156 }) {
  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "crypto-address-qr.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="relative group">
          <QRCode
            id="qr-code"
            value={value}
            size={size}
            level="H"
            className="rounded-lg"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center"
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white hover:bg-black/20"
              onClick={downloadQR}
            >
              <Download className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </div>
      <p className="text-xs text-center text-gray-500">
        Scan with your wallet app or download QR
      </p>
    </div>
  );
}

export default function FundAccountPage() {
  const { handleFunding } = useBanking();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("bank-transfer");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getCurrencySymbol = (currency) => {
    return CURRENCY_SYMBOLS[currency] || currency;
  };

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    const rawValue = inputValue.replace(/[^0-9.]/g, "");

    if (rawValue.includes(".")) {
      const decimalPlaces = rawValue.split(".")[1];
      if (decimalPlaces && decimalPlaces.length > 2) return;
    }

    setAmount(rawValue);
  };

  const handleCopyClick = async (text) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast.success("Address copied to clipboard");
  };

  const handleFundingSubmit = async () => {
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const method = fundingMethods.find((m) => m.id === selectedMethod);
    if (numAmount < method.minAmount) {
      toast.error(
        `Amount must be at least ${formatCurrency(
          method.minAmount,
          selectedCurrency
        )}`
      );
      return;
    }

    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      handleFunding(numAmount, selectedCurrency);
      toast.success(
        `Successfully initiated funding of ${formatCurrency(
          numAmount,
          selectedCurrency
        )}`
      );
      setAmount("");
    } catch (error) {
      toast.error("Funding failed. Please try again.");
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
      {/* Enhanced Header */}
      <motion.div variants={variants.listVariants} className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Fund Account
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Add funds to your account securely and instantly
        </p>
      </motion.div>

      {/* Amount Input Section */}
      <motion.div variants={variants.listVariants}>
        <Card className="border-none shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <span>Funding Amount</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the amount you wish to fund</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>
              Choose your preferred currency and enter amount
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="0.00"
                  onChange={handleAmountChange}
                  value={amount ? formatAmount(amount, selectedCurrency) : ""}
                  className="text-lg pl-8 font-mono"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono">
                  {getCurrencySymbol(selectedCurrency)}
                </span>
              </div>

              <Select
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(CURRENCY_SYMBOLS).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">
                          {getCurrencySymbol(currency)}
                        </span>
                        <span>{currency}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                        calculateFee(selectedMethod, parseFloat(amount)),
                        selectedCurrency
                      )}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">
                      Total to Pay
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white font-mono">
                      {formatCurrency(
                        parseFloat(amount) +
                          calculateFee(selectedMethod, parseFloat(amount)),
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

      {/* Enhanced Funding Methods */}
      <motion.div variants={variants.listVariants}>
        <Tabs
          value={selectedMethod}
          onValueChange={setSelectedMethod}
          className="w-full"
        >
          <TabsList className="w-full h-auto grid grid-cols-3 bg-muted p-1 mb-6">
            {fundingMethods.map((method) => (
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

          {fundingMethods.map((method) => (
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
                    <AlertTitle>Transaction Limits</AlertTitle>
                    <AlertDescription>
                      Min: {formatCurrency(method.minAmount, selectedCurrency)}{" "}
                      | Max:{" "}
                      {/* {formatCurrency(method.maxAmount, selectedCurrency)} */}
                      unlimited per transaction
                    </AlertDescription>
                  </Alert>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {method.id === "bank-transfer" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            Bank Name
                          </label>
                          <div className="relative">
                            <Input
                              value="Kuda Bank"
                              readOnly
                              className="bg-gray-50 dark:bg-gray-800"
                            />
                            <Badge
                              variant="secondary"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                            >
                              Preferred Bank
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-gray-500" />
                            Account Number
                          </label>
                          <div className="relative">
                            <Input
                              value="123456789"
                              readOnly
                              className="bg-gray-50 dark:bg-gray-800 font-mono"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() => {
                                navigator.clipboard.writeText("123456789");
                                toast.success("Account number copied!");
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
                        <Info className="h-4 w-4 text-blue-500 mt-[-4px]" />
                        <AlertDescription className="text-xs md:text-sm text-blue-600 dark:text-blue-400">
                          Use your name as transfer reference to ensure quick
                          processing
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {method.id === "card" && (
                    <div className="space-y-6">
                      <div className="relative">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-gray-500" />
                          Card Number
                        </label>
                        <div className="mt-1 relative">
                          <Input
                            placeholder="0000 0000 0000 0000"
                            className="pl-10 font-mono"
                          />
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <QrCode className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            Expiry Date
                          </label>
                          <Input placeholder="MM/YY" className="font-mono" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium flex items-center gap-2">
                              <ShieldCheck className="h-4 w-4 text-gray-500" />
                              CVV
                            </label>
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

                      <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        <AlertDescription className="text-green-600 dark:text-green-400">
                          Your card details are encrypted and protected using
                          bank-grade security
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {method.id === "crypto" && (
                    <div className="space-y-6">
                      <div className="space-y-4">
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
                                      <p className="font-medium">
                                        {crypto.name}
                                      </p>
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

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-6">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Send funds to this address:
                            </span>
                            <Badge variant="outline">Network: BTC</Badge>
                          </div>
                          <div className="relative">
                            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg font-mono text-sm break-all">
                              bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() =>
                                handleCopyClick(
                                  "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                                )
                              }
                            >
                              {isCopied ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-center"
                          >
                            <QRCodeWithDownload value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" />
                          </motion.div>
                        </div>

                        <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                          <AlertTitle className="text-yellow-600">
                            Important
                          </AlertTitle>
                          <AlertDescription className="text-yellow-600">
                            Send only BTC to this address. Sending any other
                            asset may result in permanent loss.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <Button
                      size="lg"
                      className="w-full relative"
                      disabled={
                        isProcessing || !amount || parseFloat(amount) <= 0
                      }
                      onClick={handleFundingSubmit}
                    >
                      {isProcessing ? (
                        <span className="animate-pulse">Processing...</span>
                      ) : (
                        <>
                          Proceed to Fund{" "}
                          {amount > 0 &&
                            formatCurrency(
                              parseFloat(amount),
                              selectedCurrency
                            )}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {amount > 0 && (
                      <div className="text-center text-sm text-gray-500">
                        Total amount to pay:{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(
                            parseFloat(amount) +
                              calculateFee(method.id, parseFloat(amount)),
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
              All funding methods are protected with bank-grade encryption and
              require 2FA verification for your security.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
