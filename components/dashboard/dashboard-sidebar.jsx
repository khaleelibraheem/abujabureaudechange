"use client";

import { DesktopNavigationMenu } from "./desktop-navigation-menu";
import { cn } from "@/lib/utils";

export default function DashboardSidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div
          className={cn(
            "fixed top-16 left-0 z-30",
            "h-[calc(100vh-4rem)] w-64",
            "bg-white dark:bg-[#0B0F1C]",
            "border-r border-gray-200 dark:border-gray-800",
            "backdrop-blur-sm supports-[backdrop-filter]:bg-white/80",
            "dark:supports-[backdrop-filter]:bg-gray-900/80"
          )}
        >
          <DesktopNavigationMenu />
        </div>
        {/* Spacing div to push content */}
        <div className="w-64 flex-shrink-0" />
      </div>
    </>
  );
}
