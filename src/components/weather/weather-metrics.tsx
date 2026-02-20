"use client";

import { Cloud, Droplets, Gauge, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { WeatherData } from "@/types/weather";

interface WeatherMetricsProps {
    weather: WeatherData | null;
}

const metrics = [
    {
        key: "wind_kph",
        label: "Wind",
        unit: "km/h",
        icon: Wind,
        subKey: "wind_dir",
    },
    {
        key: "humidity",
        label: "Humidity",
        unit: "%",
        icon: Droplets,
    },
    {
        key: "precip_mm",
        label: "Precipitation",
        unit: "mm",
        icon: Cloud,
    },
    {
        key: "cloud",
        label: "Cloud Cover",
        unit: "%",
        icon: Gauge,
    },
];

export function WeatherMetrics({ weather }: WeatherMetricsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric) => {
                const Icon = metric.icon;
                const value = weather
                    ? (weather as unknown as Record<string, number | string>)[
                          metric.key
                      ]
                    : null;
                const subValue =
                    metric.subKey && weather
                        ? (
                              weather as unknown as Record<
                                  string,
                                  number | string
                              >
                          )[metric.subKey]
                        : null;

                return (
                    <Card key={metric.key}>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <Icon className="h-4 w-4" />
                                <span className="text-sm">{metric.label}</span>
                            </div>
                            {weather ? (
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-semibold text-foreground">
                                        {value}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {metric.unit}
                                    </span>
                                    {subValue && (
                                        <span className="text-sm text-muted-foreground ml-1">
                                            ({subValue})
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <span className="text-muted-foreground">
                                    --
                                </span>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
