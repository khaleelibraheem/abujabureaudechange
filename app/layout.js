import { Inter} from "next/font/google";
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
};


export const metadata = {
  title: {
    default: "Abuja Bureau De Change",
    template: "%s | Abuja Bureau De Change"
  },
  description: "Premium currency exchange services in Nigeria. Exchange USD, GBP, EUR, NGN, and INR with real-time rates and instant processing.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#4F46E5'
      }
    ]
  },
  manifest: '/manifest.json',
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
