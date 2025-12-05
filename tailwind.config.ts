import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--color-bg)",
                foreground: "var(--color-text)",
                cyan: "var(--color-cyan)",
                purple: "var(--color-purple)",
                pink: "var(--color-pink)",
                blue: "var(--color-blue)",
            },
            fontFamily: {
                sans: ["var(--font-sora)", "sans-serif"],
            },
            animation: {
                "aurora-drift": "aurora-drift 25s ease-in-out infinite",
                "aurora-pulse": "aurora-pulse 20s ease-in-out infinite",
                "fade-in-up": "fadeInUp 0.6s ease-out forwards",
            },
        },
    },
    plugins: [],
};
export default config;
