"use client";

import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeaderProps {
    lastUpdated: string | null;
    isLoading: boolean;
    onRefresh: () => void;
}

function formatTime(dateString: string | null) {
    if (!dateString) return "--:--";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export function Header({ lastUpdated, isLoading, onRefresh }: HeaderProps) {
    return (
        <header className="border-b border-border bg-background sticky top-0 z-50">
            <div className="h-1 bg-primary"></div>
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.svg"
                        alt="Meteo Cambodia"
                        width={24}
                        height={24}
                        className="shrink-0"
                    />
                    <h1 className="text-sm font-mono font-bold tracking-widest uppercase">
                        <span className="text-primary">METEO</span>
                        <span className="text-foreground"> CAMBODIA</span>
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    {lastUpdated ? (
                        <div className="text-xs font-mono text-muted-foreground hidden md:flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary animate-pulse"></span>
                            <span>LIVE</span>
                            <span className="text-foreground">
                                {formatTime(lastUpdated)}
                            </span>
                        </div>
                    ) : null}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onRefresh}
                        disabled={isLoading}
                        className="h-8"
                    >
                        <RefreshCw
                            className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
                        />
                        <span className="hidden sm:inline">SYNC</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
