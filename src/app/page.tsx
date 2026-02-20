"use client";

import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    CurrentConditions,
    Header,
    ProvinceGrid,
    ProvinceMap,
    WeatherMetrics,
} from "@/components/weather";
import { useWeather } from "@/hooks/use-weather";

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
                    <p className="text-lg text-destructive">
                        Failed to load weather data
                    </p>
                    <button
                        type="button"
                        onClick={() => mutate()}
                        className="mt-4 text-primary hover:underline"
                    >
                        Try again
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-[400px] rounded-lg" />
                            <Skeleton className="h-[300px] rounded-lg" />
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

                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                        Weather Metrics
                    </h2>
                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Skeleton className="h-24 rounded-lg" />
                            <Skeleton className="h-24 rounded-lg" />
                            <Skeleton className="h-24 rounded-lg" />
                            <Skeleton className="h-24 rounded-lg" />
                        </div>
                    ) : (
                        <WeatherMetrics weather={selectedWeather} />
                    )}
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                        All Provinces ({weather?.length ?? 0})
                    </h2>
                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            <Skeleton className="h-20 rounded-lg" />
                            <Skeleton className="h-20 rounded-lg" />
                            <Skeleton className="h-20 rounded-lg" />
                            <Skeleton className="h-20 rounded-lg" />
                            <Skeleton className="h-20 rounded-lg" />
                            <Skeleton className="h-20 rounded-lg" />
                            <Skeleton className="h-20 rounded-lg" />
                            <Skeleton className="h-20 rounded-lg" />
                            <Skeleton className="h-20 rounded-lg" />
                            <Skeleton className="h-20 rounded-lg" />
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
