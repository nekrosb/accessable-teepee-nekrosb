import type { Project } from "../types/projects";
import { buildApiUrl } from "./apiBaseUrl";
import { handleApiError } from "../utils/errorHandler";

const url = buildApiUrl("/projects");

export async function getProjects(): Promise<Project[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        try {
            return (await response.json()) as Project[];
        } catch (parseError) {
            throw new Error("Failed to parse JSON response");
        }
    } catch (error: unknown) {
        handleApiError(error, "getProjects", { url });
    }
}

export async function createProject(
    project: Omit<Project, "id">,
): Promise<Project> {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Project;
        try {
            data = (await response.json()) as Project;
        } catch (parseError) {
            throw new Error("Failed to parse JSON response");
        }

        return data;
    } catch (error: unknown) {
        handleApiError(error, "createProject", { url, project });
    }
}

export async function deleteProject(projectId: number): Promise<void> {
    try {
        const response = await fetch(`${url}/${projectId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }
    } catch (error: unknown) {
        handleApiError(error, "deleteProject", { url, projectId });
    }
}

export async function updateProject(
    projectId: number,
    updatedFields: Partial<Omit<Project, "id">>,
): Promise<Project> {
    try {
        const response = await fetch(`${url}/${projectId}`, {
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

        let data: Project;
        try {
            data = (await response.json()) as Project;
        } catch (parseError) {
            throw new Error("Failed to parse JSON response");
        }

        return data;
    } catch (error: unknown) {
        handleApiError(error, "updateProject", {
            url,
            projectId,
            updatedFields,
        });
    }
}

export async function getProjectById(projectId: number): Promise<Project> {
    try {
        const response = await fetch(`${url}/${projectId}`);
        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Project;
        try {
            data = (await response.json()) as Project;
        } catch (parseError) {
            throw new Error("Failed to parse JSON response");
        }

        return data;
    } catch (error: unknown) {
        handleApiError(error, "getProjectById", { url, projectId });
    }
}
