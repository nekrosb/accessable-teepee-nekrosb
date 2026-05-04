import type {
    entriesFormData,
    EntriesResponse,
    isClockedIn,
} from "../types/entries";
import { buildApiUrl } from "./apiBaseUrl";

const url = buildApiUrl("/entries");

export async function getEntries(page: number): Promise<EntriesResponse> {
    try {
        const response = await fetch(`${url}?page=${page}`);
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

export async function createEntry(formData: entriesFormData): Promise<void> {
    try {
        const respons = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!respons.ok) {
            console.error("[createEntry] HTTP error", {
                url,
                status: respons.status,
                statusText: respons.statusText,
            });
            throw new Error(
                `HTTP error: ${respons.status} ${respons.statusText}`,
            );
        }
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[createEntry] Network or CORS error", {
                url,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[createEntry] Request failed", {
                url,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[createEntry] Unknown error", {
                url,
                error,
            });
        }
        throw error;
    }
}

export async function checkClockInStatus(): Promise<boolean> {
    try {
        const response = await fetch(`${url}/active`);
        if (!response.ok) {
            console.error("[checkClockInStatus] HTTP error", {
                url: `${url}/active`,
                status: response.status,
                statusText: response.statusText,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: isClockedIn;
        try {
            data = (await response.json()) as isClockedIn;
        } catch (parseError) {
            console.error(
                "[checkClockInStatus] Failed to parse JSON response",
                {
                    url: `${url}/active`,
                    parseError,
                },
            );
            throw parseError;
        }

        return data.isClockedIn;
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[checkClockInStatus] Network or CORS error", {
                url: `${url}/active`,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[checkClockInStatus] Request failed", {
                url: `${url}/active`,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[checkClockInStatus] Unknown error", {
                url: `${url}/active`,
                error,
            });
        }
        throw error;
    }
}
export async function clockOut(): Promise<void> {
    try {
        const response = await fetch(`${url}/clockOut`, {
            method: "PATCH",
        });

        if (!response.ok) {
            console.error("[clockOut] HTTP error", {
                url: `${url}/clockOut`,
                status: response.status,
                statusText: response.statusText,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[clockOut] Network or CORS error", {
                url: `${url}/clockOut`,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[clockOut] Request failed", {
                url: `${url}/clockOut`,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[clockOut] Unknown error", {
                url: `${url}/clockOut`,
                error,
            });
        }
        throw error;
    }
}

export async function deleteEntry(id: number): Promise<void> {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.error("[deleteEntry] HTTP error", {
                url: `${url}/${id}`,
                status: response.status,
                statusText: response.statusText,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[deleteEntry] Network or CORS error", {
                url: `${url}/${id}`,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[deleteEntry] Request failed", {
                url: `${url}/${id}`,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[deleteEntry] Unknown error", {
                url: `${url}/${id}`,
                error,
            });
        }
        throw error;
    }
}
