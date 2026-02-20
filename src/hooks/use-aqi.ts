import useSWR from "swr";
import type { AqiData } from "@/types/aqi";

const fetcher = async (url: string): Promise<AqiData> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch AQI data");
    const data = await response.json();
    return data.data;
};

export function useAqi(province: string | null) {
    const { data, error, isLoading, mutate } = useSWR<AqiData>(
        province ? `/api/aqi?province=${encodeURIComponent(province)}` : null,
        fetcher,
        {
            refreshInterval: 300000,
            revalidateOnFocus: false,
        },
    );

    return {
        aqi: data,
        isLoading,
        isError: !!error,
        mutate,
    };
}
