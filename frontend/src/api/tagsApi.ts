import type { Tags } from "../types/tags";
import { buildApiUrl } from "./apiBaseUrl";
import { handleApiError } from "../utils/errorHandler";

const url = buildApiUrl("/tags");

export async function getTags(): Promise<Tags[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        try {
            return (await response.json()) as Tags[];
        } catch (parseError) {
            throw new Error("Failed to parse JSON response");
        }
    } catch (error: unknown) {
        handleApiError(error, "getTags", { url });
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
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Tags;
        try {
            data = (await response.json()) as Tags;
        } catch (parseError) {
            throw new Error("Failed to parse JSON response");
        }

        return data;
    } catch (error: unknown) {
        handleApiError(error, "createTag", { url, tag });
    }
}

export async function deleteTag(tagId: number): Promise<void> {
    try {
        const response = await fetch(`${url}/${tagId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }
    } catch (error: unknown) {
        handleApiError(error, "deleteTag", { url: `${url}/${tagId}`, tagId });
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
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Tags;
        try {
            data = (await response.json()) as Tags;
        } catch (parseError) {
            throw new Error("Failed to parse JSON response");
        }

        return data;
    } catch (error: unknown) {
        handleApiError(error, "updateTag", { url: `${url}/${tagId}`, tagId });
    }
}

export async function getTagById(tagId: number): Promise<Tags> {
    try {
        const response = await fetch(`${url}/${tagId}`);
        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Tags;
        try {
            data = (await response.json()) as Tags;
        } catch (parseError) {
            throw new Error("Failed to parse JSON response");
        }

        return data;
    } catch (error: unknown) {
        handleApiError(error, "getTagById", { url: `${url}/${tagId}`, tagId });
    }
}
