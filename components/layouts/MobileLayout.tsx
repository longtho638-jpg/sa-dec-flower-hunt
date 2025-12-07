"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, Scan, Menu, X, Home, FileText, Handshake } from "lucide-react";
import { useState } from "react";

interface MobileLayoutProps {
    children: React.ReactNode;
    onLoginClick: () => void;
}

/**
 * Mobile Layout - Mobile-first optimized
 * Features: Compact header, bottom navigation, drawer menu
 */
export function MobileLayout({ children, onLoginClick }: MobileLayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-stone-50 pb-20">
            {/* Mobile Header */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-stone-200 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg hover:bg-stone-100"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-stone-900 flex items-center gap-1">
                                <span>🌸</span> Sa Đéc
                            </h1>
                            <p className="text-xs text-stone-500">Festival Hoa 2028</p>
                        </div>
                    </div>

                    <Button
                        size="sm"
                        onClick={onLoginClick}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        <User className="w-4 h-4 mr-1" />
                        Login
                    </Button>
                </div>
            </header>

            {/* Slide-out Menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div
                        className="w-64 h-full bg-white shadow-2xl p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <nav className="space-y-3">
                            <Link href="/" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start gap-2">
                                    <Home className="w-4 h-4" />
                                    Trang chủ
                                </Button>
                            </Link>
                            <Link href="/scan" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start gap-2">
                                    <Scan className="w-4 h-4" />
                                    Quét QR
                                </Button>
                            </Link>
                            <Link href="/blog" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start gap-2">
                                    <FileText className="w-4 h-4" />
                                    Blog
                                </Button>
                            </Link>
                            <Link href="/partner" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start gap-2">
                                    <Handshake className="w-4 h-4" />
                                    Đối tác
                                </Button>
                            </Link>
                        </nav>

                        {/* Quick Info */}
                        <div className="mt-8 p-4 bg-green-50 rounded-lg">
                            <p className="text-xs font-semibold text-green-900 mb-2">🎁 Săn Hoa - Nhận Quà</p>
                            <p className="text-xs text-green-700">Quét QR tại vườn để tích điểm!</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="px-4 pt-4">
                {children}
            </main>

            {/* Bottom Navigation (Mobile) */}
            <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 px-4 py-3">
                <div className="flex items-center justify-around">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="flex-col h-auto gap-1 px-3">
                            <Home className="w-5 h-5" />
                            <span className="text-xs">Home</span>
                        </Button>
                    </Link>
                    <Link href="/scan">
                        <Button variant="ghost" size="sm" className="flex-col h-auto gap-1 px-3">
                            <Scan className="w-5 h-5" />
                            <span className="text-xs">Scan</span>
                        </Button>
                    </Link>
                    <Link href="/blog">
                        <Button variant="ghost" size="sm" className="flex-col h-auto gap-1 px-3">
                            <FileText className="w-5 h-5" />
                            <span className="text-xs">Blog</span>
                        </Button>
                    </Link>
                    <button onClick={onLoginClick}>
                        <Button variant="ghost" size="sm" className="flex-col h-auto gap-1 px-3">
                            <User className="w-5 h-5" />
                            <span className="text-xs">Tài khoản</span>
                        </Button>
                    </button>
                </div>
            </nav>
        </div>
    );
}
