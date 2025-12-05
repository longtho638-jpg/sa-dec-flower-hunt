import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Sa Đéc Flower Hunt 2026",
    description: "Khám phá vẻ đẹp hoa xuân miền Tây",
};

export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-stone-100 min-h-screen flex justify-center">
            <main className="w-full max-w-[480px] bg-white min-h-screen shadow-2xl relative">
                {children}
            </main>
        </div>
    );
}
