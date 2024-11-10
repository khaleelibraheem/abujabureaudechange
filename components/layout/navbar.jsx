"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Menu,
  ArrowRight,
  Home,
  Info,
  LayoutGrid,
  HelpCircle,
  ChevronRight,
  Moon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../shared/logo";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Services", href: "/services", icon: LayoutGrid },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
];

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
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-2 py-1 text-[14px] font-medium transition-colors group ${
                    pathname === item.href
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full transition-transform origin-left scale-x-0 group-hover:scale-x-100 ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-indigo-600 to-blue-600 scale-x-100"
                        : "bg-gradient-to-r from-indigo-600 to-blue-600"
                    }`}
                  />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <SignedOut>
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm" className="font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="sm"
                    className="font-medium bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90 transition-opacity"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button
                    size="sm"
                    className="font-medium bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90 transition-opacity"
                  >
                    Dashboard
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex gap-2 items-center">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 bg-white dark:bg-white/10 border-gray-200 dark:border-gray-800 backdrop-blur-sm"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 p-0 flex flex-col bg-white dark:bg-[#0B0F1C] border-l border-gray-200 dark:border-gray-800"
              >
                <SheetHeader className="flex items-start px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                  <SheetDescription className="text-sm text-gray-500 dark:text-gray-400">
                    Your trusted exchange partner
                  </SheetDescription>
                </SheetHeader>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                        pathname === item.href
                          ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 ${
                          pathname === item.href
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      />
                      <span className="flex-1 font-medium">{item.name}</span>
                      <ChevronRight
                        className={`h-4 w-4 ${
                          pathname === item.href
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-gray-400"
                        }`}
                      />
                    </Link>
                  ))}
                </div>

                {/* User Profile Section */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                  <SignedIn>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <Link href="/dashboard">
                          <Button
                            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90"
                            onClick={() => setIsOpen(false)}
                          >
                            Dashboard
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <div className="flex gap-2">
                      <Link href="/sign-in" className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/sign-up" className="flex-1">
                        <Button
                          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90"
                          onClick={() => setIsOpen(false)}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </SignedOut>
                </div>          

                {/* Footer Info */}
                <div className="px-6 py-4 border-gray-200 dark:border-gray-800">
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    © 2024 Abuja Bureau De Change.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
