import useSWR from "swr";
import { createDataFetcher } from "@/lib/api";
import type { ExchangeRateData } from "@/types/exchange-rate";

const exchangeRateFetcher = createDataFetcher<ExchangeRateData[]>("data");

export function useExchangeRates() {
    const { data, error, isLoading, mutate } = useSWR<ExchangeRateData[]>(
        "/api/exchange-rate",
        exchangeRateFetcher,
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
