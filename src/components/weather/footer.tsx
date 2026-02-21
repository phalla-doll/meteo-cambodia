"use client";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface FooterProps {
    className?: string;
}

export function Footer({ className }: FooterProps) {
    return (
        <footer className={cn("bg-background", className)}>
            <div className="container mx-auto px-4 py-4 text-center">
                <p className="text-xs font-mono text-muted-foreground">
                    by{" "}
                    <a
                        href="https://manthaa.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors no-underline"
                        onClick={() =>
                            trackEvent.footerLinkClick("manthaa.dev")
                        }
                    >
                        Mantha
                    </a>{" "}
                    │ MEF.gov.kh
                </p>
            </div>
        </footer>
    );
}
