export function isString(
    value: FormDataEntryValue | null | undefined,
): value is string {
    return typeof value === "string";
}

export function parseEntryFormData(formData: FormData) {
    const descriptionValue = formData.get("description");
    const projectValue = formData.get("project");
    const tagsIds = formData
        .getAll("tags")
        .filter(isString)
        .map((id) => Number(id))
        .filter((id) => Number.isFinite(id));

    const description = isString(descriptionValue) ? descriptionValue : "";
    const projectId = isString(projectValue) ? Number(projectValue) : null;

    return {
        description,
        projectId,
        tagIds: tagsIds,
    };
}

export default isString;
