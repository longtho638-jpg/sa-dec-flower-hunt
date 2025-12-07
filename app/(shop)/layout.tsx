import type { Metadata } from "next";
import "../globals.css";
import { NotificationsDemo } from "@/components/NotificationsDemo";
import { ResponsiveLayout } from "@/components/layouts/ResponsiveLayout";

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
        <ResponsiveLayout>
            <NotificationsDemo />
            {children}
        </ResponsiveLayout>
    );
}
