import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 16, ...props }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        />
    );
}

export function ArrowRightIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Icon>
    );
}

export function CopyIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 5V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </Icon>
    );
}

export function DownloadIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M8 3v7M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Icon>
    );
}

export function SparklesIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M8 2l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
            <path d="M3 10l.6 1.4L5 12l-1.4.6L3 14l-.6-1.4L1 12l1.4-.6L3 10Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
        </Icon>
    );
}

export function CodeIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="m5 4-3 4 3 4M11 4l3 4-3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Icon>
    );
}

export function LayersIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M8 2 1 6l7 4 7-4-7-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 10l7 4 7-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Icon>
    );
}

export function WorkflowIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <rect x="2" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="10" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="6" y="10" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 6v1.5a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 12 7.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 9v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </Icon>
    );
}

export function CheckIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="m3 8 4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Icon>
    );
}

export function ZapIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M9 2 4 9h4l-1 5 5-7H8l1-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
        </Icon>
    );
}

export function FileTextIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M9 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 2v4h4M5.5 9h5M5.5 11.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </Icon>
    );
}

export function TerminalIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="m5 7 2 2-2 2M9 11h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Icon>
    );
}

export function GitBranchIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <circle cx="5" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="11" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="5" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 5.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M11 5.5c0 3-6 2.5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </Icon>
    );
}

export function ExternalLinkIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M7 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10 2h4v4M14 2 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Icon>
    );
}

export function SunIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </Icon>
    );
}

export function MoonIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M13.5 8.5a5.5 5.5 0 0 1-7-7A5.5 5.5 0 1 0 13.5 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Icon>
    );
}
