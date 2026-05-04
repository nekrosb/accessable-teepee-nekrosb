export type Tags = {
    id: number;
    title: string;
    description: string | null;
};

export type CreateTagRequest = {
    title: string;
    description: string;
};

export type UpdateTagRequest = {
    title?: string;
    description?: string;
};
