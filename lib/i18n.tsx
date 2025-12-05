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
