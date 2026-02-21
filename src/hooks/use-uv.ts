import useSWR from "swr";
import type { UvData } from "@/types/uv";

const fetcher = async (url: string): Promise<UvData> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch UV data");
    const data = await response.json();
    return data.data;
};

export function useUv(province: string | null) {
    const { data, error, isLoading, mutate } = useSWR<UvData>(
        province ? `/api/uv?province=${encodeURIComponent(province)}` : null,
        fetcher,
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
