export interface UvData {
    id: number;
    name: string;
    uv: number;
    last_updated: string;
    last_updated_epoch: number;
    created_at: string;
}

export interface UvResponse {
    data: UvData;
}

export type UvLevel = "Low" | "Moderate" | "High" | "Very High" | "Extreme";

export interface UvInfo {
    level: UvLevel;
    color: string;
    bgColor: string;
    textColor: string;
    description: string;
}

export const UV_LEVELS: Record<string, UvInfo> = {
    low: {
        level: "Low",
        color: "bg-green-500",
        bgColor: "bg-green-500/10",
        textColor: "text-green-600 dark:text-green-400",
        description: "No protection needed",
    },
    moderate: {
        level: "Moderate",
        color: "bg-yellow-500",
        bgColor: "bg-yellow-500/10",
        textColor: "text-yellow-600 dark:text-yellow-400",
        description: "Seek shade during midday",
    },
    high: {
        level: "High",
        color: "bg-orange-500",
        bgColor: "bg-orange-500/10",
        textColor: "text-orange-600 dark:text-orange-400",
        description: "Reduce time in sun",
    },
    "very high": {
        level: "Very High",
        color: "bg-red-500",
        bgColor: "bg-red-500/10",
        textColor: "text-red-600 dark:text-red-400",
        description: "Avoid sun exposure",
    },
    extreme: {
        level: "Extreme",
        color: "bg-purple-500",
        bgColor: "bg-purple-500/10",
        textColor: "text-purple-600 dark:text-purple-400",
        description: "Stay indoors if possible",
    },
};

export function getUvInfo(uv: number): UvInfo {
    if (uv < 3) return UV_LEVELS.low;
    if (uv < 6) return UV_LEVELS.moderate;
    if (uv < 8) return UV_LEVELS.high;
    if (uv < 11) return UV_LEVELS["very high"];
    return UV_LEVELS.extreme;
}
