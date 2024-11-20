"use client";

import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";
import { usePathname } from "next/navigation";
import Logo from "../shared/logo";
import Link from "next/link";
import MenuIcon from "../menu-icon";
import { sidebarItems } from "@/config/navigation";
import { Badge } from "../ui/badge";
import { ThemeToggle } from "../theme-toggle";

const NavItem = ({ item, isActive, onClick }) => (
  <Link
    href={item.href}
    onClick={onClick}
    className={`flex items-center w-full p-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-indigo-50 dark:bg-indigo-950"
        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
    }`}
  >
    <div className="flex items-center gap-3 flex-1">
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-lg ${
          isActive
            ? "bg-indigo-100 dark:bg-indigo-900"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
      >
        <item.icon
          className={`h-5 w-5 ${
            isActive
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        />
      </div>
      <span
        className={`text-sm font-medium ${
          isActive
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {item.title}
      </span>
      {item.isAdmin ? (
        <Badge
          variant="outline"
          className="ml-auto border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-400"
        >
          Admin
        </Badge>
      ) : null}
    </div>
  </Link>
);

const NavSection = ({ title, items, onItemClick, pathname }) => (
  <div className="py-4">
    <div className="px-3 mb-3">
      <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {title}
      </h2>
    </div>
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
  </div>
);

export function MobileNavigation({ user }) {
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Group navigation items by category
  const mainNavItems = navigationItems.slice(0, 4);
  const accountNavItems = navigationItems.slice(4, 8);
  const settingsNavItems = navigationItems.slice(8);

  return (
    <div className="z-50 lg:hidden">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="relative h-10 w-10 flex items-center justify-center focus:outline-none"
          >
            <MenuIcon isOpen={isOpen} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[70vh]">
          <div className="w-full flex flex-col h-full">
            <div className="mx-auto h-[14px] w-[100px] rounded-full bg-muted" />

            <DrawerHeader className="px-4 py-4 border-b border-gray-100 dark:border-gray-800">
              <DrawerTitle className="flex items-center justify-between">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Logo />
                </Link>
                <ThemeToggle />
              </DrawerTitle>
            </DrawerHeader>

            {/* Navigation Menu */}
            <div className="overflow-y-auto max-h-full px-2 no-scrollbar">
              <NavSection
                title="Main Navigation"
                items={mainNavItems}
                onItemClick={() => setIsOpen(false)}
                pathname={pathname}
              />
              <NavSection
                title="Account Management"
                items={accountNavItems}
                onItemClick={() => setIsOpen(false)}
                pathname={pathname}
              />
              <NavSection
                title="Settings"
                items={settingsNavItems}
                onItemClick={() => setIsOpen(false)}
                pathname={pathname}
              />
            </div>

            {/* Footer */}
            <DrawerFooter className="px-4 py-4 pb-10 mt-auto border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Abuja Bureau De Change
              </p>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
