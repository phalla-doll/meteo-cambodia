import useSWR from "swr";
import { createDataFetcher } from "@/lib/api";
import type { UvData } from "@/types/uv";

const uvFetcher = createDataFetcher<UvData>("data");

export function useUv(province: string | null) {
    const { data, error, isLoading, mutate } = useSWR<UvData>(
        province ? `/api/uv?province=${encodeURIComponent(province)}` : null,
        uvFetcher,
        {
            refreshInterval: 300000,
            revalidateOnFocus: false,
        },
    );

    return {
        uv: data,
        isLoading,
        isError: !!error,
        mutate,
    };
}
