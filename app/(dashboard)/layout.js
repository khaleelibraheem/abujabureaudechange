"use client";

import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { useUser } from "@clerk/nextjs";

export default function DashboardLayout({ children }) {
  const { user, isLoaded } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F1C]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#0B0F1C] border-b border-gray-200 dark:border-gray-800 z-40">
        <DashboardNavbar user={isLoaded ? user : null} />
      </header>

      {/* Main Layout */}
      <div className="flex pt-16">
        <DashboardSidebar />
        <main className="flex-1 px-4 py-6 lg:px-8 text-gray-900 dark:text-white">
          {children}
        </main>
      </div>
    </div>
  );
}
