import { useKPITokens, usePage } from "@carrot-kpi/react";
import { Button, SelectOption, Typography } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/layout";
import { GridPatternBg } from "../../components/ui/grid-pattern-bg";
import { KPITokenCard } from "../../components/ui/kpi-token-card";
import { CampaignsTopNav } from "./top-nav";
import { TemplatesFilter } from "./filters/templates";
import { filterKPITokens, sortKPITokens } from "../../utils/kpi-tokens";
import { useDebounce } from "react-use";

const campaignsFiltersStyles = cva(
    [
        "absolute lg:relative",
        "shadow md:shadow-none",
        "w-full lg:w-fit",
        "p-12",
        "bg-white",
        "border-r border-gray-400 dark:bg-black",
    ],
    {
        variants: {
            filtersOpen: {
                false: ["hidden"],
            },
        },
    }
);

const PaginationNumber = ({ number }: { number: string | number }) => (
    <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full cursor-pointer hover:bg-green">
        {number}
    </div>
);

const Pagination = () => (
    <div className="flex mt-6 space-x-4">
        <PaginationNumber number={1} />
        <PaginationNumber number={2} />
        <PaginationNumber number={"..."} />
        <PaginationNumber number={12} />
    </div>
);

const ORDERING_OPTIONS = [
    {
        label: "Latest",
        value: 1,
    },
    {
        label: "Newest",
        value: 2,
    },
];

const STATE_OPTIONS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Active",
        value: "active",
    },
    {
        label: "Expired",
        value: "expired",
    },
];

export const Campaigns = () => {
    const { t } = useTranslation();
    const { loading, kpiTokens } = useKPITokens();

    const [pageSize, setPageSize] = useState(12);
    const [filtersOpen, setFilterOpen] = useState(false);
    const [ordering, setOrdering] = useState<SelectOption>(ORDERING_OPTIONS[0]);
    const [state, setState] = useState<SelectOption>(STATE_OPTIONS[0]);
    const [searchQuery] = useState("");
    const [, /* debouncedSearchQuery */ setDebouncedSearchQuery] = useState("");
    const resizeObserver = useRef(
        new ResizeObserver((entries) => {
            const { width } = entries[0].contentRect;
            if (width > 600) setFilterOpen(true);
            else setFilterOpen(false);
            if (width < 768) {
                setPageSize(3);
            } else if (width < 1200) {
                setPageSize(6);
            } else {
                setPageSize(12);
            }
        })
    );

    useDebounce(
        () => {
            setDebouncedSearchQuery(searchQuery);
        },
        300,
        [searchQuery]
    );

    const filteredTokens = useMemo(() => {
        return filterKPITokens(Object.values(kpiTokens), undefined);
    }, [kpiTokens]);
    const sortedFilteredTokens = useMemo(() => {
        return sortKPITokens(filteredTokens);
    }, [filteredTokens]);
    const page = usePage(sortedFilteredTokens, pageSize, 0);

    useEffect(() => {
        resizeObserver.current.observe(document.body);
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            resizeObserver.current.unobserve(document.body);
        };
    }, []);

    const toggleFilters = () => setFilterOpen(!filtersOpen);

    return (
        <Layout>
            <div className="relative dark:bg-black">
                <GridPatternBg fullSize />
                <div className="relative">
                    <div className="px-6 py-16 md:px-10">
                        <Typography variant="h1">
                            {t("campaign.all")}
                        </Typography>
                    </div>
                    <CampaignsTopNav
                        ordering={ordering}
                        orderingOptions={ORDERING_OPTIONS}
                        onOrderingChange={setOrdering}
                        state={state}
                        stateOptions={STATE_OPTIONS}
                        onStateChange={setState}
                        onToggleFilters={toggleFilters}
                        filtersOpen={filtersOpen}
                    />
                    <div className="flex">
                        <div
                            className={campaignsFiltersStyles({ filtersOpen })}
                        >
                            <div className="space-y-6 md:w-64">
                                <TemplatesFilter />
                            </div>
                            <Button
                                className={{
                                    root: "w-full p-1 mt-12 md:hidden",
                                }}
                                onClick={toggleFilters}
                            >
                                Close filters
                            </Button>
                        </div>
                        <div className="flex flex-col items-center w-full mt-12 mb-32 sm:mx-3 md:mx-4 lg:mx-5">
                            <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
                                {loading
                                    ? new Array(pageSize)
                                          .fill(null)
                                          .map((_, index) => {
                                              return (
                                                  <KPITokenCard key={index} />
                                              );
                                          })
                                    : page.map((kpiToken) => {
                                          return (
                                              <KPITokenCard
                                                  key={kpiToken.address}
                                                  kpiToken={kpiToken}
                                              />
                                          );
                                      })}
                            </div>
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
