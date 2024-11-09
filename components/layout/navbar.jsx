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
    pathname.startsWith("/dashboard")
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
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
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
                className="w-72 p-0 flex flex-col bg-white dark:bg-[#0B0F1C] border-l border-gray-200 dark:border-gray-800"
              >
                <SheetHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                  <SheetDescription className="text-left text-sm text-gray-500 dark:text-gray-400">
                    Your trusted exchange partner
                  </SheetDescription>
                </SheetHeader>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between px-4 py-2.5 transition-colors ${
                          pathname === item.href
                            ? "bg-indigo-600 dark:bg-indigo-600 text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-100/10 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      </Link>
                    ))}

                    {/* Theme Toggle */}
                    <div className="px-4 py-2.5">
                      <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                        <span className="text-sm font-medium">Theme</span>
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Section - Fixed at Bottom */}
                <div className="mt-auto border-t border-gray-200 dark:border-gray-700">
                  <div className="p-3">
                    <SignedOut>
                      <div className="flex flex-col gap-2">
                        <Button
                          asChild
                          onClick={() => setIsOpen(false)}
                          variant="ghost"
                          className="w-full"
                        >
                          <Link href="/sign-in">Sign In</Link>
                        </Button>

                        <Button
                          asChild
                          onClick={() => setIsOpen(false)}
                          className="w-full"
                        >
                          <Link href="/sign-up">Get Started</Link>
                        </Button>
                      </div>
                    </SignedOut>
                    <SignedIn>
                      <div className="flex items-center justify-between">
                        <UserButton afterSignOutUrl="/" />
                        <Link href="/dashboard">
                          <Button>Dashboard</Button>
                        </Link>
                      </div>
                    </SignedIn>
                  </div>
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
