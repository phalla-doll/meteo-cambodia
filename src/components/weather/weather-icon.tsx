"use client";

import Image from "next/image";
import type { WeatherData } from "@/types/weather";

interface WeatherIconProps {
    condition: WeatherData["condition"];
    isDay: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
};

export function WeatherIcon({
    condition,
    isDay: _isDay,
    size = "md",
    className,
}: WeatherIconProps) {
    const iconSize = sizeMap[size];
    const iconUrl = condition.icon.startsWith("//")
        ? `https:${condition.icon}`
        : condition.icon;

    return (
        <Image
            src={iconUrl}
            alt={condition.text}
            width={iconSize}
            height={iconSize}
            className={className}
            unoptimized
        />
    );
}
