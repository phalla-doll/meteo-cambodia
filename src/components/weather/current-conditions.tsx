"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { WeatherData } from "@/types/weather";
import { WeatherIcon } from "./weather-icon";

interface CurrentConditionsProps {
    weather: WeatherData | null;
}

export function CurrentConditions({ weather }: CurrentConditionsProps) {
    if (!weather) {
        return (
            <Card className="h-full">
                <CardContent className="p-6 flex items-center justify-center h-full">
                    <p className="text-muted-foreground">
                        Select a province to view details
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <WeatherIcon
                        condition={weather.condition}
                        isDay={weather.is_day}
                        size="lg"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-foreground">
                            {weather.name}
                        </h2>
                        <p className="text-muted-foreground">
                            {weather.condition.text}
                        </p>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-foreground">
                            {Math.round(weather.temp_c)}
                        </span>
                        <span className="text-2xl text-muted-foreground">
                            °C
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                        Feels like {Math.round(weather.feelslike_c)}°C
                    </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Humidity</p>
                            <p className="font-medium text-foreground">
                                {weather.humidity}%
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Wind</p>
                            <p className="font-medium text-foreground">
                                {weather.wind_kph} km/h {weather.wind_dir}
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Pressure</p>
                            <p className="font-medium text-foreground">
                                {weather.pressure_mb} mb
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Visibility</p>
                            <p className="font-medium text-foreground">
                                {weather.vis_km} km
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
