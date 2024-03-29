import React from "react";
import { PaginationBall } from "./ball";
import ArrowIcon from "../../icons/arrow";
import { cva } from "class-variance-authority";

const createArrayBetweenRange = (start: number, end: number) =>
    Array.from({ length: end - start }, (_, i) => start + i);

const VISIBLE_PAGES_THRESHOLD = 5;

const arrowsStyles = cva(["cursor-pointer"], {
    variants: {
        show: {
            false: "invisible",
        },
    },
});

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onCurrentPageChange: (page: number) => void;
}

export const Pagination = ({
    totalPages,
    onCurrentPageChange,
    currentPage,
}: PaginationProps) => {
    const firstPage = currentPage === 1;
    const lastPage = currentPage === totalPages;
    const moreThanOnePage = totalPages > 1;
    const hasALotOfPages = totalPages > VISIBLE_PAGES_THRESHOLD;

    return (
        <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center justify-center">
                <ArrowIcon
                    onClick={() => onCurrentPageChange(currentPage - 1)}
                    className={arrowsStyles({
                        show: !firstPage && moreThanOnePage,
                        className: "rotate-180",
                    })}
                />
            </div>

            {/* first page */}
            {moreThanOnePage && (
                <PaginationBall
                    number={1}
                    currentPage={currentPage}
                    onClick={() => onCurrentPageChange(1)}
                />
            )}

            {/* middle pages */}
            {hasALotOfPages && (
                <>
                    {/* if first page, show next page */}
                    {firstPage && (
                        <PaginationBall
                            number={currentPage + 1}
                            currentPage={currentPage}
                            onClick={() => onCurrentPageChange(currentPage + 1)}
                        />
                    )}

                    {totalPages / 2 > totalPages / currentPage && (
                        <PaginationBall>...</PaginationBall>
                    )}

                    {!firstPage && !lastPage && (
                        <PaginationBall
                            number={currentPage}
                            currentPage={currentPage}
                            onClick={() => onCurrentPageChange(currentPage)}
                        />
                    )}
                    {totalPages - 1 !== currentPage && !lastPage && (
                        <PaginationBall>...</PaginationBall>
                    )}
                    {/* if last page, show before page */}
                    {lastPage && (
                        <PaginationBall
                            number={currentPage - 1}
                            currentPage={currentPage}
                            onClick={() => onCurrentPageChange(currentPage - 1)}
                        />
                    )}
                </>
            )}
            {moreThanOnePage &&
                !hasALotOfPages &&
                createArrayBetweenRange(2, totalPages).map((number) => (
                    <PaginationBall
                        key={number}
                        currentPage={currentPage}
                        onClick={() => onCurrentPageChange(number)}
                        number={number}
                    />
                ))}

            {/* last page */}
            {moreThanOnePage && (
                <PaginationBall
                    currentPage={currentPage}
                    number={totalPages}
                    onClick={() => onCurrentPageChange(totalPages)}
                />
            )}

            <div className="flex items-center justify-center">
                <ArrowIcon
                    className={arrowsStyles({
                        show: !lastPage && moreThanOnePage,
                    })}
                    onClick={() => onCurrentPageChange(currentPage + 1)}
                />
            </div>
        </div>
    );
};
