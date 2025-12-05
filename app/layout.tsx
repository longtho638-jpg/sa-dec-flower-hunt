import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { LanguageProvider } from "@/lib/i18n";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Sa Đéc Flower Hunt 2026",
  description: "Khám phá vẻ đẹp hoa xuân miền Tây",
  manifest: "/manifest.json",
  themeColor: "#16a34a",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Flower Hunt",
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
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
