"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CurrentConditions } from "@/components/weather/current-conditions";
import { Header } from "@/components/weather/header";
import { ProvinceGrid } from "@/components/weather/province-grid";
import { WeatherMetrics } from "@/components/weather/weather-metrics";
import { useWeather } from "@/hooks/use-weather";

const ProvinceMap = dynamic(
    () =>
        import("@/components/weather/province-map").then(
            (mod) => mod.ProvinceMap,
        ),
    {
        ssr: false,
        loading: () => <Skeleton className="h-[400px] bg-card" />,
    },
);

export default function Dashboard() {
    const { weather, isLoading, isError, mutate } = useWeather();
    const [selectedProvince, setSelectedProvince] = useState<string | null>(
        "Phnom Penh",
    );

    const selectedWeather = useMemo(() => {
        if (!weather || !selectedProvince) return null;
        return weather.find((w) => w.name === selectedProvince) ?? null;
    }, [weather, selectedProvince]);

    const lastUpdated = useMemo(() => {
        if (!weather || weather.length === 0) return null;
        const sorted = [...weather].sort(
            (a, b) =>
                new Date(b.last_updated).getTime() -
                new Date(a.last_updated).getTime(),
        );
        return sorted[0]?.last_updated ?? null;
    }, [weather]);

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-sm font-mono uppercase tracking-wide text-destructive">
                        System Error
                    </p>
                    <p className="text-muted-foreground font-mono text-xs mt-2">
                        Failed to load weather data
                    </p>
                    <button
                        type="button"
                        onClick={() => mutate()}
                        className="mt-4 text-primary font-mono text-sm uppercase tracking-wide hover:underline"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header
                lastUpdated={lastUpdated}
                isLoading={isLoading}
                onRefresh={() => mutate()}
            />

            <main className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border mb-px">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-[400px] bg-card" />
                            <Skeleton className="h-[300px] bg-card" />
                        </>
                    ) : (
                        <>
                            <ProvinceMap
                                weather={weather ?? []}
                                selectedProvince={selectedProvince}
                                onSelectProvince={setSelectedProvince}
                            />
                            <CurrentConditions weather={selectedWeather} />
                        </>
                    )}
                </div>

                <section className="mb-px">
                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
                            <Skeleton className="h-24 bg-card" />
                            <Skeleton className="h-24 bg-card" />
                            <Skeleton className="h-24 bg-card" />
                            <Skeleton className="h-24 bg-card" />
                        </div>
                    ) : (
                        <WeatherMetrics weather={selectedWeather} />
                    )}
                </section>

                <section>
                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-border">
                            {[
                                "01",
                                "02",
                                "03",
                                "04",
                                "05",
                                "06",
                                "07",
                                "08",
                                "09",
                                "10",
                            ].map((n) => (
                                <Skeleton
                                    key={`skeleton-${n}`}
                                    className="h-16 bg-card"
                                />
                            ))}
                        </div>
                    ) : (
                        <ProvinceGrid
                            weather={weather ?? []}
                            selectedProvince={selectedProvince}
                            onSelectProvince={setSelectedProvince}
                        />
                    )}
                </section>
            </main>
        </div>
    );
}
