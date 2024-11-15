"use client";

import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import {
  CreditCard,
  Eye,
  EyeOff,
  Copy,
  Check,
  Shield,
  RefreshCw,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const generateCardNumber = () => {
  const prefix = "4532";
  let number = prefix;
  for (let i = 0; i < 12; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number.match(/.{1,4}/g).join(" ");
};

const generateExpiryDate = () => {
  const date = new Date();
  const year = (date.getFullYear() + 4).toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${month}/${year}`;
};

const generateCVV = () => {
  return Math.floor(Math.random() * 900 + 100).toString();
};

function CardsPage() {
  const { user } = useUser();
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    setCardDetails({
      number: generateCardNumber(),
      expiry: generateExpiryDate(),
      cvv: generateCVV(),
    });
  }, []);

  const handleCopy = () => {
    if (cardDetails) {
      navigator.clipboard.writeText(cardDetails.number.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Virtual Card
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your secure virtual card for online transactions
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-20 pointer-events-none" />
        <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-4 sm:p-8 text-white shadow-xl">
          {/* Chip and Network Logo */}
          <div className="flex justify-between items-start mb-4 sm:mb-8">
            <div className="w-8 h-6 sm:w-12 sm:h-10 bg-yellow-300/80 rounded-lg flex items-center justify-center">
              <div className="w-6 h-4 sm:w-8 sm:h-6 bg-yellow-400/90 rounded" />
            </div>
            <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-white/80" />
          </div>

          {/* Card Number */}
          <div className="mb-4 sm:mb-8">
            <div className="text-lg sm:text-2xl font-mono tracking-wider">
              {showCardDetails && cardDetails
                ? cardDetails.number
                : "•••• •••• •••• ••••"}
            </div>
          </div>

          {/* Card Details Container */}
          <div className="flex flex-col sm:flex-row justify-between">
            {/* Card Holder and Expiry */}
            <div className="flex justify-between w-full sm:w-2/3 mb-4 sm:mb-0">
              <div>
                <div className="text-xs text-white/60 mb-1">CARD HOLDER</div>
                <div className="text-sm sm:text-base font-medium tracking-wide">
                  {user?.fullName?.toUpperCase() || "CARD HOLDER"}
                </div>
              </div>
              <div className="text-right sm:hidden">
                <div className="text-xs text-white/60 mb-1">EXPIRES</div>
                <div className="text-sm font-medium">
                  {showCardDetails && cardDetails
                    ? cardDetails.expiry
                    : "••/••"}
                </div>
              </div>
            </div>

            {/* Expiry and CVV */}
            <div className="flex justify-between sm:justify-end w-full sm:w-1/3">
              <div className="hidden sm:block text-right">
                <div className="text-xs text-white/60 mb-1">EXPIRES</div>
                <div className="text-sm sm:text-base font-medium">
                  {showCardDetails && cardDetails
                    ? cardDetails.expiry
                    : "••/••"}
                </div>
              </div>
              <div className="text-right sm:absolute sm:right-8 sm:bottom-8">
                <div className="text-xs text-white/60 mb-1">CVV</div>
                <div className="text-sm sm:text-base font-medium">
                  {showCardDetails && cardDetails ? cardDetails.cvv : "•••"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCardDetails(!showCardDetails)}
            className="cursor-pointer"
          >
            {showCardDetails ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Details
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Details
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Number
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[
          {
            icon: Shield,
            title: "Secure Transactions",
            description: "Protected by advanced encryption",
          },
          {
            icon: RefreshCw,
            title: "Dynamic CVV",
            description: "Changes periodically for extra security",
          },
          {
            icon: Lock,
            title: "Instant Lock",
            description: "Freeze card instantly if needed",
          },
        ].map((feature, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                  <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CardsPage;
