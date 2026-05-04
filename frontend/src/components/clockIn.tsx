import { useEffect, useState } from "react";
import type { entriesFormData } from "#/types/entries";
import type {Projects} from "../types/projects";
import type {Tags} from "../types/tags";
import {Input} from "./Input";
import {Button} from "./Button";
import {getProjects} from "../api/projectsApi";
import {getTags} from "../api/tagsApi";
import {createEntry, checkClockInStatus} from "../api/entriesApi";

export function ClockIn() {
    const [projects, setProjects] = useState<Projects[]>([]);
    const [tags, setTags] = useState<Tags[]>([]);
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProjects().then(data => setProjects(data));
        getTags().then(data => setTags(data));
        checkClockInStatus().then(data => setIsClockedIn(data));
    }, []); 

    async function handleClockIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const description = formData.get("description") as string;
        const projectId = formData.get("project") as string;
        const tagsIds = formData.getAll("tags").map((id) => Number(id));

        if (!projectId) {
            setError("Project is required");
            setLoading(false);
            return;
        }

        const entryData: entriesFormData = {
            description: description || "",
            project: Number(projectId),
            tags: tagsIds,
        };

        try {
            await createEntry(entryData);
            setIsClockedIn(true);
        } catch (err) {
            console.error("Failed to create entry:", err);
            setError("Failed to clock in");
        } finally {
            setLoading(false);
        }
    }  

    return (
        <div>
            <form onSubmit={handleClockIn}>
                <h2>Clock In</h2>
                {error && <p style={{color: "red"}}>{error}</p>}
                <Input type="text" name="description" inputClass="input" label="Description" placeholder="Description" />
                <select name="project">
                    <option value="">Select a project</option>
                    {projects.length > 0 && (projects.map(pr => {
                        return (
                            <option key={pr.id} value={pr.id}>{pr.title}</option>
                        )
                    }))}
                </select>

                <select name="tags" multiple>
                    {tags.length > 0 && (tags.map(tag => {
                        return (
                            <option key={tag.id} value={tag.id}>{tag.title}</option>
                        )
                    }))}
                </select>

                {!isClockedIn ? <Button typeBtn="submit" classBtn="button" text={loading ? "Loading..." : "Clock In"} /> : <p>You are already clocked in</p>}
            </form>
        </div>
    );  
}