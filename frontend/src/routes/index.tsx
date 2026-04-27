import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Entry } from "../types/entries";
import { getEntries } from "../api/entriesApi";
import { Entries } from "../components/Entries";
import { Header } from "../components/Header";

export const Route = createFileRoute("/")({ component: App });

function App() {
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        getEntries().then((data) => {
            setEntries(data.items);
        });
    }, []);

    return (
        <>
            <Header />

            <div className="main-container">
                {entries.map((entry, index) => (
                    <Entries
                        key={`${entry.id}`}
                        start_time={entry.start_time}
                        finish_time={entry.finish_time}
                        description={entry.description}
                        project={entry.project_title ?? "No Project"}
                    tags={entry.tags}
                        appearOrder={index}
                        onDelete={() => {}}
                        onEdit={() => {}}
                    />
                ))}
            </div>
        </>
    );
}
