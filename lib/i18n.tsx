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
        // --- COMMON ---
        "app.title": "Sa Đéc Flower Hunt",
        "app.subtitle": "Festival Hoa Xuân 2026",
        "common.loading": "Đang tải dữ liệu...",
        "common.processing": "Đang xử lý...",
        "common.error": "Đã có lỗi xảy ra",
        "common.success": "Thành công",
        "common.sys_nominal": "HỆ THỐNG: ỔN ĐỊNH",
        "common.nodes": "NODES",
        "common.volume": "VOLUME",

        // --- NAVIGATION ---
        "nav.home": "Trang Chủ",
        "nav.orders": "Đơn Hàng",
        "nav.wishlist": "Yêu Thích",
        "nav.scan": "Quét AR",
        "nav.login_terminal": "ĐĂNG NHẬP TERMINAL",

        // --- LANDING PAGE ---
        "landing.hero.badge": "Official Data Terminal v3.0",
        "landing.hero.title_prefix": "HỆ ĐIỀU HÀNH",
        "landing.hero.title_highlight": "AGRI-OS",
        "landing.hero.subtitle": "Nền tảng vận hành Kinh tế Hoa Sa Đéc ($1B)",
        "landing.mission": "Khai mở tiềm năng <span class='text-emerald-400 font-semibold'>1 Tỷ USD</span> của ngành hoa kiểng Việt Nam thông qua hạ tầng dữ liệu và công nghệ sinh học tập trung.",
        "landing.cta.capital": "KÍCH HOẠT VỐN",
        "landing.cta.start": "BẮT ĐẦU NGAY",
        "landing.stats.farmers": "Nông Dân Số",
        "landing.stats.flowers": "Giống Hoa Mới",
        "landing.stats.revenue": "Dòng Tiền Thực",

        // --- AUTH MODAL ---
        "auth.login.title": "XÁC THỰC DANH TÍNH",
        "auth.signup.title": "ĐĂNG KÝ CÔNG DÂN SỐ",
        "auth.tab.login": "ĐĂNG NHẬP",
        "auth.tab.signup": "ĐĂNG KÝ",
        "auth.label.email": "ĐỊA CHỈ EMAIL",
        "auth.label.password": "MÃ BẢO MẬT (PASSWORD)",
        "auth.label.name": "TÊN ĐỊNH DANH",
        "auth.placeholder.email": "nhập_email_của_bạn@...",
        "auth.placeholder.password": "••••••••",
        "auth.placeholder.name": "Nguyễn Văn A",
        "auth.btn.login": "XÁC THỰC & TRUY CẬP",
        "auth.btn.signup": "KHỞI TẠO HỒ SƠ",
        "auth.btn.processing": "ĐANG KẾT NỐI...",
        "auth.switch.signup": "Chưa có mã định danh? Đăng ký",
        "auth.switch.login": "Đã có tài khoản? Đăng nhập",
        "auth.toast.success_login": "Xác thực danh tính thành công. Đang truy cập...",
        "auth.toast.success_signup": "Hồ sơ đã được khởi tạo. Vui lòng đăng nhập.",
        "auth.toast.redirect_shop": "Đang chuyển hướng đến Trạm Mua Sắm...",
        "auth.toast.redirect_admin": "Đang chuyển hướng đến Trung Tâm Điều Hành...",
        "auth.toast.redirect_farmer": "Đang chuyển hướng đến Trang Trại Số...",
        "auth.error.generic": "Xác thực thất bại. Vui lòng thử lại.",
        "auth.demo.customer": "KHÁCH HÀNG (DEMO)",
        "auth.demo.farmer": "NÔNG DÂN (DEMO)",
        "auth.demo.admin": "QUẢN TRỊ (DEMO)",

        // --- DASHBOARD (ADMIN) ---
        "dashboard.title": "BẢNG ĐIỀU HÀNH EXECUTIVE",
        "dashboard.subtitle": "Giám sát thời gian thực Tổ chức Tự trị",
        "dashboard.live_stream": "LIVE STREAM HOẠT ĐỘNG",
        "dashboard.syncing": "ĐANG ĐỒNG BỘ DỮ LIỆU...",
        "dashboard.live_command": "TRUNG TÂM CHỈ HUY LIVE",
        "dashboard.revenue_perf": "HIỆU SUẤT DOANH THU (T-7 NGÀY)",
        "dashboard.ai_activity": "HOẠT ĐỘNG AI AGENT",
        "dashboard.secure_footer": "KẾT NỐI BẢO MẬT // CẤP QUYỀN QUẢN TRỊ LEVEL 5",

        // --- SHOP & HOME ---
        "home.hot": "Hoa Hot Nhất 🔥",
        "home.scan_cta": "Quét QR Ngay",
        "home.scan_desc": "Khám phá vườn hoa Sa Đéc 🌸",
        "search.placeholder": "Nhập mã loài hoa hoặc tên...",
        "flower.price": "Giá tham khảo",
        "flower.add_to_cart": "Đặt Hàng Ngay",
        "flower.out_of_stock": "Hết hàng",

        // --- AGRI-OS CYBERPUNK ---
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
        "sidebar.modules": "MODULE HỆ THỐNG",
        "system.subtitle": "TERMINAL KINH TẾ HOA",
        "mobile.base": "CĂN CỨ",
        "mobile.mart": "CỬA HÀNG",
        "mobile.user": "TÀI KHOẢN",
        "mobile.mission": "NHIỆM VỤ",
        "mobile.obj": "MỤC TIÊU HIỆN TẠI",
        "mobile.scan_obj": "QUÉT HOA TẠI VƯỜN",
        "mobile.earn_obj": "NHẬN ĐIỂM THƯỞNG",
        "shop.ready": "BẠN ĐÃ SẴN SÀNG?",
        "shop.secure": "SADEC_OS KẾT NỐI BẢO MẬT // ĐÃ MÃ HÓA",
        "shop.net_id": "MÃ MẠNG: 8492-AX",
        "shop.secure_link": "LIÊN KẾT BẢO MẬT",
        "shop.access_cam": "MỞ CAMERA",

        // --- FARMER TERMINAL ---
        "farmer.title": "TERMINAL_NÔNG_TRẠI",
        "farmer.version": "v4.0",
        "farmer.operator": "NGƯỜI VẬN HÀNH",
        "farmer.time": "THỜI GIAN",
        "farmer.online": "TRỰC TUYẾN",
        "farmer.revenue_stream": "DÒNG_DOANH_THU",
        "farmer.orders_queue": "HÀNG_ĐỢI_ĐƠN_HÀNG",
        "farmer.bank_node": "LIÊN_KẾT_NGÂN_HÀNG",
        "farmer.credit_score": "Điểm Tín Dụng",
        "farmer.iot_network": "MẠNG_CẢM_BIẾN_IOT",
        "farmer.active": "HOẠT ĐỘNG",
        "farmer.system_log": "NHẬT_KÝ_HỆ_THỐNG",
        "farmer.revenue_breakdown": "PHÂN_TÍCH_DOANH_THU",
        "farmer.live": "TRỰC TIẾP",
        "farmer.week": "TUẦN",
        "farmer.month": "THÁNG",
        "farmer.today": "HÔM NAY",
        "farmer.urgent": "KHẨN CẤP",
        "farmer.pending": "ĐANG CHỜ",
        "farmer.units": "ĐƠN VỊ",
        "farmer.updated": "CẬP NHẬT",
        "farmer.score": "ĐIỂM",
        "farmer.temp": "NHIỆT ĐỘ",
        "farmer.humidity": "ĐỘ ẨM",
        "farmer.soil_ph": "ĐỘ_PH_ĐẤT",
        "farmer.moisture": "ĐỘ ẨM ĐẤT",
        "farmer.light": "ÁNH SÁNG",
        "farmer.wind": "GIÓ",
        "farmer.ai_rec": "⚡ KHUYẾN NGHỊ AI:",
        "farmer.ai_msg": "Tất cả thông số ổn định. Đề xuất duy trì lịch tưới hiện tại.",
        "farmer.no_data": "CHƯA_CÓ_DỮ_LIỆU",
        "farmer.new_product": "Sản Phẩm Mới",
        "farmer.view_orders": "Xem Đơn Hàng",
        "farmer.finance": "Tài Chính",
        "farmer.analytics": "Phân Tích",
        "farmer.authenticated": "đã xác thực",
        "farmer.farm_location": "Vị trí Nông trại",
        "farmer.sensors_active": "cảm biến hoạt động",
        "farmer.credit_updated": "Điểm tín dụng đã cập nhật",
        "farmer.system_nominal": "Hệ thống ổn định",
    },
    en: {
        // --- COMMON ---
        "app.title": "Sa Dec Flower Hunt",
        "app.subtitle": "Spring Flower Festival 2026",
        "common.loading": "Loading data...",
        "common.processing": "Processing...",
        "common.error": "An error occurred",
        "common.success": "Success",
        "common.sys_nominal": "SYSTEM: NOMINAL",
        "common.nodes": "NODES",
        "common.volume": "VOLUME",

        // --- NAVIGATION ---
        "nav.home": "Home",
        "nav.orders": "Orders",
        "nav.wishlist": "Wishlist",
        "nav.scan": "Scan AR",
        "nav.login_terminal": "LOGIN TERMINAL",

        // --- LANDING PAGE ---
        "landing.hero.badge": "Official Data Terminal v3.0",
        "landing.hero.title_prefix": "NATIONAL",
        "landing.hero.title_highlight": "AGRI-OS",
        "landing.hero.subtitle": "Operating System for the $1B Flower Economy",
        "landing.mission": "Unlocking the <span class='text-emerald-400 font-semibold'>$1 Billion</span> potential of Vietnam's flower economy through centralized data and biotech infrastructure.",
        "landing.cta.capital": "ACTIVATE CAPITAL",
        "landing.cta.start": "START NOW",
        "landing.stats.farmers": "Digital Farmers",
        "landing.stats.flowers": "New Species",
        "landing.stats.revenue": "Real Volume",

        // --- AUTH MODAL ---
        "auth.login.title": "IDENTITY VERIFICATION",
        "auth.signup.title": "CITIZEN REGISTRATION",
        "auth.tab.login": "LOGIN",
        "auth.tab.signup": "REGISTER",
        "auth.label.email": "EMAIL ADDRESS",
        "auth.label.password": "SECURITY CODE (PASSWORD)",
        "auth.label.name": "IDENTITY NAME",
        "auth.placeholder.email": "enter_your_email@...",
        "auth.placeholder.password": "••••••••",
        "auth.placeholder.name": "John Doe",
        "auth.btn.login": "VERIFY & ACCESS",
        "auth.btn.signup": "INITIALIZE PROFILE",
        "auth.btn.processing": "CONNECTING...",
        "auth.switch.signup": "No identity code? Register",
        "auth.switch.login": "Already registered? Login",
        "auth.toast.success_login": "Identity verified. Accessing system...",
        "auth.toast.success_signup": "Profile initialized. Please login.",
        "auth.toast.redirect_shop": "Redirecting to Market Module...",
        "auth.toast.redirect_admin": "Redirecting to Command Center...",
        "auth.toast.redirect_farmer": "Redirecting to Digital Farm...",
        "auth.error.generic": "Verification failed. Please retry.",
        "auth.demo.customer": "CUSTOMER (DEMO)",
        "auth.demo.farmer": "FARMER (DEMO)",
        "auth.demo.admin": "ADMIN (DEMO)",

        // --- DASHBOARD (ADMIN) ---
        "dashboard.title": "EXECUTIVE DASHBOARD",
        "dashboard.subtitle": "Real-time oversight of Autonomous Organization",
        "dashboard.live_stream": "LIVE STREAM ACTIVE",
        "dashboard.syncing": "SYNCING DATA...",
        "dashboard.live_command": "LIVE COMMAND CENTER",
        "dashboard.revenue_perf": "REVENUE PERFORMANCE (T-7 DAYS)",
        "dashboard.ai_activity": "AI AGENT ACTIVITY",
        "dashboard.secure_footer": "SECURE CONNECTION // ADMIN AUTHORIZATION LEVEL 5",

        // --- SHOP & HOME ---
        "home.hot": "Trending Flowers 🔥",
        "home.scan_cta": "Scan QR Now",
        "home.scan_desc": "Explore Sa Dec Gardens 🌸",
        "search.placeholder": "Input flower code or name...",
        "flower.price": "Reference Price",
        "flower.add_to_cart": "Order Now",
        "flower.out_of_stock": "Out of Stock",

        // --- AGRI-OS CYBERPUNK ---
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
        "sidebar.modules": "SYSTEM_MODULES",
        "system.subtitle": "FLOWER_ECONOMY_TERMINAL",
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

        // --- FARMER TERMINAL ---
        "farmer.title": "FARM_TERMINAL",
        "farmer.version": "v4.0",
        "farmer.operator": "OPERATOR",
        "farmer.time": "TIME",
        "farmer.online": "ONLINE",
        "farmer.revenue_stream": "REVENUE_STREAM",
        "farmer.orders_queue": "ORDERS_QUEUE",
        "farmer.bank_node": "BANK_NODE_LINK",
        "farmer.credit_score": "Credit Score",
        "farmer.iot_network": "IOT_SENSOR_NETWORK",
        "farmer.active": "ACTIVE",
        "farmer.system_log": "SYSTEM_LOG",
        "farmer.revenue_breakdown": "REVENUE_BREAKDOWN",
        "farmer.live": "LIVE",
        "farmer.week": "WEEK",
        "farmer.month": "MONTH",
        "farmer.today": "TODAY",
        "farmer.urgent": "URGENT",
        "farmer.pending": "PENDING",
        "farmer.units": "UNITS",
        "farmer.updated": "UPDATED",
        "farmer.score": "SCORE",
        "farmer.temp": "TEMP",
        "farmer.humidity": "HUMIDITY",
        "farmer.soil_ph": "SOIL_PH",
        "farmer.moisture": "MOISTURE",
        "farmer.light": "LIGHT",
        "farmer.wind": "WIND",
        "farmer.ai_rec": "⚡ AI RECOMMENDATION:",
        "farmer.ai_msg": "All parameters optimal. Suggest maintain current irrigation schedule.",
        "farmer.no_data": "NO_DATA_STREAM",
        "farmer.new_product": "New Product",
        "farmer.view_orders": "View Orders",
        "farmer.finance": "Finance",
        "farmer.analytics": "Analytics",
        "farmer.authenticated": "authenticated",
        "farmer.farm_location": "Farm location",
        "farmer.sensors_active": "sensors active",
        "farmer.credit_updated": "Credit score updated",
        "farmer.system_nominal": "System nominal",
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
        // 1. Check saved preference first
        const saved = localStorage.getItem("language") as Language
        if (saved && (saved === "vi" || saved === "en")) {
            setLanguage(saved)
            return
        }

        // 2. Geo-based detection: Default to VI for Vietnam timezone
        const detectLanguage = () => {
            try {
                const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
                // Vietnam timezone or neighboring Southeast Asian countries
                if (timeZone?.includes("Ho_Chi_Minh") ||
                    timeZone?.includes("Bangkok") ||
                    timeZone?.includes("Saigon")) {
                    setLanguage("vi")
                } else {
                    // Check browser language preference
                    const browserLang = navigator.language || (navigator as any).userLanguage
                    setLanguage(browserLang?.startsWith("vi") ? "vi" : "en")
                }
            } catch {
                // Default to Vietnamese for Vietnam deployment
                setLanguage("vi")
            }
        }
        detectLanguage()
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
