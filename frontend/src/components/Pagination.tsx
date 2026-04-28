import type { ReactNode } from "react";
import { Button } from "./Button";
import type { Pagination } from "../types/entries";

type Props = {
    pages: Pagination;
    onPageChange: (newPage: number) => void;
};

function getVisiblePages(page: number, totalPages: number) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set<number>([1, totalPages, page]);

    if (page > 1) {
        pages.add(page - 1);
    }

    if (page < totalPages) {
        pages.add(page + 1);
    }

    if (page <= 3) {
        pages.add(2);
        pages.add(3);
        pages.add(4);
    }

    if (page >= totalPages - 2) {
        pages.add(totalPages - 1);
        pages.add(totalPages - 2);
        pages.add(totalPages - 3);
    }

    return [...pages]
        .filter((value) => value >= 1 && value <= totalPages)
        .sort((left, right) => left - right);
}

export function Pagination({ pages, onPageChange }: Props) {
    const visiblePages = getVisiblePages(pages.page, pages.totalPages);

    const pageItems = visiblePages.flatMap((pageNum, index) => {
        const previousPage = visiblePages[index - 1];

        const items: ReactNode[] = [];

        if (previousPage && pageNum - previousPage > 1) {
            items.push(
                <span
                    key={`ellipsis-${previousPage}-${pageNum}`}
                    className="pagination-ellipsis"
                >
                    ...
                </span>,
            );
        }

        items.push(
            <Button
                key={pageNum}
                onClick={pageNum !== pages.page ? () => onPageChange(pageNum) : () => {}}
                classBtn={pageNum === pages.page ? "num-page active" : "num-page"}
                text={String(pageNum)}
            />,
        );

        return items;
    });

    return (
        <div className="pagination">
            <Button
                text="Back"
                onClick={pages.hasPrevPage ? () => onPageChange(pages.page - 1) : () => {}}
                classBtn={pages.hasPrevPage ? "page-arrow" : "page-arrow disabled"}
            />
            {pageItems}
            <Button
                text="Forward"
                onClick={pages.hasNextPage ? () => onPageChange(pages.page + 1) : () => {}}
                classBtn={pages.hasNextPage ? "page-arrow" : "page-arrow disabled"}
            />
        </div>
    );
}