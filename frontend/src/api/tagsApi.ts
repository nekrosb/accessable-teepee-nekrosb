import type { Tags } from "../types/tags";
import { buildApiUrl } from "./apiBaseUrl";

const url = buildApiUrl("/tags");

export async function getTags(): Promise<Tags[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("[gettags] HTTP error", {
                url,
                status: response.status,
                statusText: response.statusText,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Tags[];
        try {
            data = (await response.json()) as Tags[];
        } catch (parseError) {
            console.error("[gettags] Failed to parse JSON response", {
                url,
                parseError,
            });
            throw parseError;
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[gettags] Network or CORS error", {
                url,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[gettags] Request failed", {
                url,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[gettags] Unknown error", {
                url,
                error,
            });
        }
        throw error;
    }
}
