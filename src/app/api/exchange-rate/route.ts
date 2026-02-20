import { NextResponse } from "next/server";
import type { ExchangeRateResponse } from "@/types/exchange-rate";
import { SUPPORTED_CURRENCIES } from "@/types/exchange-rate";

const BASE_URL = "https://data.mef.gov.kh/api/v1/realtime-api/exchange-rate";

export async function GET() {
    const results = await Promise.all(
        SUPPORTED_CURRENCIES.map(async (currency) => {
            try {
                const response = await fetch(
                    `${BASE_URL}?currency_id=${currency}`,
                    {
                        headers: {
                            Accept: "application/json",
                            "User-Agent":
                                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
                        },
                    },
                );
                if (!response.ok) return null;
                const data: ExchangeRateResponse = await response.json();
                return data.data;
            } catch {
                return null;
            }
        }),
    );

    const rates = results.filter(Boolean);

    return NextResponse.json({ data: rates });
}
