const DEFAULT_API_BASE_URL = "/api";

function normalizeBaseUrl(url: string) {
    return url.replace(/\/$/, "");
}

export function getApiBaseUrl() {
    const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

    if (configuredBaseUrl) {
        return normalizeBaseUrl(configuredBaseUrl);
    }

    return DEFAULT_API_BASE_URL;
}

export function buildApiUrl(path: string) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    return `${getApiBaseUrl()}${normalizedPath}`;
}
