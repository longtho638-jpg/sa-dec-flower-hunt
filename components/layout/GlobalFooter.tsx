"use client";

import Link from "next/link";
import { AgriosVectorLogo } from "@/components/brand/AgriosVectorLogo";
import { useLanguage } from "@/lib/i18n";
import {
    Facebook, Instagram, Youtube,
    Mail, Phone, MapPin,
    FileText, Shield, CreditCard, Info, Users, Briefcase
} from "lucide-react";

// Footer Structure - Complete Data Integrity
const FOOTER_LINKS = {
    company: {
        label: "Công Ty",
        labelEn: "Company",
        items: [
            { href: "/about", label: "Giới Thiệu", labelEn: "About Us" },
            { href: "/founding", label: "Câu Chuyện", labelEn: "Our Story" },
            { href: "/contact", label: "Liên Hệ", labelEn: "Contact" },
            { href: "/insights", label: "Báo Cáo", labelEn: "Insights" },
        ]
    },
    legal: {
        label: "Pháp Lý",
        labelEn: "Legal",
        items: [
            { href: "/terms", label: "Điều Khoản", labelEn: "Terms" },
            { href: "/privacy", label: "Bảo Mật", labelEn: "Privacy" },
            { href: "/payment-policy", label: "Thanh Toán", labelEn: "Payments" },
        ]
    },
    business: {
        label: "Doanh Nghiệp",
        labelEn: "Business",
        items: [
            { href: "/partner", label: "Đối Tác", labelEn: "Partners" },
            { href: "/suppliers", label: "Nhà Cung Cấp", labelEn: "Suppliers" },
            { href: "/investor", label: "Nhà Đầu Tư", labelEn: "Investors" },
            { href: "/fintech", label: "Fintech", labelEn: "Fintech" },
        ]
    },
    features: {
        label: "Tính Năng",
        labelEn: "Features",
        items: [
            { href: "/festival", label: "Lễ Hội", labelEn: "Festival" },
            { href: "/hunt", label: "AR Hunt", labelEn: "AR Hunt" },
            { href: "/adopt", label: "Nhận Nuôi", labelEn: "Adopt" },
            { href: "/leaderboard", label: "Xếp Hạng", labelEn: "Ranks" },
        ]
    }
};

export function GlobalFooter() {
    const { language } = useLanguage();
    const isVi = language === 'vi';
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-white/5 text-stone-400">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <AgriosVectorLogo variant="full" className="h-10" animate={false} />
                        <p className="text-sm text-stone-500 leading-relaxed">
                            {isVi
                                ? 'Nền tảng nông nghiệp thông minh, kết nối du khách với làng hoa Sa Đéc.'
                                : 'Smart agriculture platform connecting tourists with Sa Dec flower village.'}
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3 pt-2">
                            <a href="https://facebook.com/agrios.tech" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://instagram.com/agrios.tech" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://youtube.com/@agrios.tech" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors">
                                <Youtube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(FOOTER_LINKS).map(([key, section]) => (
                        <div key={key} className="space-y-4">
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                                {isVi ? section.label : section.labelEn}
                            </h3>
                            <ul className="space-y-2">
                                {section.items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="text-sm hover:text-emerald-400 transition-colors"
                                        >
                                            {isVi ? item.label : item.labelEn}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact Bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-6 text-sm">
                    <a href="mailto:hello@agrios.tech" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                        <Mail className="w-4 h-4" />
                        hello@agrios.tech
                    </a>
                    <a href="tel:+84939888888" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                        <Phone className="w-4 h-4" />
                        0939 888 888
                    </a>
                    <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {isVi ? 'Làng Hoa Sa Đéc, Đồng Tháp' : 'Sa Dec Flower Village, Dong Thap'}
                    </span>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 py-4">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
                    <p>© {currentYear} AGRIOS Tech. {isVi ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}</p>
                    <p className="font-mono text-emerald-500/50">
                        GARDEN_OS v2.0 // NODE_ACTIVE
                    </p>
                </div>
            </div>
        </footer>
    );
}
