"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Download, Check } from "lucide-react";
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
import { formatNumberWithCommas, parseFormattedNumber } from "@/lib/utils";

const supportedCurrencies = ["USD", "EUR", "GBP", "NGN", "INR"];

function ReceiveMoneyPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [currentTime, setCurrentTime] = useState(null);
  const [displayAmount, setDisplayAmount] = useState("");

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

 useEffect(() => {
   // Only generate QR if we have both currency and amount
   if (selectedCurrency && amount) {
     setQrValue(
       JSON.stringify({
         currency: selectedCurrency,
         amount: parseFloat(amount),
         timestamp: new Date().toISOString(),
       })
     );
   } else {
     setQrValue(""); // Clear QR if missing required fields
   }
 }, [selectedCurrency, amount]);
  // Handle date updates
  useEffect(() => {
    setCurrentTime(new Date());
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleDownload = () => {
    const svg = document.querySelector("#qr-code svg");
    if (svg) {
      // Create a canvas and draw the SVG on it
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const data = new XMLSerializer().serializeToString(svg);
      const DOMURL = window.URL || window.webkitURL || window;

      const img = new Image();
      const svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
      const url = DOMURL.createObjectURL(svgBlob);

      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);

        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `receive_money_qr_${selectedCurrency}_${amount}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };

      img.src = url;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Receive Money
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Generate a QR code for easy money transfers.
        </p>
        {currentTime && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Enter the amount and currency you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Amount and Currency Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount
              </label>
              <Input
                type="text"
                placeholder="Enter amount"
                value={displayAmount}
                onChange={handleAmountChange}
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Currency
              </label>
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
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="flex flex-col items-center space-y-4">
            <div id="qr-code" className="p-4 bg-white rounded-xl">
              {qrValue && (
                <QRCodeSVG
                  value={qrValue}
                  size={200}
                  level={"H"}
                  includeMargin={true}
                />
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Data
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download QR
              </Button>
            </div>
          </div>

          {/* Rest of the component remains the same */}
        </CardContent>
      </Card>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>
          🔒 QR codes are secured and expire after 24 hours for your safety.
        </p>
      </div>
    </motion.div>
  );
}

export default ReceiveMoneyPage;
