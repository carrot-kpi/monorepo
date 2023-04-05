import React, { Dispatch, SetStateAction } from "react";
import { PaginationBall } from "./pagination-ball";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import { cva } from "class-variance-authority";

const createArrayBetweenRange = (start: number, end: number) =>
    Array.from({ length: end - start }, (_, i) => start + i);

const LOT_OF_PAGES = 5;

const arrowsStyles = cva(["cursor-pointer"], {
    variants: {
        show: {
            false: "invisible",
        },
    },
});

export const Pagination = ({
    totalPages,
    setCurrentPage,
    currentPage,
}: {
    totalPages: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const hasMoreThanOnePage = totalPages > 1;
    const hasALotOfPages = totalPages > LOT_OF_PAGES;
    const isNotFirstPage = currentPage > 1;
    const isNotLastPage = currentPage < totalPages;

    return (
        <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center justify-center">
                <ArrowIcon
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={arrowsStyles({
                        show: isNotFirstPage && hasMoreThanOnePage,
                        className: "rotate-180",
                    })}
                />
            </div>

            {/* first page */}
            {hasMoreThanOnePage && (
                <PaginationBall
                    number={1}
                    currentPage={currentPage}
                    onClick={() => setCurrentPage(1)}
                />
            )}

            {/* middle pages */}
            {hasALotOfPages && (
                <>
                    {/* if first page, show next page */}
                    {isFirstPage && (
                        <PaginationBall
                            number={currentPage + 1}
                            currentPage={currentPage}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        />
                    )}

                    {totalPages / 2 > totalPages / currentPage && (
                        <PaginationBall>...</PaginationBall>
                    )}

                    {isNotFirstPage && isNotLastPage && (
                        <PaginationBall
                            number={currentPage}
                            currentPage={currentPage}
                            onClick={() => setCurrentPage(currentPage)}
                        />
                    )}
                    {totalPages - 1 !== currentPage && isNotLastPage && (
                        <PaginationBall>...</PaginationBall>
                    )}
                    {/* if last page, show before page */}
                    {isLastPage && (
                        <PaginationBall
                            number={currentPage - 1}
                            currentPage={currentPage}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        />
                    )}
                </>
            )}
            {hasMoreThanOnePage &&
                !hasALotOfPages &&
                createArrayBetweenRange(2, totalPages).map((number) => (
                    <PaginationBall
                        key={number}
                        currentPage={currentPage}
                        onClick={() => setCurrentPage(number)}
                        number={number}
                    />
                ))}

            {/* last page */}
            {hasMoreThanOnePage && (
                <PaginationBall
                    currentPage={currentPage}
                    number={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                />
            )}

            <div className="flex items-center justify-center">
                <ArrowIcon
                    className={arrowsStyles({
                        show: isNotLastPage && hasMoreThanOnePage,
                    })}
                    onClick={() => setCurrentPage(currentPage + 1)}
                />
            </div>
        </div>
    );
};
