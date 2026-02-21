"use client";

import { trackEvent } from "@/lib/analytics";
import type { WeatherData } from "@/types/weather";
import { WeatherCard } from "./weather-card";

interface ProvinceGridProps {
    weather: WeatherData[];
    selectedProvince: string | null;
    onSelectProvince: (name: string) => void;
}

export function ProvinceGrid({
    weather,
    selectedProvince,
    onSelectProvince,
}: ProvinceGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-border">
            {weather.map((w) => (
                <WeatherCard
                    key={w.id}
                    weather={w}
                    isSelected={selectedProvince === w.name}
                    onClick={() => {
                        trackEvent.provinceSelected(w.name);
                        onSelectProvince(w.name);
                    }}
                    compact
                />
            ))}
        </div>
    );
}
