import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Entry, Pagination } from "../types/entries";
import { getEntries } from "../api/entriesApi";
import { Entries } from "../components/Entries";
import { Header } from "../components/Header";
import { Pagination as PaginationComponent } from "../components/Pagination";
import { ClockIn } from "../components/clockIn";


export const Route = createFileRoute("/")({ component: App });

function App() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [pagination, setPagination] = useState<Pagination>();
    const [page, setPage] = useState<number>(1);
    const [screen, setScreen] = useState<"entries" | "createEntry">("entries");

    function handleClockIn() {
        setScreen("createEntry");
    }

    function handleClockOut() {}
    

    useEffect(() => {
        let isMounted = true;

        getEntries(page)
            .then((data) => {
                if (!isMounted) {
                    return;
                }

                setEntries(data.items);
                setPagination(data.pagination);
            })
            .catch((error) => {
                console.error("Failed to fetch entries:", error);
            });

        return () => {
            isMounted = false;
        };
    }, [page]);


    function handlePageChange(newPage: number) {
        if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
            setPage(newPage);
        }
    }


    return (
        <>
            <Header clickClockIn={handleClockIn} clickClockOut={handleClockOut} />

            <div className="main-container">
                {screen === "entries" ? (
                    <>
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

                        {pagination && <PaginationComponent pages={pagination} onPageChange={handlePageChange} />}
                    </>
                ) : (
                    <ClockIn />
                )}


            </div>
        </>
    );
}
