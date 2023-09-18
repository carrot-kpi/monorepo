import { usePagination } from "@carrot-kpi/react";
import type { KPIToken, ResolvedKPIToken } from "@carrot-kpi/sdk";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { KPITokenCard } from "../../../components/ui/kpi-token-card";
import { Empty } from "../../../components/ui/empty";
import { Pagination } from "../../../components/pagination";

const placeholder = new Array(8)
    .fill(null)
    .map((_, index) => <KPITokenCard key={index} />);

interface GridProps {
    loading?: boolean;
    kpiTokensReady?: boolean;
    items: (KPIToken | ResolvedKPIToken)[];
    onResolved: (resolved: ResolvedKPIToken) => void;
}

export const Grid = ({
    loading,
    kpiTokensReady,
    items,
    onResolved,
}: GridProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    useEffect(() => {
        const pageFromSearch = searchParams.get("page");
        if (!pageFromSearch) return;
        const parsedPage = parseInt(pageFromSearch);
        setPage(!isNaN(parsedPage) ? parsedPage : 1);
    }, [searchParams]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect;
            if (width < 768) setItemsPerPage(4);
            if (width < 1024) setItemsPerPage(6);
            else if (width < 1280) setItemsPerPage(9);
            else setItemsPerPage(12);
        });

        resizeObserver.observe(document.body);
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            resizeObserver.unobserve(document.body);
        };
    });

    const { data: paginatedItems, totalPages } = usePagination({
        data: items,
        currentPage: page,
        totalItems: itemsPerPage,
    });

    const handlePageChange = useCallback(
        (page: number) => {
            setSearchParams((prev) => {
                prev.set("page", page.toString());
                return prev;
            });
            const bodyElement =
                window.document.getElementById("__campaigns_page");
            if (!bodyElement) return;
            bodyElement.scrollIntoView();
        },
        [setSearchParams],
    );

    return (
        <div className="flex flex-col items-center w-full">
            <div className="space-y-12 md:space-y-16">
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                    {loading || !kpiTokensReady ? (
                        placeholder
                    ) : paginatedItems.length > 0 ? (
                        paginatedItems.map(
                            (kpiToken: KPIToken | ResolvedKPIToken) => {
                                return (
                                    <KPITokenCard
                                        key={kpiToken.address}
                                        kpiToken={kpiToken}
                                        onResolved={onResolved}
                                    />
                                );
                            },
                        )
                    ) : (
                        <Empty />
                    )}
                </div>
                <Pagination
                    onCurrentPageChange={handlePageChange}
                    currentPage={page}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
};
