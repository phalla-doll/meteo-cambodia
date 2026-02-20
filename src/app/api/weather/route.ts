import { NextResponse } from "next/server";

const BASE_URL = "https://data.mef.gov.kh/api/v1/realtime-api/weather";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const province = searchParams.get("province");

    const url = province
        ? `${BASE_URL}?province=${encodeURIComponent(province)}`
        : BASE_URL;

    const response = await fetch(url, {
        headers: {
            Accept: "application/json",
            "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
    });

    if (!response.ok) {
        return NextResponse.json(
            { error: `Failed to fetch weather data: ${response.statusText}` },
            { status: response.status },
        );
    }

    const data = await response.json();
    return NextResponse.json(data);
}
