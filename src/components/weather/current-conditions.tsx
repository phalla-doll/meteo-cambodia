"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useUv } from "@/hooks/use-uv";
import { getUvInfo } from "@/types/uv";
import type { WeatherData } from "@/types/weather";
import { WeatherIcon } from "./weather-icon";

interface CurrentConditionsProps {
    weather: WeatherData | null;
    province: string | null;
}

export function CurrentConditions({
    weather,
    province,
}: CurrentConditionsProps) {
    const { uv } = useUv(province);

    const uvInfo = uv ? getUvInfo(uv.uv) : null;

    if (!weather) {
        return (
            <Card className="h-full flex items-center justify-center border-border">
                <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground font-mono text-sm uppercase tracking-wide">
                        Select Province
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full border-border corner-glow-subtle card-noise">
            <CardContent className="p-6 h-full flex flex-col relative z-10">
                <div className="flex items-start gap-4">
                    <WeatherIcon
                        condition={weather.condition}
                        isDay={weather.is_day}
                        size="lg"
                        className="opacity-90"
                    />
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-foreground uppercase tracking-wide">
                            {weather.name}
                        </h2>
                        <p className="text-muted-foreground font-mono text-sm mt-1">
                            {weather.condition.text}
                        </p>
                    </div>
                </div>

                <div className="mt-auto pt-8">
                    <div className="flex items-baseline gap-2">
                        <span className="text-7xl font-bold text-foreground font-mono data-pulse">
                            {Math.round(weather.temp_c)}
                        </span>
                        <span className="text-3xl text-primary font-mono">
                            °C
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 font-mono">
                        FEELS LIKE {Math.round(weather.feelslike_c)}°C
                    </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="space-y-1">
                            <p className="text-muted-foreground font-mono text-xs uppercase">
                                Humidity
                            </p>
                            <p className="font-mono text-foreground text-lg">
                                {weather.humidity}
                                <span className="text-muted-foreground">%</span>
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-muted-foreground font-mono text-xs uppercase">
                                Wind
                            </p>
                            <p className="font-mono text-foreground text-lg">
                                {weather.wind_kph}
                                <span className="text-muted-foreground text-sm">
                                    {" "}
                                    km/h
                                </span>
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-muted-foreground font-mono text-xs uppercase">
                                UV Index
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="font-mono text-foreground text-lg">
                                    {uv?.uv.toFixed(1) ?? "--"}
                                </p>
                                {uvInfo && (
                                    <span
                                        className={`text-[10px] font-mono uppercase tracking-wider ${uvInfo.textColor}`}
                                    >
                                        {uvInfo.level}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-muted-foreground font-mono text-xs uppercase">
                                Pressure
                            </p>
                            <p className="font-mono text-foreground text-lg">
                                {weather.pressure_mb}
                                <span className="text-muted-foreground text-sm">
                                    {" "}
                                    mb
                                </span>
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-muted-foreground font-mono text-xs uppercase">
                                Visibility
                            </p>
                            <p className="font-mono text-foreground text-lg">
                                {weather.vis_km}
                                <span className="text-muted-foreground text-sm">
                                    {" "}
                                    km
                                </span>
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-muted-foreground font-mono text-xs uppercase">
                                Dewpoint
                            </p>
                            <p className="font-mono text-foreground text-lg">
                                {Math.round(weather.dewpoint_c)}
                                <span className="text-muted-foreground text-sm">
                                    {" "}
                                    °C
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
