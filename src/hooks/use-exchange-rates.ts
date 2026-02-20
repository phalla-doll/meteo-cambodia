import useSWR from "swr";
import type { ExchangeRateData } from "@/types/exchange-rate";

const fetcher = async (url: string): Promise<ExchangeRateData[]> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch exchange rates");
    const data = await response.json();
    return data.data;
};

export function useExchangeRates() {
    const { data, error, isLoading, mutate } = useSWR<ExchangeRateData[]>(
        "/api/exchange-rate",
        fetcher,
        {
            refreshInterval: 3600000,
            revalidateOnFocus: false,
        },
    );

    return {
        rates: data,
        isLoading,
        isError: !!error,
        mutate,
    };
}
