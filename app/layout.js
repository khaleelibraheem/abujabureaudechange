import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import { RootWrapper } from "@/components/layout/root-wrapper";
import "./globals.css";
import Providers from "./providers";
import { BankingProvider } from "@/contexts/BankingContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#4F46E5",
};

export const metadata = {
  metadataBase: new URL("https://abujabureaudechange.vercel.app"),
  canonical: "https://abujabureaudechange.vercel.app",

  title: {
    template: "%s | Abuja Bureau De Change",
    default: "Abuja Bureau De Change - Premium Currency Exchange Services",
  },
  description:
    "Premium currency exchange services in Nigeria. Exchange USD, GBP, EUR, NGN, and INR with real-time rates and instant processing.",

  keywords: [
    "currency exchange",
    "bureau de change",
    "forex",
    "nigeria",
    "abuja",
    "usd to ngn",
    "gbp to ngn",
    "eur to ngn",
  ],

  applicationName: "Abuja Bureau De Change",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abujabureaudechange.vercel.app",
    title: "Abuja Bureau De Change - Premium Currency Exchange Services",
    description: "Premium currency exchange services in Nigeria",
    siteName: "Abuja Bureau De Change",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abuja Bureau De Change",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Abuja Bureau De Change - Premium Currency Exchange Services",
    description: "Premium currency exchange services in Nigeria",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      {
        url: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    title: "Abuja Bureau De Change",
    statusBarStyle: "default",
  },

  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <RootWrapper>
                <BankingProvider>
                  <Navbar />
                  {children}
                  <Toaster position="top-center" />
                </BankingProvider>
              </RootWrapper>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
