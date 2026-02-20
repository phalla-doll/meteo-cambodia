"use client";

import { useMemo } from "react";
import {
    Map as MapComponent,
    MapMarker,
    MarkerContent,
    MarkerTooltip,
} from "@/components/ui/map";
import { provinceCoords } from "@/lib/api";
import type { WeatherData } from "@/types/weather";

interface ProvinceMapProps {
    weather: WeatherData[];
    selectedProvince: string | null;
    onSelectProvince: (name: string) => void;
}

export function ProvinceMap({
    weather,
    selectedProvince,
    onSelectProvince,
}: ProvinceMapProps) {
    const weatherByProvince = useMemo(() => {
        const result = new Map<string, WeatherData>();
        for (const w of weather) {
            result.set(w.name, w);
        }
        return result;
    }, [weather]);

    return (
        <div className="h-[400px] md:h-full min-h-[400px] border border-border overflow-hidden">
            <MapComponent
                center={[105.0, 12.5]}
                zoom={6}
                className="h-full w-full"
                theme="dark"
            >
                {Object.entries(provinceCoords).map(([name, coords]) => {
                    const provinceWeather = weatherByProvince.get(name);
                    const isSelected = selectedProvince === name;

                    return (
                        <MapMarker
                            key={name}
                            longitude={coords[0]}
                            latitude={coords[1]}
                            onClick={() => onSelectProvince(name)}
                        >
                            <MarkerContent>
                                <div
                                    className={`flex items-center justify-center w-8 h-8 border-2 transition-all cursor-pointer ${
                                        isSelected
                                            ? "bg-primary border-primary glow-primary"
                                            : "bg-card border-border hover:border-primary"
                                    }`}
                                >
                                    <span
                                        className={`text-xs font-mono font-bold ${
                                            isSelected
                                                ? "text-primary-foreground"
                                                : "text-foreground"
                                        }`}
                                    >
                                        {provinceWeather
                                            ? Math.round(provinceWeather.temp_c)
                                            : "--"}
                                    </span>
                                </div>
                            </MarkerContent>
                            <MarkerTooltip>
                                <div className="text-center bg-card border border-border px-3 py-2">
                                    <p className="font-mono text-xs uppercase tracking-wide text-foreground">
                                        {name}
                                    </p>
                                    {provinceWeather && (
                                        <p className="text-[10px] text-muted-foreground font-mono mt-1">
                                            {Math.round(provinceWeather.temp_c)}
                                            °C ·{" "}
                                            {provinceWeather.condition.text}
                                        </p>
                                    )}
                                </div>
                            </MarkerTooltip>
                        </MapMarker>
                    );
                })}
            </MapComponent>
        </div>
    );
}
