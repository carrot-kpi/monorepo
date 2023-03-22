import { useKPITokens, usePage, useResetPageScroll } from "@carrot-kpi/react";
import { Button, SelectOption, Typography } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/layout";
import { KPITokenCard } from "../../components/ui/kpi-token-card";
import { CampaignsTopNav } from "./top-nav";
import { TemplatesFilter } from "./filters/templates";
import { filterKPITokens, sortKPITokens } from "../../utils/kpi-tokens";
import { Empty } from "../../components/ui/empty";
import { KPIToken } from "@carrot-kpi/sdk";
import { useSearch } from "../../hooks/useSearch";
import { t } from "i18next";

export enum CampaignOrder {
    NEWEST,
    OLDEST,
}

const ORDERING_OPTIONS = [
    {
        label: t("orderingOptions.newest"),
        value: CampaignOrder.NEWEST,
    },
    {
        label: t("orderingOptions.oldest"),
        value: CampaignOrder.OLDEST,
    },
];

export enum CampaignState {
    ALL,
    ACTIVE,
    EXPIRED,
}

const STATE_OPTIONS = [
    {
        label: "All",
        value: CampaignState.ALL,
    },
    {
        label: "Active",
        value: CampaignState.ACTIVE,
    },
    {
        label: "Expired",
        value: CampaignState.EXPIRED,
    },
];

export const Campaigns = () => {
    useResetPageScroll();
    const { t } = useTranslation();

    //  fetch KPITokens
    const [results, setResults] = useState<KPIToken[]>([]);
    const { searchQuery, setSearchQuery } = useSearch();
    const { loading, kpiTokens } = useKPITokens(searchQuery);

    //  show filters
    const [filtersOpen, setFilterOpen] = useState(false);
    const toggleFilters = () => setFilterOpen(!filtersOpen);

    // page settings
    const [pageSize, setPageSize] = useState(12);
    const [ordering, setOrdering] = useState<SelectOption>(ORDERING_OPTIONS[0]);
    const [campaignState, setCampaignState] = useState<SelectOption>(
        STATE_OPTIONS[0]
    );

    // filter results
    const filteredTokens = useMemo(() => {
        return filterKPITokens(
            Object.values(kpiTokens),
            Number(campaignState.value)
        );
    }, [kpiTokens, campaignState]);
    // sort results
    const sortedFilteredTokens = useMemo(() => {
        return sortKPITokens(filteredTokens, Number(ordering.value));
    }, [filteredTokens, ordering]);

    useEffect(() => {
        setResults(sortedFilteredTokens);
    }, [sortedFilteredTokens]);

    const page = usePage(results, pageSize, 0);

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

    useEffect(() => {
        resizeObserver.current.observe(document.body);
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            resizeObserver.current.unobserve(document.body);
        };
    }, []);

    return (
        <Layout>
            <div className="relative bg-grid-light dark:bg-grid-dark dark:bg-black">
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
                        state={campaignState}
                        stateOptions={STATE_OPTIONS}
                        onStateChange={setCampaignState}
                        onToggleFilters={toggleFilters}
                        filtersOpen={filtersOpen}
                        setSearchQuery={setSearchQuery}
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
                            {!loading && page.length === 0 && (
                                <div className="flex justify-center w-full">
                                    <Empty />
                                </div>
                            )}
                            {(loading || page.length > 0) && (
                                <>
                                    <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
                                        {loading
                                            ? new Array(pageSize)
                                                  .fill(null)
                                                  .map((_, index) => {
                                                      return (
                                                          <KPITokenCard
                                                              key={index}
                                                          />
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
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

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
