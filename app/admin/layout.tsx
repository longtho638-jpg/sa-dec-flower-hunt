"use client";

import { AdminTerminalHUD } from "@/components/admin/AdminTerminalHUD";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-stone-950 text-stone-100">
            {/* Terminal HUD Header */}
            <AdminTerminalHUD />

            {/* Main Content Area */}
            <main className="w-full">
                {children}
            </main>
        </div>
    );
}
