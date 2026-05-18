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

export async function createTag(tag: Omit<Tags, "id">): Promise<Tags> {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag),
        });

        if (!response.ok) {
            console.error("[createTag] HTTP error", {
                url,
                status: response.status,
                statusText: response.statusText,
                tag,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Tags;
        try {
            data = (await response.json()) as Tags;
        } catch (parseError) {
            console.error("[createTag] Failed to parse JSON response", {
                url,
                tag,
                parseError,
            });
            throw parseError;
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[createTag] Network or CORS error", {
                url,
                tag,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[createTag] Request failed", {
                url,
                tag,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[createTag] Unknown error", {
                url,
                tag,
                error,
            });
        }
        throw error;
    }
}

export async function deleteTag(tagId: number): Promise<void> {
    try {
        const response = await fetch(`${url}/${tagId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.error("[deleteTag] HTTP error", {
                url: `${url}/${tagId}`,
                status: response.status,
                statusText: response.statusText,
                tagId,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[deleteTag] Network or CORS error", {
                url: `${url}/${tagId}`,
                tagId,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[deleteTag] Request failed", {
                url: `${url}/${tagId}`,
                tagId,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[deleteTag] Unknown error", {
                url: `${url}/${tagId}`,
                tagId,
                error,
            });
        }
        throw error;
    }
}

export async function updateTag(
    tagId: number,
    updatedFields: Partial<Omit<Tags, "id">>,
): Promise<Tags> {
    try {
        const response = await fetch(`${url}/${tagId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFields),
        });

        if (!response.ok) {
            console.error("[updateTag] HTTP error", {
                url: `${url}/${tagId}`,
                status: response.status,
                statusText: response.statusText,
                tagId,
                updatedFields,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Tags;
        try {
            data = (await response.json()) as Tags;
        } catch (parseError) {
            console.error("[updateTag] Failed to parse JSON response", {
                url: `${url}/${tagId}`,
                tagId,
                updatedFields,
                parseError,
            });
            throw parseError;
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[updateTag] Network or CORS error", {
                url: `${url}/${tagId}`,
                tagId,
                updatedFields,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[updateTag] Request failed", {
                url: `${url}/${tagId}`,
                tagId,
                updatedFields,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[updateTag] Unknown error", {
                url: `${url}/${tagId}`,
                tagId,
                updatedFields,
                error,
            });
        }
        throw error;
    }
}

export async function getTagById(tagId: number): Promise<Tags> {
    try {
        const response = await fetch(`${url}/${tagId}`);
        if (!response.ok) {
            console.error("[getTagById] HTTP error", {
                url: `${url}/${tagId}`,
                status: response.status,
                statusText: response.statusText,
                tagId,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Tags;
        try {
            data = (await response.json()) as Tags;
        } catch (parseError) {
            console.error("[getTagById] Failed to parse JSON response", {
                url: `${url}/${tagId}`,
                tagId,
                parseError,
            });
            throw parseError;
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[getTagById] Network or CORS error", {
                url: `${url}/${tagId}`,
                tagId,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[getTagById] Request failed", {
                url: `${url}/${tagId}`,
                tagId,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[getTagById] Unknown error", {
                url: `${url}/${tagId}`,
                tagId,
                error,
            });
        }
        throw error;
    }
}
