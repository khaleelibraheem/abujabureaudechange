"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { sidebarItems } from "@/config/navigation";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const NavItem = ({ item, isActive, onClick }) => (
  <Link
    href={item.href}
    onClick={onClick}
    className={cn(
      "group flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-150 hover:bg-gray-100 dark:hover:bg-gray-800",
      isActive && "bg-indigo-50 dark:bg-indigo-950"
    )}
  >
    <div className="flex items-center gap-x-3">
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
          isActive
            ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400"
            : "bg-gray-50 text-gray-500 dark:bg-gray-900 dark:text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-800"
        )}
      >
        <item.icon className="h-5 w-5" />
      </div>
      <span
        className={cn(
          "text-sm font-medium",
          isActive
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-gray-700 dark:text-gray-300"
        )}
      >
        {item.title}
      </span>
    </div>
    {item.isAdmin ? (
      <Badge
        variant="outline"
        className="border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-400"
      >
        Admin
      </Badge>
    ) : (
      <ChevronRight
        className={cn(
          "h-4 w-4",
          isActive
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-gray-400 dark:text-gray-600"
        )}
      />
    )}
  </Link>
);

const NavSection = ({ title, items, onItemClick, pathname }) => (
  <NavigationMenuItem className="w-full">
    <h3 className="mb-2 px-5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
      {title}
    </h3>
    <div className="space-y-1">
      {items.map((item) => (
        <NavItem
          key={item.href}
          item={item}
          isActive={pathname === item.href}
          onClick={onItemClick}
        />
      ))}
    </div>
  </NavigationMenuItem>
);

export function DesktopNavigationMenu({ onItemClick }) {
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

  // Group navigation items
  const mainNavItems = navigationItems.slice(0, 4);
  const accountNavItems = navigationItems.slice(4, 8);
  const settingsNavItems = navigationItems.slice(8);

  return (
    <NavigationMenu
      orientation="vertical"
      className="max-w-none w-full items-start"
    >
      <NavigationMenuList className="flex-col w-full">
        <div className="no-scrollbar h-[calc(100vh-4rem)] w-full overflow-y-auto">
          <div className="space-y-4 p-2">
            <NavSection
              title="Main Navigation"
              items={mainNavItems}
              onItemClick={onItemClick}
              pathname={pathname}
            />
            <NavSection
              title="Account Management"
              items={accountNavItems}
              onItemClick={onItemClick}
              pathname={pathname}
            />
            <NavSection
              title="Settings & Profile"
              items={settingsNavItems}
              onItemClick={onItemClick}
              pathname={pathname}
            />
          </div>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}