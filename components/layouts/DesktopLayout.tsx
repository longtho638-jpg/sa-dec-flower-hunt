"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, User, Scan, ShoppingCart, Menu } from "lucide-react";
import { LoginModal } from "@/components/LoginModal";
import { useState } from "react";

interface DesktopLayoutProps {
    children: React.ReactNode;
    onLoginClick: () => void;
}

/**
 * Desktop Layout - Wide screen optimized
 * Features: Sidebar, wider content area, desktop navigation
 */
export function DesktopLayout({ children, onLoginClick }: DesktopLayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-stone-50 flex">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-stone-200 fixed h-full overflow-y-auto">
                <div className="p-6">
                    {/* Logo */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
                            <span className="text-3xl">🌸</span>
                            Sa Đéc Flowers
                        </h1>
                        <p className="text-stone-500 text-sm mt-1">Festival Hoa Xuân 2028</p>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="space-y-2">
                        <Link href="/">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                🏠 Trang chủ
                            </Button>
                        </Link>
                        <Link href="/scan">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Scan className="w-4 h-4" />
                                Quét QR
                            </Button>
                        </Link>
                        <Link href="/blog">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                📝 Blog
                            </Button>
                        </Link>
                        <Link href="/partner">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                🤝 Đối tác
                            </Button>
                        </Link>

                        <div className="pt-4 border-t border-stone-200">
                            <Button
                                variant="default"
                                className="w-full bg-green-600 hover:bg-green-700"
                                onClick={onLoginClick}
                            >
                                <User className="w-4 h-4 mr-2" />
                                Đăng nhập
                            </Button>
                        </div>
                    </nav>

                    {/* Quick Stats */}
                    <div className="mt-8 p-4 bg-green-50 rounded-lg">
                        <p className="text-xs font-semibold text-green-900 mb-2">🎯 Săn Hoa - Tích Điểm</p>
                        <div className="space-y-1 text-xs text-green-700">
                            <p>✓ Quét QR tại vườn</p>
                            <p>✓ Nhận điểm thưởng</p>
                            <p>✓ Đổi quà hấp dẫn</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="ml-64 flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
