import type {
    entriesFormData,
    EntriesResponse,
    isClockedIn,
    UpdateEntryRequest,
    Entry,
} from "../types/entries";
import { buildApiUrl } from "./apiBaseUrl";
import { handleApiError } from "../utils/errorHandler";

const url = buildApiUrl("/entries");

export async function getEntries(page: number): Promise<EntriesResponse> {
    try {
        const response = await fetch(`${url}?page=${page}`);
        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        try {
            return (await response.json()) as EntriesResponse;
        } catch (parseError) {
            throw new Error("Failed to parse JSON response", { cause: parseError });
        }
    } catch (error: unknown) {
        handleApiError(error, "getEntries", { url: `${url}?page=${page}` });
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
        handleApiError(error, "createEntry", { url });
    }
}

export async function updateEntry(
    id: number,
    formData: UpdateEntryRequest,
): Promise<void> {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            console.error("[updateEntry] HTTP error", {
                url: `${url}/${id}`,
                status: response.status,
                statusText: response.statusText,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }
    } catch (error: unknown) {
        handleApiError(error, "updateEntry", { url: `${url}/${id}`, formData });
    }
}

export async function checkClockInStatus(): Promise<boolean> {
    try {
        const response = await fetch(`${url}/active`);
        if (!response.ok) {
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
        handleApiError(error, "checkClockInStatus", { url: `${url}/active` });
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
        handleApiError(error, "clockOut", { url });
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
        handleApiError(error, "deleteEntry", { url });
    }
}

export async function getEntriesById(id: number): Promise<Entry> {
    try {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            console.error("[getEntriesById] HTTP error", {
                url: `${url}/${id}`,
                status: response.status,
                statusText: response.statusText,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Entry;
        try {
            data = (await response.json()) as Entry;
        } catch (parseError) {
            console.error("[getEntriesById] Failed to parse JSON response", {
                url: `${url}/${id}`,
                parseError,
            });
            throw parseError;
        }

        return data;
    } catch (error: unknown) {
        handleApiError(error, "getEntriesById", { url });
    }
}
