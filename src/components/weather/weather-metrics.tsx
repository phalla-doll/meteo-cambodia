"use client";

import {
    CloudIcon,
    DashboardSpeed01Icon,
    DropletIcon,
    WindPowerIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
        icon: WindPowerIcon,
        subKey: "wind_dir",
    },
    {
        key: "humidity",
        label: "Humidity",
        unit: "%",
        icon: DropletIcon,
    },
    {
        key: "precip_mm",
        label: "Precipitation",
        unit: "mm",
        icon: CloudIcon,
    },
    {
        key: "cloud",
        label: "Cloud Cover",
        unit: "%",
        icon: DashboardSpeed01Icon,
    },
];

export function WeatherMetrics({ weather }: WeatherMetricsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {metrics.map((metric) => {
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
                    <Card key={metric.key} className="border-0 bg-card">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-muted-foreground mb-3">
                                <HugeiconsIcon
                                    icon={metric.icon}
                                    size={16}
                                    color="currentColor"
                                />
                                <span className="text-xs font-mono uppercase tracking-wide">
                                    {metric.label}
                                </span>
                            </div>
                            {weather ? (
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-foreground font-mono data-pulse">
                                        {value}
                                    </span>
                                    <span className="text-sm text-muted-foreground font-mono">
                                        {metric.unit}
                                    </span>
                                    {subValue && (
                                        <span className="text-xs text-primary font-mono ml-1">
                                            {subValue}
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <span className="text-muted-foreground font-mono">
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
