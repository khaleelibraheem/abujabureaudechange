"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  Search,
  Calendar,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMediaQuery } from "@/app/hooks/use-media-query";

// Create mock data function
const createMockTransactions = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    type: i % 2 === 0 ? "sent" : "received",
    amount: Math.floor(Math.random() * 10000),
    currency: ["USD", "EUR", "GBP", "NGN", "INR"][
      Math.floor(Math.random() * 5)
    ],
    recipient: "John Doe",
    sender: "Sarah Smith",
    status: Math.random() > 0.2 ? "completed" : "pending",
    date: new Date(2024, 2, Math.floor(Math.random() * 30)).toISOString(),
  }));
};

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Initialize transactions after component mount
  useEffect(() => {
    setTransactions(createMockTransactions());
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.sender.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    const matchesType = typeFilter === "all" || tx.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Mobile transaction card component
  const TransactionCard = ({ transaction }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
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
                ? transaction.recipient
                : transaction.sender}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            transaction.status === "completed"
              ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
              : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
          }`}
        >
          {transaction.status}
        </span>
      </div>
      <div
        className={`text-right font-medium ${
          transaction.type === "sent"
            ? "text-red-600 dark:text-red-400"
            : "text-green-600 dark:text-green-400"
        }`}
      >
        {transaction.type === "sent" ? "-" : "+"}
        {transaction.amount} {transaction.currency}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Transactions History
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage your transfer history
          </p>
        </div>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="received">Received</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex gap-2">
              <Calendar className="h-4 w-4" />
              Select Dates
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List/Table */}
      <Card>
        <CardContent className="p-0 sm:p-6">
          {isMobile ? (
            // Mobile View - Cards
            <div className="space-y-4 p-4">
              {filteredTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>
          ) : (
            // Desktop View - Table
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Recipient/Sender</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        {new Date(tx.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-1 rounded-full ${
                              tx.type === "sent"
                                ? "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                                : "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                            }`}
                          >
                            {tx.type === "sent" ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : (
                              <ArrowDownLeft className="h-4 w-4" />
                            )}
                          </div>
                          <span className="capitalize">{tx.type}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        className={`font-medium ${
                          tx.type === "sent"
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {tx.type === "sent" ? "-" : "+"}
                        {tx.amount} {tx.currency}
                      </TableCell>
                      <TableCell>
                        {tx.type === "sent" ? tx.recipient : tx.sender}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            tx.status === "completed"
                              ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                              : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
