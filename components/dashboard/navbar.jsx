"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
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

// Dummy notifications for demo
const notifications = [
  {
    id: 1,
    title: "Transfer Successful",
    description: "Your transfer of $500 to John Doe was successful",
    time: "2 minutes ago",
    isRead: false,
  },
  {
    id: 2,
    title: "New Exchange Rate Alert",
    description: "USD/EUR rate has increased by 2%",
    time: "1 hour ago",
    isRead: false,
  },
  {
    id: 3,
    title: "Security Alert",
    description: "New login detected from Chrome browser",
    time: "3 hours ago",
    isRead: true,
  },
];

function NavbarSkeleton() {
  return (
    <div className="flex items-center justify-between h-full px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <Logo />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full" />
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

  // Show skeleton during initial render and when user is not available
  if (!mounted || !user) {
    return <NavbarSkeleton />;
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="flex items-center justify-between h-full px-4 lg:px-8">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Link href="/">
          <Logo />
        </Link>
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex flex-1 max-w-xl px-6">
        <div className="w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search transactions, exchange rates..."
            className="w-full pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start gap-1 p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{notification.title}</span>
                  {!notification.isRead && (
                    <Badge variant="default" className="bg-indigo-500">
                      New
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {notification.description}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {notification.time}
                </span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-indigo-600 dark:text-indigo-400">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Only render ThemeToggle after mounting to prevent hydration issues */}
        {mounted && <ThemeToggle />}

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <span className="hidden lg:block text-sm text-gray-600 dark:text-gray-300">
            Hi, {user?.firstName || "User"}
          </span>
          <Link href="/dashboard/profile" className="block">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <MobileNavigation />
          </div>
        </div>
      </div>
    </div>
  );
}
