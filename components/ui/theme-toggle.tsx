"use client";

import { useCallback, useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    useEffect(() => {
        const stored = localStorage.getItem("theme") as "dark" | "light" | null;
        const initial = stored ?? (document.documentElement.classList.contains("light") ? "light" : "dark");
        setTheme(initial);
        document.documentElement.classList.toggle("light", initial === "light");
        document.documentElement.classList.toggle("dark", initial === "dark");
    }, []);

    const toggle = useCallback(() => {
        setTheme((prev) => {
            const next = prev === "dark" ? "light" : "dark";
            document.documentElement.classList.toggle("light", next === "light");
            document.documentElement.classList.toggle("dark", next === "dark");
            localStorage.setItem("theme", next);
            return next;
        });
    }, []);

    return (
        <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className={cn(
                "inline-flex size-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--foreground-muted)] transition-all hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]",
                className,
            )}
        >
            {theme === "dark" ? <SunIcon size={14} /> : <MoonIcon size={14} />}
        </button>
    );
}
