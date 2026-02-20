import { NextResponse } from "next/server";
import { fetchWithTlsBypass } from "@/lib/fetch-with-tls";
import type { AqiResponse } from "@/types/aqi";

const BASE_URL = "https://data.mef.gov.kh/api/v1/realtime-api/aqi";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const province = searchParams.get("province");

    if (!province) {
        return NextResponse.json(
            { error: "Province parameter is required" },
            { status: 400 },
        );
    }

    const response = await fetchWithTlsBypass(
        `${BASE_URL}?province=${encodeURIComponent(province)}`,
        {
            headers: {
                Accept: "application/json",
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            },
        },
    );

    if (!response.ok) {
        return NextResponse.json(
            { error: `Failed to fetch AQI data: ${response.statusText}` },
            { status: response.status },
        );
    }

    const data: AqiResponse = await response.json();
    return NextResponse.json(data);
}
