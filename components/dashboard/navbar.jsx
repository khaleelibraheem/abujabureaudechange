"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Bell, User, ChevronDown, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MobileNavigation } from "./mobile-navigation";
import Logo from "../shared/logo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const notifications = [
  {
    id: 1,
    title: "Transfer Successful",
    description: "Your transfer of $500 to John Doe was successful",
    time: "2 minutes ago",
    isRead: false,
    icon: Clock,
    type: "success",
  },
  {
    id: 2,
    title: "New Exchange Rate Alert",
    description: "USD/EUR rate has increased by 2%",
    time: "1 hour ago",
    isRead: false,
    icon: Bell,
    type: "info",
  },
  {
    id: 3,
    title: "Security Alert",
    description: "New login detected from Chrome browser",
    time: "3 hours ago",
    isRead: true,
    icon: Shield,
    type: "warning",
  },
];

function NavbarSkeleton() {
  return (
    <div className="flex items-center justify-between h-16 px-4 lg:px-8 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <div className="w-32 h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export function DashboardNavbar({ user }) {
  const { isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) {
    return <NavbarSkeleton />;
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500";
      case "info":
        return "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500";
      default:
        return "bg-gray-50 dark:bg-gray-800";
    }
  };

  return (
    <div className="flex items-center justify-between h-16 px-4 lg:px-8 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="flex items-center gap-6">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo />
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[calc(100vw-2rem)] md:w-96 max-w-96"
          >
            <DropdownMenuLabel className="text-lg font-semibold px-4 py-3">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[60vh] md:max-h-[400px] overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex flex-col items-start gap-2 p-3 md:p-4 cursor-pointer ${getNotificationStyles(
                    notification.type
                  )}`}
                >
                  <div className="flex items-center justify-between w-full gap-2">
                    <div className="flex items-center gap-2">
                      <notification.icon
                        className={`h-4 w-4 md:h-5 md:w-5 ${
                          notification.type === "success"
                            ? "text-green-500"
                            : notification.type === "warning"
                            ? "text-yellow-500"
                            : "text-blue-500"
                        }`}
                      />
                      <span className="font-medium text-sm md:text-base">
                        {notification.title}
                      </span>
                    </div>
                    {!notification.isRead && (
                      <Badge
                        variant="default"
                        className="bg-indigo-500 animate-pulse text-xs"
                      >
                        New
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {notification.description}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {notification.time}
                  </span>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center py-3">
              <span className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-sm">
                View all notifications
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {mounted && <ThemeToggle />}

        {/* User Profile - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    {user?.firstName?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {user?.firstName || "User"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNavigation />
        </div>
      </div>
    </div>
  );
}
