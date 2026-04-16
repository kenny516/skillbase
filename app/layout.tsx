import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
    title: "Skillbase — Reusable AI Skill Drafting",
    description: "Design structured, reusable AI skills in Markdown. Build faster with a dense, focused workspace inspired by Raycast.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body>{children}</body>
        </html>
    );
}
