"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarItems } from "@/config/navigation";

export function NavigationMenu({ onItemClick }) {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2 py-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`flex items-center justify-between px-4 py-2.5 transition-colors ${
              pathname === item.href
                ? "bg-indigo-600 dark:bg-indigo-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-100/10 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.title}</span>
            </div>
            <ChevronRight className="h-4 w-4 opacity-50" />
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
