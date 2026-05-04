import type { Projects } from "../types/projects";
import { buildApiUrl } from "./apiBaseUrl";

const url = buildApiUrl("/projects");

export async function getProjects(): Promise<Projects[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("[getprojects] HTTP error", {
                url,
                status: response.status,
                statusText: response.statusText,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Projects[];
        try {
            data = (await response.json()) as Projects[];
        } catch (parseError) {
            console.error("[getprojects] Failed to parse JSON response", {
                url,
                parseError,
            });
            throw parseError;
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[getprojects] Network or CORS error", {
                url,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[getprojects] Request failed", {
                url,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[getprojects] Unknown error", {
                url,
                error,
            });
        }
        throw error;
    }
}
