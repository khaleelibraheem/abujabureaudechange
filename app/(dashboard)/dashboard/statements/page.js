// app/(dashboard)/dashboard/statements/page.js
"use client";

import { motion } from "framer-motion";
import { FileText, Download, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statements = [
  {
    id: 1,
    period: "March 2024",
    dateGenerated: "2024-03-01",
    size: "245 KB",
    status: "available",
  },
  {
    id: 2,
    period: "February 2024",
    dateGenerated: "2024-02-01",
    size: "312 KB",
    status: "available",
  },
  {
    id: 3,
    period: "January 2024",
    dateGenerated: "2024-01-01",
    size: "289 KB",
    status: "available",
  },
  // Add more statements as needed
];

export default function BankStatementsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Bank Statements
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          View and download your account statements
        </p>
      </div>

      {/* Statement Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Statement</CardTitle>
          <CardDescription>
            Select a date range to generate a custom statement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD Account</SelectItem>
                <SelectItem value="eur">EUR Account</SelectItem>
                <SelectItem value="gbp">GBP Account</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex gap-2">
              <Calendar className="h-4 w-4" />
              Select Date Range
            </Button>

            <Button>Generate Statement</Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Statements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statements.map((statement) => (
          <motion.div
            key={statement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                      <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {statement.period}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Generated:{" "}
                        {new Date(statement.dateGenerated).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Size: {statement.size}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-6">
                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Statement Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Statement Settings</CardTitle>
          <CardDescription>
            Configure your statement preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Automatic Statements
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive monthly statements automatically
                </p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Statement Format
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose your preferred format
                </p>
              </div>
              <Select defaultValue="pdf">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
