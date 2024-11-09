"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstallable(false);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
      setIsInstallable(false);
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
  };

  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleInstallClick}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        <Download className="h-4 w-4" />
        Install App
      </Button>
    </div>
  );
}
