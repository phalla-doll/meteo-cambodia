import { GoogleAnalytics } from "@next/third-parties/google";
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
    title: "METEO CAMBODIA",
    description: "Real-time weather intelligence for 25 Cambodian provinces",
    metadataBase: new URL("https://meteo-cambodia.vercel.app"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "METEO CAMBODIA",
        description:
            "Real-time weather intelligence for 25 Cambodian provinces",
        url: "https://meteo-cambodia.vercel.app",
        siteName: "METEO CAMBODIA",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "METEO CAMBODIA",
        description:
            "Real-time weather intelligence for 25 Cambodian provinces",
    },
    icons: {
        icon: "/favicon.svg",
        apple: "/apple-touch-icon.svg",
    },
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
            <GoogleAnalytics gaId="G-WVKKV2BPC0" />
        </html>
    );
}
