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
    { label: "DASHBOARD", icon: LayoutDashboard, href: "/farmer" },
    { label: "MY_GARDEN", icon: Flower2, href: "/farmer/products" },
    { label: "ORDERS_LOG", icon: ShoppingBag, href: "/farmer/orders" },
    { label: "FINANCE_STREAM", icon: Wallet, href: "/farmer/finance" },
    { label: "SYSTEM_CONFIG", icon: Settings, href: "/farmer/settings" },
];

function FarmerSidebar() {
    const pathname = usePathname();
    const { profile } = useFarmer();

    return (
        <div className="flex flex-col h-full bg-[#030303] border-r border-white/10 text-zinc-400 font-mono text-sm">
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <h1 className="text-lg font-bold text-white tracking-widest">
                        SADEC.<span className="text-emerald-500">OS</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-emerald-500/30 transition-colors">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                        <Image src={profile.avatar} alt={profile.farmerName} fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">{profile.farmerName}</p>
                        <p className="text-[10px] text-emerald-500 truncate">ID: {profile.id?.substring(0, 8)}</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start gap-3 rounded-none border-l-2 h-10 mb-1 transition-all duration-300
                                    ${isActive
                                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                                        : 'border-transparent hover:bg-white/5 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </Button>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <div className="bg-emerald-950/30 rounded border border-emerald-500/20 p-3 mb-4">
                    <div className="flex justify-between items-center text-[10px] text-emerald-400 mb-1">
                        <span>SYSTEM STATUS</span>
                        <span className="animate-pulse">● ONLINE</span>
                    </div>
                    <div className="w-full bg-black h-1 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 w-full h-full animate-[shimmer_2s_infinite]" />
                    </div>
                </div>

                <Button variant="ghost" className="w-full justify-start gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 font-mono text-xs uppercase hover:border-red-500/50 border border-transparent">
                    <LogOut className="w-4 h-4" />
                    Logout_Terminal
                </Button>
            </div>
        </div>
    );
}

function FarmerLayoutContent({ children }: { children: React.ReactNode }) {
    const { isLoading } = useFarmer();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505] text-emerald-500 font-mono">
                <span className="animate-pulse">INITIALIZING_FARMER_NODE...</span>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#050505] text-zinc-300 font-mono selection:bg-emerald-500/30 selection:text-emerald-200">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 shrink-0 fixed inset-y-0 z-50">
                <FarmerSidebar />
            </div>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full z-50 bg-[#030303]/90 backdrop-blur border-b border-white/10 px-4 h-14 flex items-center justify-between">
                <span className="font-bold text-white tracking-widest text-sm">SADEC.OS</span>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-emerald-500 hover:bg-emerald-500/10">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 bg-[#030303] border-white/10 w-64">
                        <FarmerSidebar />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-6 pt-16 md:pt-6 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
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
        if (!supabase) {
            toast.error("Supabase client not initialized");
            setIsLoggingIn(false);
            return;
        }

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
