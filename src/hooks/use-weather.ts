import useSWR from "swr";
import { fetchAllWeather } from "@/lib/api";
import type { WeatherData } from "@/types/weather";

export function useWeather() {
    const { data, error, isLoading, mutate } = useSWR<WeatherData[]>(
        "weather-all",
        fetchAllWeather,
        {
            refreshInterval: 300000,
            revalidateOnFocus: false,
        },
    );

    return {
        weather: data,
        isLoading,
        isError: !!error,
        error,
        mutate,
    };
}
