"use client";

// import { useWindowSize } from "@/hooks/use-window-size"; // You'll need to create this hook
import { NavigationMenu } from "./navigation-menu";

export default function DashboardSidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[250px] bg-white dark:bg-[#0B0F1C] border-r border-gray-200 dark:border-gray-800">
          <NavigationMenu />
        </div>
        {/* Spacing div to push content */}
        <div className="w-[235px] flex-shrink-0" />
      </div>
    </>
  );
}
