"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Download,
  Check,
  QrCode,
  Share2,
  RefreshCw,
  AlertCircle,
  Building2,
  CreditCard,
  User,
} from "lucide-react";
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
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { formatNumberWithCommas, parseFormattedNumber } from "@/lib/utils";

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  NGN: "₦",
  INR: "₹",
};

const supportedCurrencies = ["USD", "EUR", "GBP", "NGN", "INR"];

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ReceiveMoneyPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [displayAmount, setDisplayAmount] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipientName, setRecipientName] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setAmount("");
      setDisplayAmount("");
      return;
    }

    const rawValue = value.replace(/[^0-9.]/g, "");
    if (rawValue.includes(".")) {
      const decimalPlaces = rawValue.split(".")[1];
      if (decimalPlaces && decimalPlaces.length > 2) return;
    }

    const formattedValue = formatNumberWithCommas(rawValue);
    setDisplayAmount(formattedValue);
    setAmount(rawValue);
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setAccountNumber(value);
  };

  useEffect(() => {
    if (
      selectedCurrency &&
      amount &&
      bankName &&
      accountNumber &&
      recipientName
    ) {
      setIsGenerating(true);
      const timer = setTimeout(() => {
        setQrValue(
          JSON.stringify({
            currency: selectedCurrency,
            amount: parseFloat(amount),
            bankName: bankName,
            accountNumber: accountNumber,
            recipientName: recipientName,
            timestamp: new Date().toISOString(),
          })
        );
        setIsGenerating(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setQrValue("");
    }
  }, [selectedCurrency, amount, bankName, accountNumber, recipientName]);

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svg = document.querySelector("#qr-code svg");
    if (svg) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const data = new XMLSerializer().serializeToString(svg);
      const DOMURL = window.URL || window.webkitURL || window;

      const img = new Image();
      const svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
      const url = DOMURL.createObjectURL(svgBlob);

      img.onload = function () {
        canvas.width = img.width * 2;
        canvas.height = img.height * 2;
        ctx.scale(2, 2);
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);

        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `payment_qr_${selectedCurrency}_${amount}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };

      img.src = url;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Payment QR Code",
          text: `Payment request for ${CURRENCY_SYMBOLS[selectedCurrency]}${amount} to ${bankName} - ${accountNumber}`,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Receive Money
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Generate a secure QR code for instant bank transfers
        </p>
        <Badge variant="outline" className="text-xs">
          QR codes valid for 24 hours
        </Badge>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Set up your payment request details below
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recipient Name</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter recipient name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="pl-8"
                />
                <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="0.00"
                  value={displayAmount}
                  onChange={handleAmountChange}
                  className="pl-8 text-lg font-mono"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {CURRENCY_SYMBOLS[selectedCurrency]}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <Select
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
              >
                <SelectTrigger>
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

            <div className="space-y-2">
              <label className="text-sm font-medium">Bank Name</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter bank name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="pl-8"
                />
                <Building2 className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Account Number</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                  className="pl-8"
                  maxLength={11}
                />
                <CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            {amount && selectedCurrency && bankName && accountNumber ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative"
              >
                <div
                  id="qr-code"
                  className={`p-6 bg-white rounded-xl shadow-sm ${
                    isGenerating ? "opacity-50" : ""
                  }`}
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center w-[200px] h-[200px]">
                      <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                  ) : (
                    qrValue && (
                      <QRCodeSVG
                        value={qrValue}
                        size={200}
                        level="H"
                        includeMargin={true}
                      />
                    )
                  )}
                </div>
                <div className="absolute -top-3 -right-3">
                  <Badge className="bg-green-500 text-white border-green-500">
                    Active
                  </Badge>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl border-gray-200 dark:border-gray-700 w-full max-w-[300px]">
                <QrCode className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-gray-500 text-center">
                  Fill in all details to generate QR code
                </p>
              </div>
            )}

            {qrValue && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap justify-center gap-2"
              >
                <Button variant="outline" onClick={handleCopy}>
                  {copied ? (
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                {navigator.share && (
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Alert className="bg-blue-50 dark:bg-blue-900/20 mt-4">
            <AlertCircle className="h-4 w-4 text-blue-500 mt-[-4px]" />
            <AlertDescription className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">
              This QR code will expire in 24 hours for security purposes
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
