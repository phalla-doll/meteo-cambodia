"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { WeatherData } from "@/types/weather";
import { WeatherIcon } from "./weather-icon";

interface WeatherCardProps {
    weather: WeatherData;
    isSelected?: boolean;
    onClick?: () => void;
    compact?: boolean;
}

export function WeatherCard({
    weather,
    isSelected,
    onClick,
    compact = false,
}: WeatherCardProps) {
    return (
        <Card
            className={cn(
                "p-3 cursor-pointer transition-all border-border hover:border-primary/50",
                isSelected && "border-primary border-glow",
                compact && "p-2",
            )}
            onClick={onClick}
        >
            <div className={cn("flex items-center gap-3", compact && "gap-2")}>
                <WeatherIcon
                    condition={weather.condition}
                    isDay={weather.is_day}
                    size={compact ? "sm" : "md"}
                    className="opacity-80"
                />
                <div className="flex-1 min-w-0">
                    <p
                        className={cn(
                            "font-medium text-foreground truncate",
                            compact ? "text-xs font-mono uppercase" : "text-sm",
                        )}
                    >
                        {weather.name}
                    </p>
                    <p
                        className={cn(
                            "text-muted-foreground font-mono",
                            compact ? "text-[10px]" : "text-xs",
                        )}
                    >
                        {weather.condition.text}
                    </p>
                </div>
                <div className="text-right">
                    <p
                        className={cn(
                            "font-bold text-foreground font-mono",
                            compact ? "text-lg" : "text-2xl",
                        )}
                    >
                        {Math.round(weather.temp_c)}
                        <span className="text-primary text-sm">°</span>
                    </p>
                    {!compact && (
                        <p className="text-[10px] text-muted-foreground font-mono">
                            FEELS {Math.round(weather.feelslike_c)}°
                        </p>
                    )}
                </div>
            </div>
        </Card>
    );
}
