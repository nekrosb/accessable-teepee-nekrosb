import type { EntriesResponse } from "../types/entries";

const url = "http://172.16.6.161:3000/entries";

export async function getEntries(): Promise<EntriesResponse> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("[getEntries] HTTP error", {
                url,
                status: response.status,
                statusText: response.statusText,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: EntriesResponse;
        try {
            data = (await response.json()) as EntriesResponse;
        } catch (parseError) {
            console.error("[getEntries] Failed to parse JSON response", {
                url,
                parseError,
            });
            throw parseError;
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[getEntries] Network or CORS error", {
                url,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[getEntries] Request failed", {
                url,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[getEntries] Unknown error", {
                url,
                error,
            });
        }
        throw error;
    }
}
