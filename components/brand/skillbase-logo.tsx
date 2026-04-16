import { cn } from "@/lib/utils";

type SkillbaseLogoProps = {
    className?: string;
    iconClassName?: string;
    labelClassName?: string;
    size?: number;
    showLabel?: boolean;
    compact?: boolean;
};

export function SkillbaseLogo({
    className,
    iconClassName,
    labelClassName,
    size = 28,
    showLabel = true,
    compact = false,
}: SkillbaseLogoProps) {
    return (
        <span className={cn("inline-flex items-center", compact ? "gap-2" : "gap-2.5", className)}>
            <span
                className={cn(
                    "inline-flex items-center justify-center rounded-lg border border-white/10 bg-[#11131a] shadow-[0_10px_30px_rgba(4,8,20,0.35)]",
                    iconClassName,
                )}
                style={{ width: size, height: size }}
                aria-hidden="true"
            >
                <svg
                    width={Math.round(size * 0.82)}
                    height={Math.round(size * 0.82)}
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="skillbase-logo-a" x1="14" y1="10" x2="50" y2="54" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#67E8F9" />
                            <stop offset="0.52" stopColor="#8B5CF6" />
                            <stop offset="1" stopColor="#34D399" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M19 13.5C19 11.567 20.567 10 22.5 10H41.5C43.433 10 45 11.567 45 13.5C45 15.433 43.433 17 41.5 17H22.5C20.567 17 19 15.433 19 13.5Z"
                        fill="url(#skillbase-logo-a)"
                    />
                    <path
                        d="M13 31.5C13 29.567 14.567 28 16.5 28H35.5C37.433 28 39 29.567 39 31.5C39 33.433 37.433 35 35.5 35H16.5C14.567 35 13 33.433 13 31.5Z"
                        fill="url(#skillbase-logo-a)"
                        opacity="0.96"
                    />
                    <path
                        d="M25 49.5C25 47.567 26.567 46 28.5 46H47.5C49.433 46 51 47.567 51 49.5C51 51.433 49.433 53 47.5 53H28.5C26.567 53 25 51.433 25 49.5Z"
                        fill="url(#skillbase-logo-a)"
                        opacity="0.92"
                    />
                    <path
                        d="M44.386 15.636L49.314 18.364C50.416 18.974 50.814 20.363 50.204 21.465L40.196 39.535C39.586 40.637 38.197 41.035 37.095 40.425L32.167 37.697C31.065 37.087 30.667 35.698 31.277 34.596L41.285 16.526C41.895 15.424 43.284 15.026 44.386 15.636Z"
                        fill="#F8FAFC"
                    />
                </svg>
            </span>
            {showLabel ? (
                <span className={cn("text-sm font-semibold tracking-tight text-white", labelClassName)}>
                    Skillbase
                </span>
            ) : null}
        </span>
    );
}
