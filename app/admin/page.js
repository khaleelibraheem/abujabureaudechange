"use client";

import { motion } from "framer-motion";
import {
  Users,
  CreditCard,
  Activity,
  Settings,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign,
  FileCheck,
  RefreshCw,
  History,
  FileText,
  Ban,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useAdmin } from "../hooks/useAdmin";
import Unauthorized from "./components/unauthorized";
import LoadingScreen from "./components/loading";
import AdminDashboardHeader from "./components/admin-dashboard-header";
// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Chart options and data
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      titleColor: "#1f2937",
      bodyColor: "#1f2937",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(context.parsed.y);
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
    },
  },
};

const transactionData = {
  labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
  datasets: [
    {
      label: "Exchange Volume",
      data: [4200, 6800, 11400, 19300, 15200, 8900, 4800],
      fill: true,
      borderColor: "#6366f1",
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      tension: 0.4,
    },
  ],
};

const AdminPanel = () => {
  const stats = [
    {
      title: "Total Exchanges",
      value: "2,345",
      change: "+12%",
      trend: "up",
      icon: CircleDollarSign,
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Pending Verifications",
      value: "45",
      change: "-3%",
      trend: "down",
      icon: FileCheck,
    },
    {
      title: "Exchange Rate Updates",
      value: "24",
      change: "+1%",
      trend: "up",
      icon: RefreshCw,
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      from: "USD",
      to: "NGN",
      amount: "1,000",
      convertedAmount: "1,669,340",
      status: "pending",
      time: "5 mins ago",
    },
    {
      id: 2,
      from: "GBP",
      to: "NGN",
      amount: "500",
      convertedAmount: "1,090,675",
      status: "completed",
      time: "15 mins ago",
    },
    {
      id: 3,
      from: "EUR",
      to: "NGN",
      amount: "750",
      convertedAmount: "1,347,682",
      status: "failed",
      time: "1 hour ago",
    },
  ];

  const pendingVerifications = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      submittedAt: "2 hours ago",
      documents: ["ID", "Proof of Address"],
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      submittedAt: "3 hours ago",
      documents: ["ID", "Proof of Address", "Bank Statement"],
    },
  ];

  const exchangeRates = [
    { pair: "USD/NGN", rate: "1,669.34", change: "+0.2%" },
    { pair: "GBP/NGN", rate: "2,181.35", change: "-0.1%" },
    { pair: "EUR/NGN", rate: "1,796.91", change: "+0.3%" },
    { pair: "USD/INR", rate: "84.40", change: "+0.1%" },
  ];

   const { isAdmin, isLoaded} = useAdmin();

   if (!isLoaded) {
     return <LoadingScreen />;
   }

   if (!isAdmin) {
     return <Unauthorized />;
   }

  return (
    <>
      <AdminDashboardHeader />

      {/* Main Content */}
      <main className="pt-[80px] sm:pt-[100px] px-4 max-w-[1800px] mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="flex items-center mt-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm ${
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Exchange Rate Management */}
          <Card>
            <CardHeader>
              <CardTitle>Exchange Rate Management</CardTitle>
              <CardDescription>
                Configure and monitor exchange rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {exchangeRates.map((rate) => (
                    <div
                      key={rate.pair}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium">{rate.pair}</p>
                        <p className="text-lg font-semibold">₦{rate.rate}</p>
                      </div>
                      <Badge
                        variant={
                          rate.change.startsWith("+")
                            ? "success"
                            : "destructive"
                        }
                      >
                        {rate.change}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Update Rates
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <History className="mr-2 h-4 w-4" />
                    Rate History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Volume Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Exchange Volume</CardTitle>
              <CardDescription>24-hour transaction volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-[300px] w-full">
                  <Line options={lineChartOptions} data={transactionData} />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Volume
                    </p>
                    <p className="text-lg font-semibold">$1.2M</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Success Rate
                    </p>
                    <p className="text-lg font-semibold">98.5%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Avg. Exchange
                    </p>
                    <p className="text-lg font-semibold">$2,245</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest currency exchanges</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {transaction.from} → {transaction.to}
                        </span>
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "success"
                              : transaction.status === "failed"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ${transaction.amount} = ₦{transaction.convertedAmount}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.time}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Verification Queue */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Verification Queue</CardTitle>
                  <CardDescription>Pending user verifications</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingVerifications.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <div className="flex gap-2">
                          {user.documents.map((doc, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  className="w-full flex items-start gap-3 h-auto p-4 text-left"
                  variant="outline"
                >
                  <div className="shrink-0 h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                    <RefreshCw className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-medium truncate">
                      Update Rates
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
                      Modify exchange rates
                    </span>
                  </div>
                </Button>

                <Button
                  className="w-full flex items-start gap-3 h-auto p-4 text-left"
                  variant="outline"
                >
                  <div className="shrink-0 h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                    <FileCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-medium truncate">
                      Verify Users
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
                      Review KYC submissions
                    </span>
                  </div>
                </Button>

                <Button
                  className="w-full flex items-start gap-3 h-auto p-4 text-left"
                  variant="outline"
                >
                  <div className="shrink-0 h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                    <CircleDollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-medium truncate">
                      Process Exchange
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
                      Handle currency exchange
                    </span>
                  </div>
                </Button>

                <Button
                  className="w-full flex items-start gap-3 h-auto p-4 text-left"
                  variant="outline"
                >
                  <div className="shrink-0 h-8 w-8 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-medium truncate">
                      Transaction Reports
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
                      View exchange history
                    </span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default AdminPanel;
