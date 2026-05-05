export type Project = {
    id: number;
    title: string;
    description: string | null;
};

export type Projects = Project;

export type CreateProjectRequest = {
    title: string;
    description: string;
};

export type UpdateProjectRequest = {
    title?: string;
    description?: string;
};
