export interface TemperatureColorInfo {
    bg: string;
    border: string;
    text: string;
    textColor: string;
    glow: string;
    dot: string;
    label: string;
}

export const TEMPERATURE_RANGES: TemperatureColorInfo[] = [
    {
        bg: "bg-blue-500",
        border: "border-blue-400",
        text: "text-white",
        textColor: "text-blue-400",
        glow: "shadow-[0_0_12px_rgba(59,130,246,0.5)]",
        dot: "bg-blue-500",
        label: "< 20°C",
    },
    {
        bg: "bg-yellow-400",
        border: "border-yellow-300",
        text: "text-black",
        textColor: "text-yellow-400",
        glow: "shadow-[0_0_12px_rgba(250,204,21,0.5)]",
        dot: "bg-yellow-400",
        label: "20–28°C",
    },
    {
        bg: "bg-orange-500",
        border: "border-orange-400",
        text: "text-white",
        textColor: "text-orange-400",
        glow: "shadow-[0_0_12px_rgba(249,115,22,0.5)]",
        dot: "bg-orange-500",
        label: "28–34°C",
    },
    {
        bg: "bg-red-500",
        border: "border-red-400",
        text: "text-white",
        textColor: "text-red-400",
        glow: "shadow-[0_0_12px_rgba(239,68,68,0.5)]",
        dot: "bg-red-500",
        label: "> 34°C",
    },
];

export function getTemperatureColor(tempC: number): TemperatureColorInfo {
    if (tempC < 20) return TEMPERATURE_RANGES[0];
    if (tempC < 28) return TEMPERATURE_RANGES[1];
    if (tempC < 34) return TEMPERATURE_RANGES[2];
    return TEMPERATURE_RANGES[3];
}
