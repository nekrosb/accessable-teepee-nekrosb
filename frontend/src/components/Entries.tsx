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
        <div className="task" style={entryStyle}>
            <div className="task__status task__status--completed">✓</div>
            <div className="task__content">
                <div className="task__title">{description || 'No description'}</div>
                <div className="task__meta">
                    <span className="task__project">📁 {project}</span>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                        {formatTime(start_time)} - {formatTime(finish_time)}
                    </span>
                </div>
                {tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                        {tags.map((tag) => (
                            <span key={tag.id} style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '0.25rem 0.75rem',
                                backgroundColor: 'var(--action-primary)',
                                color: 'white',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                            }}>
                                {tag.title}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                <Button
                    text="Edit"
                    onClick={onEdit}
                    classBtn="button--secondary button--sm"
                />
                <Button
                    text="Delete"
                    onClick={onDelete}
                    classBtn="button--danger button--sm"
                />
            </div>
        </div>
    );
}
