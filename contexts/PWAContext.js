"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PWAContext = createContext({
  isInstallable: false,
  deferredPrompt: null,
  handleInstall: () => {},
});

export function PWAProvider({ children }) {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if app is already installed
    window.addEventListener("appinstalled", () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log("PWA was installed");
    });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      console.log("Installation prompt not available");
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);

    // Clear the deferredPrompt after use
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <PWAContext.Provider
      value={{ isInstallable, deferredPrompt, handleInstall }}
    >
      {children}
    </PWAContext.Provider>
  );
}

export const usePWA = () => useContext(PWAContext);
