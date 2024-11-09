// components/dashboard/recent-transactions.js
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

// Mock transaction data (in a real app, this would come from an API)
const recentTransactions = [
  {
    id: 1,
    type: "sent",
    amount: 500,
    currency: "USD",
    toCurrency: "NGN",
    recipient: "John Doe",
    status: "completed",
    date: "2024-03-08T10:30:00",
  },
  {
    id: 2,
    type: "received",
    amount: 300,
    currency: "EUR",
    fromCurrency: "GBP",
    sender: "Sarah Smith",
    status: "completed",
    date: "2024-03-07T15:45:00",
  },
  {
    id: 3,
    type: "sent",
    amount: 1000,
    currency: "GBP",
    toCurrency: "INR",
    recipient: "Raj Kumar",
    status: "pending",
    date: "2024-03-07T09:15:00",
  },
  {
    id: 4,
    type: "received",
    amount: 750,
    currency: "USD",
    fromCurrency: "EUR",
    sender: "Marie Claire",
    status: "completed",
    date: "2024-03-06T14:20:00",
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatAmount = (amount, currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest transfer activity</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/transactions">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            >
              {/* Transaction Icon and Details */}
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === "sent"
                      ? "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                      : "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                  }`}
                >
                  {transaction.type === "sent" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4" />
                  )}
                </div>

                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {transaction.type === "sent"
                      ? `To ${transaction.recipient}`
                      : `From ${transaction.sender}`}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    {formatDate(transaction.date)}
                  </div>
                </div>
              </div>

              {/* Amount and Status */}
              <div className="text-right">
                <p
                  className={`font-medium ${
                    transaction.type === "sent"
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {transaction.type === "sent" ? "-" : "+"}
                  {formatAmount(transaction.amount, transaction.currency)}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === "completed"
                      ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                      : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
