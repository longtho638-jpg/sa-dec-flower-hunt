"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "vi" | "en"

type Translations = {
    [key in Language]: {
        [key: string]: string
    }
}

const translations: Translations = {
    vi: {
        "app.title": "Sa Đéc Flower Hunt",
        "app.subtitle": "Festival Hoa Xuân 2026",
        "nav.home": "Trang Chủ",
        "nav.orders": "Đơn Hàng",
        "nav.wishlist": "Yêu Thích",
        "nav.scan": "Quét AR",
        "home.hot": "Hoa Hot Nhất 🔥",
        "home.scan_cta": "Quét QR Ngay",
        "home.scan_desc": "Khám phá vườn hoa Sa Đéc 🌸",
        "search.placeholder": "Tìm kiếm loài hoa...",
        "flower.price": "Giá tham khảo",
        "flower.add_to_cart": "Đặt Hàng Ngay",
        "flower.out_of_stock": "Hết hàng",
        // Agri-OS Cyberpunk Terms
        "status.system": "TRẠNG THÁI HỆ THỐNG",
        "status.nominal": "ỔN ĐỊNH",
        "status.network": "MẠNG LƯỚI",
        "status.online": "TRỰC TUYẾN",
        "status.nodes": "SỐ LƯỢNG NODE",
        "status.secure_key": "MÃ BẢO MẬT",
        "cmd.access": "TRUY CẬP TERMINAL",
        "cmd.initiate": "KÍCH HOẠT QUÉT",
        "cmd.login": "ĐĂNG NHẬP",
        "cmd.logout": "ĐĂNG XUẤT",
        "sidebar.main": "TERMINAL CHÍNH",
        "sidebar.market": "TRẠM MUA SẮM",
        "sidebar.scan": "QUÉT DỮ LIỆU",
        "sidebar.event": "SỰ KIỆN LIVE",
        "sidebar.alliance": "MẠNG LƯỚI ĐỐI TÁC",
        "sidebar.data": "KHO DỮ LIỆU",
        "mobile.base": "CĂN CỨ",
        "mobile.mart": "CỬA HÀNG",
        "mobile.user": "TÀI KHOẢN",
        "mobile.mission": "Nhiệm Vụ",
        "mobile.obj": "MỤC TIÊU HIỆN TẠI",
        "mobile.scan_obj": "QUÉT HOA TẠI VƯỜN",
        "mobile.earn_obj": "NHẬN ĐIỂM THƯỞNG",
        "shop.ready": "BẠN ĐÃ SẴN SÀNG?",
        "shop.secure": "SADEC_OS KẾT NỐI BẢO MẬT // ĐÃ MÃ HÓA",
        "shop.net_id": "MÃ MẠNG: 8492-AX",
        "shop.secure_link": "LIÊN KẾT BẢO MẬT",
        "shop.access_cam": "MỞ CAMERA",
    },
    en: {
        "app.title": "Sa Dec Flower Hunt",
        "app.subtitle": "Spring Flower Festival 2026",
        "nav.home": "Home",
        "nav.orders": "Orders",
        "nav.wishlist": "Wishlist",
        "nav.scan": "Scan AR",
        "home.hot": "Trending Flowers 🔥",
        "home.scan_cta": "Scan QR Now",
        "home.scan_desc": "Explore Sa Dec Gardens 🌸",
        "search.placeholder": "Search for flowers...",
        "flower.price": "Reference Price",
        "flower.add_to_cart": "Order Now",
        "flower.out_of_stock": "Out of Stock",
        // Agri-OS Cyberpunk Terms
        "status.system": "SYSTEM_STATUS",
        "status.nominal": "NOMINAL",
        "status.network": "NETWORK",
        "status.online": "ONLINE",
        "status.nodes": "DATA_NODES",
        "status.secure_key": "SECURE_KEY",
        "cmd.access": "ACCESS_TERMINAL",
        "cmd.initiate": "INITIATE_SCAN",
        "cmd.login": "LOGIN",
        "cmd.logout": "LOGOUT",
        "sidebar.main": "MAIN_TERMINAL",
        "sidebar.market": "MARKET_MODULE",
        "sidebar.scan": "SCAN_SEQUENCE",
        "sidebar.event": "LIVE_EVENT",
        "sidebar.alliance": "ALLIANCE_NET",
        "sidebar.data": "DATA_ARCHIVE",
        "mobile.base": "BASE",
        "mobile.mart": "MART",
        "mobile.user": "USER",
        "mobile.mission": "MISSION_LOG",
        "mobile.obj": "CURRENT_OBJECTIVE",
        "mobile.scan_obj": "SCAN FLOWERS AT GARDEN",
        "mobile.earn_obj": "EARN CREDITS",
        "shop.ready": "ARE YOU READY TO INNOVATE?",
        "shop.secure": "SADEC_OS SECURE CONNECTION // ENCRYPTED",
        "shop.net_id": "NET_ID: 8492-AX",
        "shop.secure_link": "SECURE_LINK",
        "shop.access_cam": "ACCESS_CAMERA",
    }
}

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("vi")

    useEffect(() => {
        const saved = localStorage.getItem("language") as Language
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (saved) setLanguage(saved)
    }, [])

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang)
        localStorage.setItem("language", lang)
    }

    const t = (key: string) => {
        return translations[language][key] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
