"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"
import { Globe } from "lucide-react"

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage()

    return (
        <Button
            variant="ghost"
            size="sm"
            className="rounded-full w-9 h-9 p-0"
            onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
        >
            <span className="font-bold text-xs">{language === "vi" ? "EN" : "VI"}</span>
            <span className="sr-only">Toggle Language</span>
        </Button>
    )
}
