"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Home,
  Info,
  LayoutGrid,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";
import Logo from "../shared/logo";
import { ThemeToggle } from "../theme-toggle";
import MenuIcon from "../menu-icon";

// Modern Menu Icon Component

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Services", href: "/services", icon: LayoutGrid },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
];

const MobileNavItem = ({ item, isActive, onClick }) => (
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
        {item.name}
      </span>
    </div>
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 dark:bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <nav className="mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Navigation Items */}
            <div className="flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`h-4 w-4 ${
                      pathname === item.href
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
              <ThemeToggle />
              <SignedOut>
                <div className="flex items-center gap-2">
                  <Link href="/sign-in">
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-medium h-9"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button
                      size="sm"
                      className="font-medium h-9 bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90 transition-opacity"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-3">
                  <Link href="/dashboard">
                    <Button
                      size="sm"
                      className="font-medium h-9 bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90 transition-opacity"
                    >
                      Dashboard
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex gap-3 items-center">
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <button
                  className="relative h-10 w-10 flex items-center justify-center focus:outline-none"
                  aria-label="Menu"
                >
                  <MenuIcon isOpen={isOpen} />
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="w-full">
                  <DrawerHeader className="px-4 py-4 border-b border-gray-100 dark:border-gray-800">
                    <DrawerTitle className="flex items-center justify-between">
                      <Link href="/" onClick={() => setIsOpen(false)}>
                        <Logo />
                      </Link>
                      <ThemeToggle />
                    </DrawerTitle>
                  </DrawerHeader>

                  {/* Primary Navigation */}
                  <div className="p-2">
                    <div className="space-y-1">
                      {navigation.map((item) => (
                        <MobileNavItem
                          key={item.href}
                          item={item}
                          isActive={pathname === item.href}
                          onClick={() => setIsOpen(false)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="px-4 pb-4 pt-2">
                    <SignedOut>
                      <div className="space-y-2">
                        <Link href="/sign-up" className="w-full">
                          <Button
                            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90 h-11 text-base"
                            onClick={() => setIsOpen(false)}
                          >
                            Get Started
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        <Link href="/sign-in" className="w-full">
                          <Button
                            variant="outline"
                            className="w-full mt-3 h-11 text-base font-normal"
                            onClick={() => setIsOpen(false)}
                          >
                            Sign In
                          </Button>
                        </Link>
                      </div>
                    </SignedOut>
                    <SignedIn>
                      <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <Link href="/dashboard" className="flex-1">
                          <Button
                            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90 h-11 text-base"
                            onClick={() => setIsOpen(false)}
                          >
                            Dashboard
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        {/* <UserButton /> */}
                      </div>
                    </SignedIn>
                  </div>

                  {/* Footer */}
                  <DrawerFooter className="pt-2 pb-6 px-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      © 2024 Abuja Bureau De Change.
                    </p>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
