"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { AlertTriangle, Lock, RefreshCw, Shield, Wallet } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import VirtualCard from "@/components/virtualCard/VirtualCard";

// Utility functions
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
  const [showCardDetails, setShowCardDetails] = useState({
    primary: false,
    secondary: false,
  });
  const [copied, setCopied] = useState({ primary: false, secondary: false });
  const [cardDetails, setCardDetails] = useState({
    primary: null,
    secondary: null,
  });
  const [lockedCards, setLockedCards] = useState({
    primary: false,
    secondary: false,
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setCardDetails({
      primary: {
        number: generateCardNumber(),
        expiry: generateExpiryDate(),
        cvv: generateCVV(),
      },
      secondary: {
        number: generateCardNumber(),
        expiry: generateExpiryDate(),
        cvv: generateCVV(),
      },
    });
  }, []);

  const handleCopy = useCallback(
    (cardType) => {
      if (cardDetails[cardType] && !lockedCards[cardType]) {
        navigator.clipboard.writeText(
          cardDetails[cardType].number.replace(/\s/g, "")
        );
        setCopied((prev) => ({ ...prev, [cardType]: true }));
        setTimeout(
          () => setCopied((prev) => ({ ...prev, [cardType]: false })),
          2000
        );
      } else {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    },
    [cardDetails, lockedCards]
  );

  const toggleCardDetails = useCallback(
    (cardType) => {
      if (!lockedCards[cardType]) {
        setShowCardDetails((prev) => ({
          ...prev,
          [cardType]: !prev[cardType],
        }));
      } else {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    },
    [lockedCards]
  );

  const toggleLock = useCallback((cardType) => {
    setLockedCards((prev) => {
      const newState = { ...prev, [cardType]: !prev[cardType] };
      if (newState[cardType]) {
        setShowCardDetails((prev) => ({ ...prev, [cardType]: false }));
      }
      return newState;
    });
  }, []);

  const cardTypes = [
    {
      type: "primary",
      gradient: "bg-gradient-to-br from-indigo-600 to-purple-600",
      bankName: "GLOBAL BANK",
    },
    {
      type: "secondary",
      gradient: "bg-gradient-to-br from-blue-600 to-cyan-600",
      bankName: "DIGITAL BANK",
    },
  ];

  return (
    <div className="space-y-8">
      {showAlert && (
        <Alert
          variant="destructive"
          className="fixed top-4 right-4 w-auto z-50"
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Card is locked. Unlock to perform this action.
          </AlertDescription>
        </Alert>
      )}

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Wallet className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Virtual Cards
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Your secure virtual cards for online transactions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cardTypes.map(({ type, gradient, bankName }) => (
          <VirtualCard
            key={type}
            cardDetails={cardDetails?.[type]}
            showCardDetails={showCardDetails[type]}
            gradient={gradient}
            user={user}
            bankName={bankName}
            isLocked={lockedCards[type]}
            onToggleDetails={() => toggleCardDetails(type)}
            onCopy={() => handleCopy(type)}
            onLock={() => toggleLock(type)}
            copied={copied[type]}
          />
        ))}
      </div>

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
            description: "Freeze cards instantly if needed",
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
