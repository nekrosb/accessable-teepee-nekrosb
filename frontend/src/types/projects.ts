export type Projects = {
    id: number;
    title: string;
    description: string | null;
};

export type CreateProjectRequest = {
    title: string;
    description: string;
};

export type UpdateProjectRequest = {
    title?: string;
    description?: string;
};
