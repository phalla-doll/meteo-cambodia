export interface AqiData {
    id: number;
    name: string;
    pm2_5: number;
    pm10: number;
    o3: number;
    co: number;
    no2: number;
    so2: number;
    us_epa_index: number;
    gb_defra_index: number;
    last_updated: string;
    last_updated_epoch: number;
    created_at: string;
}

export interface AqiResponse {
    data: AqiData;
}

export type AqiLevel =
    | "Good"
    | "Moderate"
    | "Unhealthy for Sensitive"
    | "Unhealthy"
    | "Very Unhealthy"
    | "Hazardous";

export interface AqiInfo {
    level: AqiLevel;
    color: string;
    bgColor: string;
    textColor: string;
    description: string;
}

export const AQI_LEVELS: Record<number, AqiInfo> = {
    1: {
        level: "Good",
        color: "bg-green-500",
        bgColor: "bg-green-500/10",
        textColor: "text-green-600 dark:text-green-400",
        description: "Air quality is satisfactory",
    },
    2: {
        level: "Moderate",
        color: "bg-yellow-500",
        bgColor: "bg-yellow-500/10",
        textColor: "text-yellow-600 dark:text-yellow-400",
        description: "Acceptable quality",
    },
    3: {
        level: "Unhealthy for Sensitive",
        color: "bg-orange-500",
        bgColor: "bg-orange-500/10",
        textColor: "text-orange-600 dark:text-orange-400",
        description: "Sensitive groups may experience effects",
    },
    4: {
        level: "Unhealthy",
        color: "bg-red-500",
        bgColor: "bg-red-500/10",
        textColor: "text-red-600 dark:text-red-400",
        description: "Everyone may experience effects",
    },
    5: {
        level: "Very Unhealthy",
        color: "bg-purple-500",
        bgColor: "bg-purple-500/10",
        textColor: "text-purple-600 dark:text-purple-400",
        description: "Health alert: serious effects",
    },
    6: {
        level: "Hazardous",
        color: "bg-rose-900",
        bgColor: "bg-rose-900/10",
        textColor: "text-rose-700 dark:text-rose-300",
        description: "Emergency conditions",
    },
};

export function getAqiInfo(index: number): AqiInfo {
    return AQI_LEVELS[index] ?? AQI_LEVELS[1];
}
