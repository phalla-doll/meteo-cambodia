"use client";

import {
    CloudAngledRainZapIcon,
    CloudBigRainIcon,
    CloudFastWindIcon,
    CloudHailstoneIcon,
    CloudIcon,
    CloudLittleRainIcon,
    CloudLittleSnowIcon,
    CloudMidRainIcon,
    CloudMidSnowIcon,
    CloudSnowIcon,
    Moon01Icon,
    MoonCloudAngledRainIcon,
    MoonCloudAngledZapIcon,
    MoonCloudBigRainIcon,
    MoonCloudHailstoneIcon,
    MoonCloudIcon,
    MoonCloudLittleRainIcon,
    MoonCloudLittleSnowIcon,
    MoonCloudMidRainIcon,
    MoonCloudMidSnowIcon,
    MoonCloudSnowIcon,
    MoonSlowWindIcon,
    Sun01Icon,
    SunCloud01Icon,
    SunCloudAngledRainIcon,
    SunCloudAngledZapIcon,
    SunCloudBigRainIcon,
    SunCloudHailstoneIcon,
    SunCloudLittleRainIcon,
    SunCloudLittleSnowIcon,
    SunCloudMidRainIcon,
    SunCloudMidSnowIcon,
    SunCloudSnowIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { WeatherData } from "@/types/weather";

interface WeatherIconProps {
    condition: WeatherData["condition"];
    isDay: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const sizeMap = {
    sm: 28,
    md: 42,
    lg: 56,
};

type IconVariant = {
    day: typeof CloudIcon;
    night: typeof CloudIcon;
    color: string;
};

const weatherIconMap: Record<number, IconVariant> = {
    1000: {
        day: Sun01Icon,
        night: Moon01Icon,
        color: "#FBBF24",
    },
    1003: {
        day: SunCloud01Icon,
        night: MoonCloudIcon,
        color: "#FBBF24",
    },
    1006: {
        day: CloudIcon,
        night: CloudIcon,
        color: "#9CA3AF",
    },
    1009: {
        day: CloudIcon,
        night: CloudIcon,
        color: "#6B7280",
    },
    1030: {
        day: CloudFastWindIcon,
        night: MoonSlowWindIcon,
        color: "#9CA3AF",
    },
    1063: {
        day: SunCloudLittleRainIcon,
        night: MoonCloudLittleRainIcon,
        color: "#60A5FA",
    },
    1066: {
        day: SunCloudLittleSnowIcon,
        night: MoonCloudLittleSnowIcon,
        color: "#E0E7FF",
    },
    1069: {
        day: CloudLittleSnowIcon,
        night: CloudLittleSnowIcon,
        color: "#E0E7FF",
    },
    1072: {
        day: SunCloudLittleRainIcon,
        night: MoonCloudLittleRainIcon,
        color: "#93C5FD",
    },
    1087: {
        day: SunCloudAngledRainIcon,
        night: MoonCloudAngledRainIcon,
        color: "#A78BFA",
    },
    1114: {
        day: CloudSnowIcon,
        night: CloudSnowIcon,
        color: "#E0E7FF",
    },
    1117: {
        day: CloudSnowIcon,
        night: CloudSnowIcon,
        color: "#BFDBFE",
    },
    1135: {
        day: CloudFastWindIcon,
        night: MoonSlowWindIcon,
        color: "#9CA3AF",
    },
    1147: {
        day: CloudFastWindIcon,
        night: MoonSlowWindIcon,
        color: "#9CA3AF",
    },
    1150: {
        day: SunCloudLittleRainIcon,
        night: MoonCloudLittleRainIcon,
        color: "#93C5FD",
    },
    1153: {
        day: CloudLittleRainIcon,
        night: CloudLittleRainIcon,
        color: "#60A5FA",
    },
    1168: {
        day: SunCloudLittleRainIcon,
        night: MoonCloudLittleRainIcon,
        color: "#93C5FD",
    },
    1171: {
        day: CloudLittleRainIcon,
        night: CloudLittleRainIcon,
        color: "#60A5FA",
    },
    1180: {
        day: SunCloudLittleRainIcon,
        night: MoonCloudLittleRainIcon,
        color: "#60A5FA",
    },
    1183: {
        day: CloudLittleRainIcon,
        night: CloudLittleRainIcon,
        color: "#60A5FA",
    },
    1186: {
        day: SunCloudMidRainIcon,
        night: MoonCloudMidRainIcon,
        color: "#3B82F6",
    },
    1189: {
        day: CloudMidRainIcon,
        night: CloudMidRainIcon,
        color: "#3B82F6",
    },
    1192: {
        day: SunCloudBigRainIcon,
        night: MoonCloudBigRainIcon,
        color: "#2563EB",
    },
    1195: {
        day: CloudBigRainIcon,
        night: CloudBigRainIcon,
        color: "#2563EB",
    },
    1198: {
        day: SunCloudLittleRainIcon,
        night: MoonCloudLittleRainIcon,
        color: "#93C5FD",
    },
    1201: {
        day: CloudMidRainIcon,
        night: CloudMidRainIcon,
        color: "#60A5FA",
    },
    1204: {
        day: SunCloudLittleSnowIcon,
        night: MoonCloudLittleSnowIcon,
        color: "#E0E7FF",
    },
    1207: {
        day: CloudLittleSnowIcon,
        night: CloudLittleSnowIcon,
        color: "#E0E7FF",
    },
    1210: {
        day: SunCloudLittleSnowIcon,
        night: MoonCloudLittleSnowIcon,
        color: "#E0E7FF",
    },
    1213: {
        day: CloudLittleSnowIcon,
        night: CloudLittleSnowIcon,
        color: "#E0E7FF",
    },
    1216: {
        day: SunCloudMidSnowIcon,
        night: MoonCloudMidSnowIcon,
        color: "#BFDBFE",
    },
    1219: {
        day: CloudMidSnowIcon,
        night: CloudMidSnowIcon,
        color: "#BFDBFE",
    },
    1222: {
        day: SunCloudSnowIcon,
        night: MoonCloudSnowIcon,
        color: "#93C5FD",
    },
    1225: {
        day: CloudSnowIcon,
        night: CloudSnowIcon,
        color: "#93C5FD",
    },
    1237: {
        day: CloudHailstoneIcon,
        night: CloudHailstoneIcon,
        color: "#BFDBFE",
    },
    1240: {
        day: SunCloudLittleRainIcon,
        night: MoonCloudLittleRainIcon,
        color: "#60A5FA",
    },
    1243: {
        day: SunCloudMidRainIcon,
        night: MoonCloudMidRainIcon,
        color: "#3B82F6",
    },
    1246: {
        day: SunCloudBigRainIcon,
        night: MoonCloudBigRainIcon,
        color: "#2563EB",
    },
    1249: {
        day: SunCloudLittleSnowIcon,
        night: MoonCloudLittleSnowIcon,
        color: "#E0E7FF",
    },
    1252: {
        day: SunCloudMidSnowIcon,
        night: MoonCloudMidSnowIcon,
        color: "#BFDBFE",
    },
    1255: {
        day: SunCloudSnowIcon,
        night: MoonCloudSnowIcon,
        color: "#93C5FD",
    },
    1258: {
        day: CloudSnowIcon,
        night: CloudSnowIcon,
        color: "#93C5FD",
    },
    1261: {
        day: CloudHailstoneIcon,
        night: CloudHailstoneIcon,
        color: "#BFDBFE",
    },
    1264: {
        day: CloudHailstoneIcon,
        night: CloudHailstoneIcon,
        color: "#93C5FD",
    },
    1273: {
        day: SunCloudAngledZapIcon,
        night: MoonCloudAngledZapIcon,
        color: "#A78BFA",
    },
    1276: {
        day: CloudAngledRainZapIcon,
        night: CloudAngledRainZapIcon,
        color: "#7C3AED",
    },
    1279: {
        day: SunCloudHailstoneIcon,
        night: MoonCloudHailstoneIcon,
        color: "#BFDBFE",
    },
    1282: {
        day: CloudHailstoneIcon,
        night: CloudHailstoneIcon,
        color: "#93C5FD",
    },
};

const defaultIcon: IconVariant = {
    day: CloudIcon,
    night: CloudIcon,
    color: "#9CA3AF",
};

export function WeatherIcon({
    condition,
    isDay,
    size = "md",
    className,
}: WeatherIconProps) {
    const iconSize = sizeMap[size];
    const iconVariant = weatherIconMap[condition.code] ?? defaultIcon;
    const icon = isDay ? iconVariant.day : iconVariant.night;

    return (
        <HugeiconsIcon
            icon={icon}
            size={iconSize}
            color={iconVariant.color}
            className={className}
        />
    );
}
