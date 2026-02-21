import type {
    AllWeatherResponse,
    WeatherData,
    WeatherResponse,
} from "@/types/weather";

const BASE_URL = "/api/weather";

export async function fetchAllWeather(): Promise<WeatherData[]> {
    const response = await fetch(BASE_URL, {
        next: { revalidate: 300 },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    const data: AllWeatherResponse = await response.json();
    return data.data;
}

export async function fetchProvinceWeather(name: string): Promise<WeatherData> {
    const response = await fetch(
        `${BASE_URL}?province=${encodeURIComponent(name)}`,
        {
            next: { revalidate: 300 },
        },
    );
    if (!response.ok) {
        throw new Error(
            `Failed to fetch weather for ${name}: ${response.statusText}`,
        );
    }
    const data: WeatherResponse = await response.json();
    return data.data;
}

export const provinceCoords: Record<string, [number, number]> = {
    "Phnom Penh": [104.9282, 11.5564],
    "Siem Reap": [103.8566, 13.3634],
    Battambang: [102.9735, 13.1025],
    Sihanoukville: [103.5096, 10.6264],
    "Kampong Cham": [105.4581, 11.9934],
    "Kampong Chhnang": [104.6656, 12.25],
    "Kampong Speu": [104.5167, 11.45],
    "Kampong Thom": [104.9, 12.7167],
    Kampot: [104.1833, 10.6167],
    Kandal: [105.0667, 11.4333],
    Kep: [104.3167, 10.4833],
    "Koh Kong": [103.0, 11.6167],
    Kratie: [106.0167, 12.4833],
    Mondulkiri: [107.1881, 12.4558],
    "Oddar Meanchey": [103.5, 14.1833],
    Pailin: [102.6167, 12.85],
    "Preah Vihear": [104.9805, 13.8073],
    "Prey Veng": [105.3333, 11.4833],
    Pursat: [103.9167, 12.5333],
    Ratanakiri: [106.9833, 13.7333],
    "Stung Treng": [105.9667, 13.5167],
    "Svay Rieng": [105.7994, 11.0879],
    Takeo: [104.7833, 10.9833],
    "Banteay Meanchey": [102.9833, 13.6167],
    "Tboung Khmum": [105.65, 11.9167],
};
