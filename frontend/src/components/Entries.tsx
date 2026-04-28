import type { CSSProperties } from "react";
import { Button } from "./Button";
import type { EntryTag } from "../types/entries";

type Props = {
    start_time: string;
    finish_time: string | null;
    description: string;
    project: string;
    tags?: EntryTag[];
    appearOrder?: number;
    onDelete: () => void;
    onEdit: () => void;
};

function formatTime(time: string | null) {
    if (!time) {
        return "In progress";
    }

    return new Date(time).toLocaleTimeString();
}

export function Entries({
    start_time,
    finish_time,
    description,
    project,
    tags = [],
    appearOrder = 0,
    onDelete,
    onEdit,
}: Props) {
    const entryStyle = {
        "--entry-order": appearOrder,
    } as CSSProperties;

    return (
        <div className="entries" style={entryStyle}>
            <h2 className="entries-project">{project}</h2>
            <p className="entries-description">{description}</p>
            <div className="entries-tags">
                {tags.map((tag) => (
                    <span key={tag.id} className="entries-tag">
                        {tag.title}
                    </span>
                ))}
            </div>
            <p className="entries-time">
                {formatTime(start_time)} - {formatTime(finish_time)}
            </p>
            <Button
                text="Edit"
                onClick={onEdit}
                classBtn="edit-btn"
            />
            <Button
                text="Delete"
                onClick={onDelete}
                classBtn="delete-btn"
            />
        </div>
    );
}
