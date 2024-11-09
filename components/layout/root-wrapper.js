"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/footer";

export function RootWrapper({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <div className="relative min-h-screen">
      {children}
      {!isDashboard && <Footer />}
    </div>
  );
}
