export interface ExchangeRateData {
    id: number;
    currency_id: string;
    currency: string;
    symbol: string;
    unit: number;
    bid: number;
    ask: number;
    average: number;
    valid_date: string;
    created_at: string;
}

export interface ExchangeRateResponse {
    data: ExchangeRateData;
}

export const SUPPORTED_CURRENCIES = ["USD", "EUR", "THB", "CNY"] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];
