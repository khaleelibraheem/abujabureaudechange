import Logo from "@/components/shared/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, AlertTriangle, Menu, Settings, Users, X } from "lucide-react";
import ScrollHeader from "./scroll-header";
import { motion } from "framer-motion";
import { useState } from "react";


// First, create a separate header component for better organization
const DashboardHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ScrollHeader>
      <div className="max-w-[1800px] mx-auto px-4">
        {/* Main Header Row */}
        <div className="h-16 flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center gap-3">
            <Logo />
            <div className="hidden md:block h-6 w-px bg-gray-200 dark:bg-gray-800" />
            <div className="hidden md:flex flex-col">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Manage and monitor your system
              </p>
            </div>
          </div>

          {/* Right side - Controls for mobile */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-2">
              <Select defaultValue="today">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button>Generate Report</Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Expandable Section */}
        <motion.div
          initial={false}
          animate={{
            height: menuOpen ? "auto" : 0,
            opacity: menuOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800"
        >
          <div className="py-4 space-y-4">
            {/* Mobile Title */}
            <div className="px-2">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Manage and monitor your system
              </p>
            </div>

            {/* Mobile Controls */}
            <div className="space-y-2">
              <div className="px-2">
                <Select defaultValue="today">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="px-2">
                <Button className="w-full">Generate Report</Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <div className="px-2 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <Users className="h-4 w-4" />
                  Users
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <Activity className="h-4 w-4" />
                  Activity
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Alerts
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ScrollHeader>
  );
};

export default DashboardHeader;
