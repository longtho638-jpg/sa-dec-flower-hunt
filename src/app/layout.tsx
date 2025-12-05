import type { Metadata } from "next";
import { Quicksand, Merriweather } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
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
        className={`${quicksand.variable} ${merriweather.variable} antialiased font-sans bg-[#FDFBF7] text-[#1C1917]`}
      >
        {children}
      </body>
    </html>
  );
}
