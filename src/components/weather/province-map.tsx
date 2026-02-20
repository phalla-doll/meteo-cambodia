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
        <div className="h-[400px] md:h-full min-h-[400px] rounded-lg overflow-hidden border">
            <MapComponent
                center={[105.0, 12.5]}
                zoom={6}
                className="h-full w-full"
                theme="light"
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
                                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 shadow-lg transition-all cursor-pointer ${
                                        isSelected
                                            ? "bg-primary border-primary scale-125"
                                            : "bg-white border-primary/50 hover:border-primary hover:scale-110"
                                    }`}
                                >
                                    <span
                                        className={`text-xs font-bold ${
                                            isSelected
                                                ? "text-white"
                                                : "text-primary"
                                        }`}
                                    >
                                        {provinceWeather
                                            ? Math.round(provinceWeather.temp_c)
                                            : "--"}
                                    </span>
                                </div>
                            </MarkerContent>
                            <MarkerTooltip>
                                <div className="text-center">
                                    <p className="font-medium">{name}</p>
                                    {provinceWeather && (
                                        <p className="text-xs opacity-80">
                                            {Math.round(provinceWeather.temp_c)}
                                            °C -{" "}
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
