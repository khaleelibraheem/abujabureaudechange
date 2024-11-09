"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavigationMenu } from "./navigation-menu";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="z-50 lg:hidden">
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
          className="w-72 p-0 bg-white dark:bg-[#0B0F1C] border-r border-gray-200 dark:border-gray-800"
        >
          <SheetHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <SheetTitle className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent text-md font-bold text-left">
              AbujaBureauDeChange
            </SheetTitle>
            <SheetDescription className="text-left text-sm text-gray-500 dark:text-gray-400">
              Your trusted exchange partner
            </SheetDescription>
          </SheetHeader>

          <div className="h-full">
            <NavigationMenu onItemClick={() => setIsOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}