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
            console.error("[createProject] HTTP error", {
                url,
                status: response.status,
                statusText: response.statusText,
                project,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Project;
        try {
            data = (await response.json()) as Project;
        } catch (parseError) {
            console.error("[createProject] Failed to parse JSON response", {
                url,
                project,
                parseError,
            });
            throw parseError;
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[createProject] Network or CORS error", {
                url,
                project,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[createProject] Request failed", {
                url,
                project,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[createProject] Unknown error", {
                url,
                project,
                error,
            });
        }
        throw error;
    }
}

export async function deleteProject(projectId: number): Promise<void> {
    try {
        const response = await fetch(`${url}/${projectId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.error("[deleteProject] HTTP error", {
                url: `${url}/${projectId}`,
                status: response.status,
                statusText: response.statusText,
                projectId,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[deleteProject] Network or CORS error", {
                url: `${url}/${projectId}`,
                projectId,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[deleteProject] Request failed", {
                url: `${url}/${projectId}`,
                projectId,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[deleteProject] Unknown error", {
                url: `${url}/${projectId}`,
                projectId,
                error,
            });
        }
        throw error;
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
            console.error("[updateProject] HTTP error", {
                url: `${url}/${projectId}`,
                status: response.status,
                statusText: response.statusText,
                projectId,
                updatedFields,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Project;
        try {
            data = (await response.json()) as Project;
        } catch (parseError) {
            console.error("[updateProject] Failed to parse JSON response", {
                url: `${url}/${projectId}`,
                projectId,
                updatedFields,
                parseError,
            });
            throw parseError;
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[updateProject] Network or CORS error", {
                url: `${url}/${projectId}`,
                projectId,
                updatedFields,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[updateProject] Request failed", {
                url: `${url}/${projectId}`,
                projectId,
                updatedFields,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[updateProject] Unknown error", {
                url: `${url}/${projectId}`,
                projectId,
                updatedFields,
                error,
            });
        }
        throw error;
    }
}

export async function getProjectById(projectId: number): Promise<Project> {
    try {
        const response = await fetch(`${url}/${projectId}`);
        if (!response.ok) {
            console.error("[getProjectById] HTTP error", {
                url: `${url}/${projectId}`,
                status: response.status,
                statusText: response.statusText,
                projectId,
            });
            throw new Error(
                `HTTP error: ${response.status} ${response.statusText}`,
            );
        }

        let data: Project;
        try {
            data = (await response.json()) as Project;
        } catch (parseError) {
            console.error("[getProjectById] Failed to parse JSON response", {
                url: `${url}/${projectId}`,
                projectId,
                parseError,
            });
            throw parseError;
        }

        return data;
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            console.error("[getProjectById] Network or CORS error", {
                url: `${url}/${projectId}`,
                projectId,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error("[getProjectById] Request failed", {
                url: `${url}/${projectId}`,
                projectId,
                message: error.message,
                stack: error.stack,
            });
        } else {
            console.error("[getProjectById] Unknown error", {
                url: `${url}/${projectId}`,
                projectId,
                error,
            });
        }
        throw error;
    }
}
