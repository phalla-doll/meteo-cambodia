import { Readable } from "node:stream";
import { Agent, request } from "undici";

const insecureAgent = new Agent({
    connect: {
        rejectUnauthorized: false,
    },
});

export async function fetchWithTlsBypass(
    url: string,
    options?: {
        method?: string;
        headers?: Record<string, string>;
    },
): Promise<Response> {
    const { statusCode, headers, body } = await request(url, {
        method: options?.method ?? "GET",
        headers: options?.headers,
        dispatcher: insecureAgent,
    });

    const responseHeaders = new Headers();
    for (const [key, value] of Object.entries(headers)) {
        if (value !== undefined) {
            responseHeaders.set(key, String(value));
        }
    }

    const webStream = Readable.toWeb(body) as ReadableStream;

    return new Response(webStream, {
        status: statusCode,
        headers: responseHeaders,
    });
}
