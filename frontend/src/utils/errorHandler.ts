export function handleApiError(
    error: unknown,
    context: string,
    details?: Record<string, unknown>,
): never {
    if (error instanceof TypeError) {
        console.error(`[${context}] Network or CORS error`, {
            ...details,
            message: error.message,
        });
        throw new Error("Network error. Please check your connection.");
    } else if (error instanceof Error) {
        console.error(`[${context}] Request failed`, {
            ...details,
            message: error.message,
        });
        throw new Error(error.message);
    } else {
        console.error(`[${context}] Unknown error`, { ...details, error });
        throw new Error("An unknown error occurred.");
    }
}
