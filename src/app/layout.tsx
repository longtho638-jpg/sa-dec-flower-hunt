import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sa Dec Flower Hunt 🌸",
  description: "Scan QR codes, collect stamps, and discover the stories of our flowers!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} antialiased font-sans bg-[#0f0f1a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
