import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import { RootWrapper } from "@/components/layout/root-wrapper";
import "./globals.css";
import Providers from "./providers";
import { BankingProvider } from "@/contexts/BankingContext";
import { Toaster } from "sonner";
import { PWAProvider } from "@/contexts/PWAContext";
import { InstallButton } from "@/components/install/install-button";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: "AbujaBureauDeChange",
  description: "Premium Currency Exchange Platform",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AbujaBDC",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192x192.png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="theme-color" content="#4F46E5" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="AbujaBDC" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <PWAProvider>
                <RootWrapper>
                  <BankingProvider>
                    <Navbar />
                    {children}
                    <Toaster position="top-center" />
                    <InstallButton />
                  </BankingProvider>
                </RootWrapper>
              </PWAProvider>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
