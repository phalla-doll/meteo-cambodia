import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
    variable: "--font-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TACTICAL WEATHER SYSTEM",
    description: "Real-time weather intelligence for 25 Cambodian provinces",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
