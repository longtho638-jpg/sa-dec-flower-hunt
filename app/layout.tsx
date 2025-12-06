import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { LanguageProvider } from "@/lib/i18n";
import { StructuredData } from "@/components/StructuredData";
import { Toaster } from "sonner";
import Script from "next/script"; // Added Script import

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#16a34a",
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
    statusBarStyle: "default",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <PWAInstallPrompt />
            <StructuredData />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
