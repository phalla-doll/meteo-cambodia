"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
    lastUpdated: string | null;
    isLoading: boolean;
    onRefresh: () => void;
}

export function Header({ lastUpdated, isLoading, onRefresh }: HeaderProps) {
    const formatTime = (dateString: string | null) => {
        if (!dateString) return "--:--";
        const date = new Date(dateString);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    return (
        <header className="border-b bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-primary">
                        National Weather Analytics Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Real-time weather data for Cambodia
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {lastUpdated && (
                        <div className="text-sm text-muted-foreground hidden md:block">
                            <span>Last updated: </span>
                            <span className="font-medium text-foreground">
                                {formatTime(lastUpdated)}
                            </span>
                        </div>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onRefresh}
                        disabled={isLoading}
                    >
                        <RefreshCw
                            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
                        />
                        Refresh
                    </Button>
                </div>
            </div>
        </header>
    );
}
