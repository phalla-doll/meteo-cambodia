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
                "p-3 cursor-pointer transition-all hover:shadow-md",
                isSelected && "ring-2 ring-primary border-primary",
                compact && "p-2",
            )}
            onClick={onClick}
        >
            <div className={cn("flex items-center gap-3", compact && "gap-2")}>
                <WeatherIcon
                    condition={weather.condition}
                    isDay={weather.is_day}
                    size={compact ? "sm" : "md"}
                />
                <div className="flex-1 min-w-0">
                    <p
                        className={cn(
                            "font-medium text-foreground truncate",
                            compact ? "text-xs" : "text-sm",
                        )}
                    >
                        {weather.name}
                    </p>
                    <p
                        className={cn(
                            "text-muted-foreground",
                            compact ? "text-xs" : "text-sm",
                        )}
                    >
                        {weather.condition.text}
                    </p>
                </div>
                <div className="text-right">
                    <p
                        className={cn(
                            "font-semibold text-foreground",
                            compact ? "text-lg" : "text-2xl",
                        )}
                    >
                        {Math.round(weather.temp_c)}°
                    </p>
                    {!compact && (
                        <p className="text-xs text-muted-foreground">
                            Feels {Math.round(weather.feelslike_c)}°
                        </p>
                    )}
                </div>
            </div>
        </Card>
    );
}
