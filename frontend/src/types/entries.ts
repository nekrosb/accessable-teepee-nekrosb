export type EntryTag = {
    id: number;
    title: string;
    description: string | null;
};

export type Entry = {
    id: number;
    description: string;
    start_time: string;
    finish_time: string | null;
    project_title: string | null;
    tags: EntryTag[];
};

export type Pagination = {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

export type EntriesResponse = {
    items: Entry[];
    pagination: Pagination;
};
