"use client";

import type MapLibreGL from "maplibre-gl";
import { useEffect, useMemo, useRef } from "react";
import {
    Map as MapComponent,
    MapMarker,
    MarkerContent,
    MarkerTooltip,
} from "@/components/ui/map";
import { trackEvent } from "@/lib/analytics";
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
    const mapRef = useRef<MapLibreGL.Map | null>(null);

    const weatherByProvince = useMemo(() => {
        const result = new Map<string, WeatherData>();
        for (const w of weather) {
            result.set(w.name, w);
        }
        return result;
    }, [weather]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        if (selectedProvince && provinceCoords[selectedProvince]) {
            map.flyTo({
                center: provinceCoords[selectedProvince],
                zoom: 8,
                duration: 800,
            });
        } else {
            map.flyTo({
                center: [105.0, 12.5],
                zoom: 6,
                duration: 800,
            });
        }
    }, [selectedProvince]);

    return (
        <div className="h-[400px] md:h-full min-h-[400px] border border-border overflow-hidden">
            <MapComponent
                ref={mapRef}
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
                            onClick={() => {
                                trackEvent.provinceSelected(name);
                                onSelectProvince(name);
                            }}
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
