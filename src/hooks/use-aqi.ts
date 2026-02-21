import useSWR from "swr";
import { createDataFetcher } from "@/lib/api";
import type { AqiData } from "@/types/aqi";

const aqiFetcher = createDataFetcher<AqiData>("data");

export function useAqi(province: string | null) {
    const { data, error, isLoading, mutate } = useSWR<AqiData>(
        province ? `/api/aqi?province=${encodeURIComponent(province)}` : null,
        aqiFetcher,
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
