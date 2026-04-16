/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./lib/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                muted: "var(--foreground-muted)",
                line: "var(--line)",
                accent: "var(--accent)",
                "accent-soft": "var(--accent-soft)",
                "accent-glow": "var(--accent-glow)",
                surface: "var(--surface)",
                "surface-strong": "var(--surface-strong)",
            },
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
                mono: ["\"JetBrains Mono\"", "\"SF Mono\"", "SFMono-Regular", "ui-monospace", "Menlo", "monospace"],
            },
            boxShadow: {
                panel: "0 24px 80px rgba(0, 0, 0, 0.4)",
                violet: "0 8px 32px rgba(139, 92, 246, 0.18)",
                "violet-lg": "0 16px 48px rgba(139, 92, 246, 0.24)",
            },
            borderRadius: {
                sm: "0.375rem",
                md: "0.5rem",
                lg: "0.625rem",
                xl: "0.875rem",
                "2xl": "1.125rem",
                "3xl": "1.5rem",
            },
            animation: {
                "fade-up": "fadeUp 0.5s ease-out both",
                "fade-up-delay": "fadeUp 0.5s ease-out 0.1s both",
                "fade-up-slow": "fadeUp 0.6s ease-out 0.2s both",
                "pulse-glow": "pulseGlow 3s ease-in-out infinite",
                "slide-in": "slideIn 0.3s ease-out both",
            },
            keyframes: {
                fadeUp: {
                    from: { opacity: "0", transform: "translateY(16px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                pulseGlow: {
                    "0%, 100%": { opacity: "0.4" },
                    "50%": { opacity: "0.7" },
                },
                slideIn: {
                    from: { opacity: "0", transform: "translateX(-8px)" },
                    to: { opacity: "1", transform: "translateX(0)" },
                },
            },
        },
    },
    plugins: [],
};
