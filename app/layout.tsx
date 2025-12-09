import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { LanguageProvider } from "@/lib/i18n";
import { StructuredData } from "@/components/StructuredData";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { Toaster } from "sonner";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: "Sa Đéc Flower Hunt 2026 - Săn Hoa & Quà Tết",
    template: "%s | Sa Đéc Flower Hunt",
  },
  description: "Khám phá vẻ đẹp hoa xuân miền Tây, quét AR nhận voucher và đặt hoa giá gốc tại vườn.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Flower Hunt",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://sadec-flower-hunt.vercel.app",
    siteName: "Sa Đéc Flower Hunt 2026",
    title: "Sa Đéc Flower Hunt 2026 - Festival Hoa Xuân",
    description: "Trải nghiệm du lịch thực tế ảo, quét AR nhận quà và đặt mua hoa Tết Sa Đéc giá tốt nhất.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Làng hoa Sa Đéc rực rỡ sắc xuân",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sa Đéc Flower Hunt 2026",
    description: "Săn hoa, quét AR, nhận quà Tết!",
    images: ["https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&h=630&fit=crop"],
  },
  other: {
    "tiktok-developers-site-verification": "cpGgNPF685nEh8zgwRgGoXoFi3IGXriX",
  },
};

import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} ${inter.variable}`}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <LanguageProvider>
              <ServiceWorkerRegister />
              {children}
              <PWAInstallPrompt />
              <PWAInstallPrompt />
              <StructuredData data={{
                "@type": "SoftwareApplication",
                "name": "Sa Đéc Flower Hunt 2026",
                "applicationCategory": "TravelApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "VND"
                }
              }} />
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
