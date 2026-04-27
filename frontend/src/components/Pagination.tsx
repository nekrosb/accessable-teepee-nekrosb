import { Button } from "./Button";
import type { Pagination } from "../types/entries";

type props = {
    pages: Pagination;
    onPageChange: (newPage: number) => void;
};

export function Pagination({ pages, onPageChange }: props) {
    return (
        <div className="pagination">
            <Button
                text="Back"
                onClick={pages.hasPrevPage ? () => onPageChange(pages.page - 1) : () => {}}
                classBtn={pages.hasPrevPage ? "page-arrow" : "page-arrow disabled"}
            />
            {Array.from({ length: pages.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                    key={pageNum}
                    onClick={pageNum !== pages.page ? () => onPageChange(pageNum) : () => {}}
                    classBtn={pageNum === pages.page ? "num-page active" : "num-page"}
                    text={String(pageNum)}
                />
            ))}
            <Button
                text="Forward"
                onClick={pages.hasNextPage ? () => onPageChange(pages.page + 1) : () => {}}
                classBtn={pages.hasNextPage ? "page-arrow" : "page-arrow disabled"}
            />
        </div>
    );
}