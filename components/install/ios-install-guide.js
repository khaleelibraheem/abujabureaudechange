"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function IOSInstallGuide() {
  const [isIOS, setIsIOS] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  useEffect(() => {
    // Check if the device is iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);
  }, []);

  if (
    !isIOS ||
    !showGuide ||
    window.matchMedia("(display-mode: standalone)").matches
  ) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">Install on iOS</CardTitle>
          <button
            onClick={() => setShowGuide(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="space-y-2 text-sm">
          <li className="flex items-start space-x-2">
            <span className="font-bold">1.</span>
            <span>Tap the Share button in Safari</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold">2.</span>
          <span>Scroll down and tap &quot;Add to Home Screen&quot;</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold">3.</span>
            <span>Tap &quot;Add&quot; to install</span>
          </li>
        </ol>
      </CardContent>
    </Card>
  );
}
