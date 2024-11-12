"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarItems } from "@/config/navigation";
import { useUser } from "@clerk/nextjs";

export function NavigationMenu({ onItemClick }) {
  const { user } = useUser();
  const pathname = usePathname();

  const navigationItems = [...sidebarItems];
  if (user?.publicMetadata?.role === "admin") {
    navigationItems.push({
      title: "Admin Dashboard",
      href: "/admin",
      icon: ShieldCheck,
      isAdmin: true,
    });
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2 py-4">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`
              flex items-center justify-between px-4 py-2.5 transition-colors
              ${item.isAdmin ? "md:hidden" : ""} 
              ${
                pathname === item.href
                  ? "bg-indigo-600 dark:bg-indigo-600 text-white"
                  : `text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-100/10 hover:text-gray-900 dark:hover:text-white
                     ${
                       item.isAdmin
                         ? "text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                         : ""
                     }`
              }
            `}
          >
            <div className="flex items-center gap-3">
              <item.icon
                className={`h-4 w-4 ${
                  item.isAdmin && pathname !== item.href
                    ? "text-indigo-600 dark:text-indigo-400"
                    : ""
                }`}
              />
              <span className="sm:text-sm font-medium">{item.title}</span>
            </div>
            <ChevronRight className="h-4 w-4 opacity-50" />
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
