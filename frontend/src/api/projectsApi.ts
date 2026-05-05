import type { Project } from "../types/projects";
import { buildApiUrl } from "./apiBaseUrl";

const url = buildApiUrl("/projects");

export async function getProjects(): Promise<Project[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("[getProjects] HTTP error", {
                url,
                status: response.status,
                statusText: response.statusText,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Project[];
        try {
            data = (await response.json()) as Project[];
        } catch (parseError) {
            console.error("[getProjects] Failed to parse JSON response", {
                url,
                parseError,
            });
            throw parseError;
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[getProjects] Network or CORS error", {
                url,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[getProjects] Request failed", {
                url,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[getProjects] Unknown error", {
                url,
                error,
            });
        }
        throw error;
    }
}
