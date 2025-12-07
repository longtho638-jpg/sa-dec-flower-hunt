"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Mail, Lock, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

import { useRouter } from "next/navigation";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const router = useRouter();
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!supabase) return;
            const { data: { user }, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (user) {
                // Fetch profile to get role
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();

                if (profileError) {
                    console.error("Profile Fetch Error:", profileError);
                    toast.error(`Lỗi Profile: ${profileError.message}`);
                    window.location.reload();
                    return;
                }

                toast.success(`Đăng nhập thành công!`);
                setIsRedirecting(true); // Disable inputs, show redirect state

                // Redirect logic - DO NOT CLOSE MODAL
                if (profile?.role === 'farmer') {
                    toast.loading("Đang chuyển hướng đến Dashboard...");
                    window.location.href = '/farmer';
                } else if (profile?.role === 'admin') {
                    toast.loading("Đang chuyển hướng đến Admin...");
                    window.location.href = '/admin';
                } else {
                    toast.loading("Đang tải lại...");
                    window.location.reload();
                }
            }
        } catch (error: any) {
            toast.error(error.message || "Đăng nhập thất bại");
            setLoading(false);
        } finally {
            if (!isRedirecting) {
                setLoading(false);
            }
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!supabase) return;
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            });

            if (error) throw error;

            toast.success("Đăng ký thành công! Kiểm tra email để xác nhận.");
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Đăng ký thất bại");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <Card className="w-full max-w-md relative shadow-2xl bg-zinc-950 border-zinc-800 text-zinc-100">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white">
                        {mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        {mode === 'login'
                            ? 'Đăng nhập để theo dõi đơn hàng và tích điểm'
                            : 'Tạo tài khoản mới để bắt đầu săn hoa'}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
                        {mode === 'signup' && (
                            <div>
                                <label className="text-sm font-medium text-zinc-300">Họ tên</label>
                                <div className="relative mt-1">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <Input
                                        type="text"
                                        placeholder="Nguyễn Văn A"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-green-500 focus:ring-green-500/20"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-sm font-medium text-zinc-300">Email</label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <Input
                                    type="email"
                                    placeholder="email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-green-500 focus:ring-green-500/20"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-zinc-300">Mật khẩu</label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-green-500 focus:ring-green-500/20"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-2"
                            disabled={loading}
                        >
                            {loading ? 'Đang xử lý...' : mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                        </Button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                className="text-sm text-green-400 hover:text-green-300 hover:underline transition-colors"
                            >
                                {mode === 'login'
                                    ? 'Chưa có tài khoản? Đăng ký ngay'
                                    : 'Đã có tài khoản? Đăng nhập'}
                            </button>
                        </div>

                        {/* Quick Login (Demo) */}
                        <div className="pt-4 border-t border-zinc-800 mt-6">
                            <p className="text-xs text-center text-zinc-500 mb-3 uppercase tracking-wider font-semibold">Demo Accounts</p>
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-600"
                                    onClick={() => {
                                        setEmail('farmer1@sadec.com');
                                        setPassword('password123');
                                        toast.info('Sử dụng tài khoản demo Farmer');
                                    }}
                                >
                                    👨‍🌾 Farmer
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-600"
                                    onClick={() => {
                                        setEmail('customer1@example.com');
                                        setPassword('password123');
                                        toast.info('Sử dụng tài khoản demo Customer');
                                    }}
                                >
                                    🛒 Buyer
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
