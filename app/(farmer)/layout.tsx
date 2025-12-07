"use client";

import { useFarmer, FarmerAuthProvider } from "@/components/auth/FarmerAuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Flower2, ShoppingBag, Wallet, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useState } from "react";
import { AgriCopilot } from "@/components/farmer/AgriCopilot";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const NAV_ITEMS = [
    { label: "Tổng quan", icon: LayoutDashboard, href: "/farmer" },
    { label: "Vườn của tôi", icon: Flower2, href: "/farmer/products" },
    { label: "Đơn hàng", icon: ShoppingBag, href: "/farmer/orders" },
    { label: "Tài chính", icon: Wallet, href: "/farmer/finance" },
    { label: "Cài đặt", icon: Settings, href: "/farmer/settings" },
];

function FarmerSidebar() {
    const pathname = usePathname();
    const { profile } = useFarmer();

    return (
        <div className="flex flex-col h-full bg-stone-900 text-stone-300">
            <div className="p-6 border-b border-stone-800">
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🌿</span> Sa Dec Farmer
                </h1>
                <div className="mt-6 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-stone-700">
                        <Image src={profile.avatar} alt={profile.farmerName} fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">{profile.farmerName}</p>
                        <p className="text-xs text-stone-500">Nông dân số: #{profile.id?.substring(0, 8)}</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start gap-3 rounded-xl mb-1 ${isActive ? 'bg-amber-500 text-stone-900 font-bold hover:bg-amber-400' : 'hover:bg-stone-800 hover:text-white'}`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Button>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-stone-800">
                <Button variant="ghost" className="w-full justify-start gap-3 text-red-400 hover:bg-red-400/10 hover:text-red-300">
                    <LogOut className="w-5 h-5" />
                    Đăng xuất
                </Button>
            </div>
        </div>
    );
}

function FarmerLayoutContent({ children }: { children: React.ReactNode }) {
    const { isLoading } = useFarmer();

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-400">Đang tải dữ liệu nhà vườn...</div>
    }

    return (
        <div className="flex min-h-screen bg-stone-50">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 shrink-0 fixed inset-y-0 z-50">
                <FarmerSidebar />
            </div>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full z-50 bg-stone-900 border-b border-stone-800 px-4 h-16 flex items-center justify-between">
                <span className="font-bold text-white">Sa Dec Farmer</span>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white">
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 bg-stone-900 border-stone-800">
                        <FarmerSidebar />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-x-hidden">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}



function FarmerProtection({ children }: { children: React.ReactNode }) {
    const { profile, isLoading } = useFarmer();
    const [email, setEmail] = useState("farmer1@sadec.local");
    const [password, setPassword] = useState("password123");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-stone-50">Đang tải...</div>;

    // Helper Login for Dev/Demo purposes since we removed global mock
    const handleLogin = async () => {
        setIsLoggingIn(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) {
            toast.error("Đăng nhập thất bại: " + error.message);
        } else {
            toast.success("Đăng nhập thành công!");
            window.location.reload(); // Refresh to pick up session
        }
        setIsLoggingIn(false);
    };

    if (!profile.id) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
                    <h1 className="text-2xl font-bold text-center text-stone-900">🌾 Đăng Nhập Nhà Vườn</h1>
                    <p className="text-center text-stone-500 text-sm">Hệ thống quản lý nông nghiệp số Sa Đéc</p>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            type="email"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Mật khẩu</label>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            type="password"
                        />
                    </div>

                    <Button onClick={handleLogin} disabled={isLoggingIn} className="w-full bg-green-600 hover:bg-green-700 text-white">
                        {isLoggingIn ? "Đang xử lý..." : "Đăng Nhập"}
                    </Button>

                    <div className="text-xs text-center text-stone-400">
                        Gợi ý: farmer1@sadec.local / password123
                    </div>

                    <div className="pt-4 border-t border-stone-100">
                        <p className="text-xs text-center text-red-400 mb-2">Gặp lỗi 500? Dùng cái này 👇</p>
                        <Button
                            variant="outline"
                            className="w-full border-red-200 text-red-500 hover:bg-red-50"
                            onClick={async () => {
                                setIsLoggingIn(true);
                                try {
                                    const res = await fetch('/api/debug/create-farmer', {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            email: "farmer_final@sadec.local",
                                            password: "password123",
                                            name: "Farmer Final (Fixed)"
                                        })
                                    });
                                    if (res.ok) {
                                        const data = await res.json();
                                        if (data.redirectTo) {
                                            toast.success("Đang chuyển hướng đăng nhập...");
                                            window.location.href = data.redirectTo;
                                        } else {
                                            toast.success("Đã tạo tài khoản! Đang thử đăng nhập...");
                                            setEmail("farmer_final@sadec.local");
                                            setPassword("password123");
                                            setTimeout(() => handleLogin(), 1000);
                                        }
                                    } else {
                                        const err = await res.json();
                                        toast.error("Lỗi tạo user: " + err.error);
                                        setIsLoggingIn(false);
                                    }
                                } catch (e) {
                                    toast.error("Lỗi kết nối API");
                                    setIsLoggingIn(false);
                                }
                            }}
                        >
                            🆘 Tạo Tài Khoản Cứu Hộ
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return <FarmerLayoutContent>{children}</FarmerLayoutContent>;
}

export default function FarmerLayout({ children }: { children: React.ReactNode }) {
    return (
        <FarmerAuthProvider>
            <FarmerProtection>
                {children}
            </FarmerProtection>
            <AgriCopilot />
        </FarmerAuthProvider>
    );
}
