import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Entry, Pagination } from "../types/entries";
import { getEntries, clockOut, deleteEntry, checkClockInStatus } from "../api/entriesApi";

import { Entries } from "../components/Entries";
import { Header } from "../components/Header";
import { Pagination as PaginationComponent } from "../components/Pagination";
import { ClockIn } from "../components/clockIn";


export const Route = createFileRoute("/")({ component: App });

function App() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [pagination, setPagination] = useState<Pagination>();
    const [page, setPage] = useState<number>(1);
    const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
    const [screen, setScreen] = useState<"entries" | "createEntry">("entries");

    function handleClockIn() {
        setScreen("createEntry");
    }

    async function updatePage(): Promise<void> {
        try {
                        const data = await getEntries(page);
            setEntries(data.items);
            setPagination(data.pagination); 
        } catch (error) {
            console.error("Failed to fetch entries:", error);
        }       
    }

async function handleClockOut(): Promise<void> {
        try {
            await clockOut();            setIsClockedIn(false);
            await updatePage();
        } catch (error) {            
            console.error("Failed to clock out:", error);  
        }
    }

    useEffect(() => {
        // initialize clock-in status once on mount
        checkClockInStatus()
            .then((v) => setIsClockedIn(v))
            .catch(() => {});
    }, []);

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
            <Header isClockedIn={isClockedIn} clickClockIn={handleClockIn} clickClockOut={handleClockOut} />

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
                                onDelete={() => {
                                    deleteEntry(entry.id);
                                    updatePage();
                                }}
                                onEdit={() => {}}
                            />
                        ))}

                        {pagination && <PaginationComponent pages={pagination} onPageChange={handlePageChange} />}
                    </>
                ) : (
                    <ClockIn
                        onCloase={() => setScreen("entries")}
                        onStatusChange={(newStatus: boolean) => {
                            setIsClockedIn(newStatus);
                            
                            getEntries(page)
                                .then((data) => {
                                    setEntries(data.items);
                                    setPagination(data.pagination);
                                })
                                .catch((err) => console.error(err));
                        }}
                        isClockedIn={isClockedIn}
                    />
                )}


            </div>
        </>
    );
}
