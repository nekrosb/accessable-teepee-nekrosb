export interface EntryTag {
    id: number;
    title: string;
    description: string | null;
}

export interface Entry {
    id: number;
    description: string;
    project_id?: number | null;
    start_time: string;
    finish_time: string | null;
    project_title: string | null;
    tags: EntryTag[];
}

export interface Pagination {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface EntriesResponse {
    items: Entry[];
    pagination: Pagination;
}
export interface CreateEntryRequest {
    description: string;
    project_id: number;
    tagIds: number[];
}
export type entriesFormData = CreateEntryRequest;
export interface isClockedIn {
    isClockedIn: boolean;
}

export interface UpdateEntryRequest {
    description?: string;
    project_id?: number;
    start_time?: string;
    finish_time?: string;
    tagIds?: number[];
}
