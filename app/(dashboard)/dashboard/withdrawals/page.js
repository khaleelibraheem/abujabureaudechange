"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  CreditCard,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Clock,
  BadgeCheck,
  AlertCircle,
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
import { useBanking } from "@/contexts/BankingContext";
import { toast } from "sonner";
import {
  formatNumberWithCommas,
  parseFormattedNumber,
  formatCurrency,
} from "@/lib/utils";


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
  },
];

export default function WithdrawalsPage() {
  const { balances, bankAccounts, handleWithdrawal } = useBanking();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [displayAmount, setDisplayAmount] = useState("");

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      notation: amount > 99999 ? "compact" : "standard",
    }).format(amount);
  };

  // Handle amount input change with formatting
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

  const handleWithdrawalSubmit = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (numericAmount > balances[selectedCurrency]) {
      toast.error("Insufficient balance");
      return;
    }

    const success = handleWithdrawal(numericAmount, selectedCurrency);
    if (success) {
      toast.success(
        `Successfully withdrawn ${formatCurrency(
          numericAmount,
          selectedCurrency
        )}`
      );
      setAmount("");
      setDisplayAmount("");
    } else {
      toast.error("Withdrawal failed");
    }
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
          Withdraw Funds
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Choose your preferred withdrawal method
        </p>
      </div>

      {/* Available Balance Card */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Object.entries(balances).map(([currency, balance]) => (
          <Card key={currency} className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-blue-500" />
            <CardContent className="pt-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {currency}
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatCurrency(balance, currency)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Available Balance
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Amount Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Amount</CardTitle>
          <CardDescription>
            Enter the amount you want to withdraw
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
                  {Object.keys(balances).map((currency) => (
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
      {/* Withdrawal Methods Tabs */}
      <Tabs defaultValue="bank-transfer" className="w-full">
        <TabsList className="w-full h-auto grid grid-cols-3 bg-muted p-1 mb-6">
          {withdrawalMethods.map((method) => (
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

        {withdrawalMethods.map((method) => (
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

                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Withdrawal Limits</AlertTitle>
                  <AlertDescription>
                    Min: ${method.minAmount.toLocaleString()} | Max: $
                    {method.maxAmount.toLocaleString()} per transaction
                  </AlertDescription>
                </Alert>

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
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Select Bank Account
                      </label>
                      <Select
                        value={selectedBank}
                        onValueChange={setSelectedBank}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a saved bank account" />
                        </SelectTrigger>
                        <SelectContent>
                          {bankAccounts.map((account) => (
                            <SelectItem
                              key={account.id}
                              value={account.id.toString()}
                            >
                              {account.bankName} - {account.accountNumber}
                            </SelectItem>
                          ))}
                          <SelectItem value="new">
                            + Add New Bank Account
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedBank === "new" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Your existing bank account form fields */}
                      </div>
                    ) : null}
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
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Wallet Address
                      </label>
                      <Input placeholder="Enter your wallet address" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Network</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select network" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btc">Bitcoin Network</SelectItem>
                          <SelectItem value="eth">Ethereum Network</SelectItem>
                          <SelectItem value="bsc">BNB Smart Chain</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleWithdrawalSubmit}
                >
                  Withdraw Funds <ArrowRight className="ml-2 h-4 w-4" />
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
          All withdrawals are protected with bank-grade security and require 2FA
          verification.
        </div>
      </div>
    </motion.div>
  );
}
