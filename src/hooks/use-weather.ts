import useSWR from "swr";
import { fetchAllWeather } from "@/lib/api";
import type { WeatherData } from "@/types/weather";

const SWR_OPTIONS = {
    refreshInterval: 300000,
    revalidateOnFocus: false,
} as const;

export function useWeather() {
    const { data, error, isLoading, mutate } = useSWR<WeatherData[]>(
        "weather-all",
        fetchAllWeather,
        SWR_OPTIONS,
    );

    return {
        weather: data,
        isLoading,
        isError: !!error,
        error,
        mutate,
    };
}
