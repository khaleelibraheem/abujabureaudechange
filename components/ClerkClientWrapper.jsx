"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";

export default function ClerkClientWrapper({ children }) {
  return (
    <Suspense fallback={<div />}>
      <ClerkProvider afterSignOutUrl="/">{children}</ClerkProvider>
    </Suspense>
  );
}
