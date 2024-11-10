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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { QrScanner } from "@yudiel/react-qr-scanner";
import {
  formatNumberWithCommas,
  parseFormattedNumber,
  formatCurrency,
} from "@/lib/utils";
import staticRates from "@/lib/mock-data/static-rates";
import {
  QrCode,
  ScanLine,
  Building2,
  ArrowRight,
  Info,
  Copy,
  Check,
  AlertCircle,
  RefreshCw,
  ArrowLeftRight,
} from "lucide-react";

const CURRENCY_SYMBOLS = {
  NGN: "₦",
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

const supportedCurrencies = ["USD", "EUR", "GBP", "NGN", "INR"];

const nigerianBanks = [
  { id: "access", name: "Access Bank" },
  { id: "gtb", name: "GT Bank" },
  { id: "first", name: "First Bank" },
  { id: "uba", name: "UBA" },
  { id: "zenith", name: "Zenith Bank" },
  { id: "kuda", name: "Kuda Bank" },
];

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

export default function SendMoneyPage() {
  // State for transfer types
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [intAmount, setIntAmount] = useState("");
  const [intDisplayAmount, setIntDisplayAmount] = useState("");
  const [localAmount, setLocalAmount] = useState("");
  const [localDisplayAmount, setLocalDisplayAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Function to handle QR code scan
  const handleScan = async (data) => {
    if (data) {
      try {
        const scanData = JSON.parse(data);
        if (scanData.accountNumber && scanData.bankId) {
          setAccountNumber(scanData.accountNumber);
          setSelectedBank(scanData.bankId);
          setIsScanning(false);
          toast.success("Account details scanned successfully!");
        } else {
          throw new Error("Invalid QR code format");
        }
      } catch (error) {
        setError("Invalid QR code. Please try again.");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError(
      "Failed to access camera. Please ensure camera permissions are granted."
    );
  };

  const handleAmountChange = (value, isLocal = false) => {
    if (value === "") {
      if (isLocal) {
        setLocalAmount("");
        setLocalDisplayAmount("");
      } else {
        setIntAmount("");
        setIntDisplayAmount("");
      }
      return;
    }

    const rawValue = value.replace(/[^0-9.]/g, "");
    if (rawValue.includes(".")) {
      const decimalPlaces = rawValue.split(".")[1];
      if (decimalPlaces && decimalPlaces.length > 2) return;
    }

    if (isLocal) {
      setLocalDisplayAmount(formatAmount(rawValue, "NGN"));
      setLocalAmount(rawValue);
    } else {
      setIntDisplayAmount(formatAmount(rawValue, fromCurrency));
      setIntAmount(rawValue);
    }
  };

  const formatAmount = (value, currency) => {
    if (!value) return "";
    const number = parseFloat(value);
    if (isNaN(number)) return "";

    return number.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const rate = staticRates[fromCurrency][toCurrency];
  const convertedAmount = (parseFloat(intAmount || 0) * rate).toFixed(2);

  const handleCopyAccount = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast.success("Account number copied!");
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants.containerVariants}
      className="max-w-2xl mx-auto space-y-8 pb-8"
    >
      {/* Header */}
      <motion.div variants={variants.listVariants} className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Send Money
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Fast and secure money transfers to anyone, anywhere.
        </p>
      </motion.div>
      {/* Main Tabs */}
      <Tabs defaultValue="local" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full bg-muted">
          <TabsTrigger
            value="local"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>Local Transfer</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="international"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="h-4 w-4" />
              <span>International</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Local Transfer Content */}
        <TabsContent value="local">
          <Card className="border-none shadow-lg">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Local Transfer</CardTitle>
                  <CardDescription>Send money within Nigeria</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <QrCode className="h-4 w-4" />
                      Scan QR
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Scan Account QR Code</DialogTitle>
                      <DialogDescription>
                        Point your camera at the recipient&apos;s QR code to
                        automatically fill their details
                      </DialogDescription>
                    </DialogHeader>
                    <div className="w-full aspect-square overflow-hidden rounded-lg">
                      {isScanning ? (
                        <QrScanner
                          onDecode={handleScan}
                          onError={handleError}
                          className="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
                          <ScanLine className="h-12 w-12 text-gray-400 mb-4" />
                          <Button onClick={() => setIsScanning(true)}>
                            Start Scanning
                          </Button>
                        </div>
                      )}
                    </div>
                    {scanError && (
                      <Alert variant="destructive">
                        <AlertDescription>{scanError}</AlertDescription>
                      </Alert>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="relative">
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    Amount (NGN)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter the amount you want to send</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <Input
                    type="text"
                    placeholder="0.00"
                    value={localDisplayAmount}
                    onChange={(e) => handleAmountChange(e.target.value, true)}
                    className="text-lg pl-8 font-mono"
                  />
                  <span className="absolute left-3 top-[2.5rem] text-gray-500 font-mono">
                    ₦
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    Account Number
                    {accountNumber && (
                      <Badge variant="outline" className="font-mono">
                        {accountNumber}
                      </Badge>
                    )}
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="Enter account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="font-mono"
                    />
                    {accountNumber && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => handleCopyAccount(accountNumber)}
                      >
                        {isCopied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bank Name</label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {nigerianBanks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            {bank.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                className="w-full"
                disabled={!localAmount || !accountNumber || !selectedBank}
              >
                Continue to Send
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Alert className="bg-blue-50 dark:bg-blue-900/20">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-600 dark:text-blue-400">
                  Instant transfers to all Nigerian banks
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* International Transfer Content */}
        <TabsContent value="international">
          <Card className="border-none shadow-lg">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>International Transfer</CardTitle>
                  <CardDescription>Send money across borders</CardDescription>
                </div>
                <Badge variant="outline" className="font-mono">
                  Rate: {rate.toFixed(4)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-6">
                {/* Amount Exchange Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Send Amount */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      You Send
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enter the amount you want to send</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <div className="relative flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          type="text"
                          placeholder="0.00"
                          value={intDisplayAmount}
                          onChange={(e) => handleAmountChange(e.target.value)}
                          className="pl-8 font-mono text-lg"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono">
                          {CURRENCY_SYMBOLS[fromCurrency]}
                        </span>
                      </div>
                      <Select
                        value={fromCurrency}
                        onValueChange={setFromCurrency}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {supportedCurrencies.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              <div className="flex items-center gap-2">
                                <span className="font-mono">
                                  {CURRENCY_SYMBOLS[currency]}
                                </span>
                                <span>{currency}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Receive Amount */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      They Receive
                      <Badge variant="secondary" className="font-mono text-xs">
                        Rate: {rate.toFixed(4)}
                      </Badge>
                    </label>
                    <div className="relative flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          type="text"
                          value={formatAmount(convertedAmount, toCurrency)}
                          readOnly
                          className="pl-8 font-mono text-lg bg-gray-50 dark:bg-gray-800"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono">
                          {CURRENCY_SYMBOLS[toCurrency]}
                        </span>
                      </div>
                      <Select value={toCurrency} onValueChange={setToCurrency}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {supportedCurrencies
                            .filter((c) => c !== fromCurrency)
                            .map((currency) => (
                              <SelectItem key={currency} value={currency}>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">
                                    {CURRENCY_SYMBOLS[currency]}
                                  </span>
                                  <span>{currency}</span>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Recipient Details Section */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-900 dark:text-white">
                    Recipient Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input placeholder="Recipient's first name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input placeholder="Recipient's last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      IBAN/Account Number
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              International Bank Account Number or local account
                              number
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <Input
                      placeholder="Enter IBAN or account number"
                      className="font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bank Name</label>
                    <Input placeholder="Recipient's bank name" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        Swift/BIC Code
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Bank Identifier Code for international transfers
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </label>
                      <Input
                        placeholder="e.g., KUDAGB2L"
                        className="font-mono uppercase"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Routing Number
                      </label>
                      <Input
                        placeholder="Bank routing number"
                        className="font-mono"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  disabled={!intAmount || parseFloat(intAmount) <= 0}
                >
                  Review Transfer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {/* Transfer Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">
                      Transfer Fee
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white font-mono">
                      {formatCurrency(10, fromCurrency)}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">
                      Delivery Time
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      1-2 Business Days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-600">
              International transfers may be subject to additional verification
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      {/* Security Note */}
      <motion.div
        variants={variants.listVariants}
        className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4"
      >
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div className="space-y-1">
            <p className="font-medium text-gray-900 dark:text-white">
              Secure Transfers
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              All transfers are protected with bank-grade encryption and require
              2FA verification for your security.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
