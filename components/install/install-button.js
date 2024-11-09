"use client";

import { usePWA } from "@/contexts/PWAContext";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function InstallButton() {
  const { isInstallable, handleInstall } = usePWA();

  if (!isInstallable) return null;

  return (
    <Button
      onClick={handleInstall}
      className="fixed bottom-4 right-4 z-50 shadow-lg"
      size="lg"
    >
      <Download className="mr-2 h-4 w-4" />
      Install App
    </Button>
  );
}
