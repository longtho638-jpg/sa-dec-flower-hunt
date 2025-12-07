/**
 * SADEC.OS Design System
 * Terminal OS - Zero Technical Debt Foundation
 */

// ==================== COLOR TOKENS ====================
export const Colors = {
    // Primary Palette (Terminal OS)
    terminal: {
        black: '#000000',
        emerald: {
            50: '#ecfdf5',
            100: '#d1fae5',
            400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            900: '#064e3b',
        },
        slate: {
            50: '#f8fafc',
            200: '#e2e8f0',
            400: '#94a3b8',
            500: '#64748b',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
        },
        stone: {
            400: '#a8a29e',
            500: '#78716c',
            800: '#292524',
            900: '#1c1917',
            950: '#0c0a09',
        },
    },

    // Semantic Colors
    success: '#10b981', // emerald-500
    warning: '#f59e0b', // amber-500
    error: '#ef4444',   // red-500
    info: '#3b82f6',    // blue-500

    // Data Visualization
    data: {
        primary: '#10b981',   // emerald
        secondary: '#06b6d4', // cyan
        tertiary: '#8b5cf6',  // violet
        accent: '#f59e0b',    // amber
    }
} as const;

// ==================== TYPOGRAPHY ====================
export const Typography = {
    fontFamily: {
        mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
        sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },

    fontSize: {
        xs: '0.625rem',   // 10px - System labels
        sm: '0.75rem',    // 12px - Data values
        base: '0.875rem', // 14px - Body text
        lg: '1rem',       // 16px - Headers
        xl: '1.25rem',    // 20px - Section titles
        '2xl': '1.5rem',  // 24px - Page titles
        '3xl': '2rem',    // 32px - Hero
    },

    fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
        black: '900',
    },

    letterSpacing: {
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.2em',   // For uppercase terminal headers
    },
} as const;

// ==================== SPACING ====================
export const Spacing = {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
} as const;

// ==================== ANIMATIONS ====================
export const Animations = {
    duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
    },

    easing: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Framer Motion Variants
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },

    slideUp: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -20, opacity: 0 },
    },

    pulse: {
        animate: {
            scale: [1, 1.05, 1],
            opacity: [1, 0.8, 1],
        },
        transition: {
            duration: 2,
            repeat: Infinity,
        }
    },

    scanLine: {
        animate: {
            y: ['-100%', '100%'],
        },
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
        }
    }
} as const;

// ==================== BREAKPOINTS ====================
export const Breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;

// ==================== SHADOWS ====================
export const Shadows = {
    terminal: '0 0 20px rgba(16, 185, 129, 0.2)',
    glow: '0 0 30px rgba(16, 185, 129, 0.4)',
    none: 'none',
} as const;

// ==================== BORDERS ====================
export const Borders = {
    width: {
        thin: '1px',
        medium: '2px',
        thick: '4px',
    },

    radius: {
        none: '0',
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.5rem',
    },
} as const;

// ==================== COMPONENT TOKENS ====================
export const Components = {
    terminalCard: {
        background: 'rgba(15, 23, 42, 0.4)', // slate-950 with opacity
        border: `${Borders.width.thin} solid rgba(16, 185, 129, 0.2)`,
        borderRadius: Borders.radius.sm,
        padding: Spacing[4],
    },

    terminalHeader: {
        fontSize: Typography.fontSize.xs,
        fontFamily: Typography.fontFamily.mono,
        letterSpacing: Typography.letterSpacing.widest,
        textTransform: 'uppercase' as const,
        color: Colors.terminal.emerald[500],
    },

    dataValue: {
        fontSize: Typography.fontSize.xl,
        fontFamily: Typography.fontFamily.mono,
        fontWeight: Typography.fontWeight.bold,
        color: '#ffffff',
    },

    systemLog: {
        fontSize: Typography.fontSize.xs,
        fontFamily: Typography.fontFamily.mono,
        color: 'rgba(16, 185, 129, 0.6)',
        lineHeight: '1.5',
    }
} as const;

// ==================== UTILITIES ====================
export const cn = (...classes: (string | undefined | false)[]) => {
    return classes.filter(Boolean).join(' ');
};

export const getResponsiveClasses = (base: string, sm?: string, md?: string, lg?: string) => {
    return cn(
        base,
        sm && `sm:${sm}`,
        md && `md:${md}`,
        lg && `lg:${lg}`
    );
};
