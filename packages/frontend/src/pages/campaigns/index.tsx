import { Typography, type SelectOption } from "@carrot-kpi/ui";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type SetStateAction,
} from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/layout";
import { useKPITokens, usePagination } from "@carrot-kpi/react";
import { KPITokenCard } from "../../components/ui/kpi-token-card";
import { KPIToken, ResolvedKPIToken } from "@carrot-kpi/sdk";
import { Empty } from "../../components/ui/empty";
import { CampaignsTopNav } from "./top-nav";
import {
    CampaignOrder,
    CampaignState,
    SORT_OPTIONS,
    STATE_OPTIONS,
    getOptionByLabel,
} from "./select-options";
import { useLocation, useSearchParams } from "react-router-dom";
import { filterResolvedKPITokens, sortKPITokens } from "../../utils/kpi-tokens";
import { Pagination } from "../../components/pagination";
import { SideFilters } from "./side-filters";
import { useDebounce } from "react-use";
import { tokenSpecificationIncludesQuery } from "../../utils/search";

export type KPITokens = { [address: string]: KPIToken | ResolvedKPIToken };

const placeholder = new Array(8)
    .fill(null)
    .map((_, index) => <KPITokenCard key={index} />);

export const Campaigns = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [, setSearchParams] = useSearchParams();
    const { loading, kpiTokens: response } = useKPITokens();

    const [kpiTokens, setKpiTokens] = useState<(KPIToken | ResolvedKPIToken)[]>(
        []
    );
    const [kpiTokensReady, setKpiTokensReady] = useState(false);

    // filters
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [sort, setSort] = useState<SelectOption<number>>(SORT_OPTIONS[0]);
    const [state, setState] = useState<SelectOption<number>>(STATE_OPTIONS[0]);
    const [templates, setTemplates] = useState<Set<string>>(new Set<string>());
    const [oracles, setOracles] = useState<Set<string>>(new Set<string>());
    const [page, setPage] = useState(1);
    const [filtersOpen, setFilterOpen] = useState(false);

    useDebounce(() => setDebouncedSearchQuery(searchQuery), 300, [searchQuery]);

    useEffect(() => {
        const bodyElement = window.document.getElementById("__app_body");
        if (!bodyElement) return;
        bodyElement.scroll({ top: 0, left: 0, behavior: "instant" });
    }, []);

    useEffect(() => {
        if (loading || kpiTokens.length > 0) return;
        setKpiTokens(Object.values(response));
        setKpiTokensReady(true);
    }, [response, kpiTokens, loading]);

    useEffect(() => {
        const url = new URLSearchParams(location.search);

        setPage(parseInt(url.get("page") ?? "1"));
        setSort(
            getOptionByLabel(
                SORT_OPTIONS,
                url.get("sort") ?? SORT_OPTIONS[0].label
            )
        );
        setState(
            getOptionByLabel(
                STATE_OPTIONS,
                url.get("state") ?? STATE_OPTIONS[0].label
            )
        );
    }, [location]);

    const sortedAndfilteredKPITokens = useMemo(() => {
        return sortKPITokens(
            filterResolvedKPITokens(kpiTokens, state.value as CampaignState),
            sort.value as CampaignOrder
        ).filter((kpiToken) =>
            tokenSpecificationIncludesQuery(kpiToken, debouncedSearchQuery)
        );
    }, [kpiTokens, state.value, sort.value, debouncedSearchQuery]);

    const { data: paginatedTokens, totalPages } = usePagination<
        KPIToken | ResolvedKPIToken
    >(sortedAndfilteredKPITokens, page, 12);

    const handleOnResolvedKPIToken = useCallback(
        (resolved: ResolvedKPIToken) => {
            if (
                (
                    kpiTokens.find(
                        (kpiToken) => kpiToken.address === resolved.address
                    ) as ResolvedKPIToken
                ).specification
            )
                return;

            const updatedKPITokens = kpiTokens.map((kpiToken) => {
                if (kpiToken.address === resolved.address) {
                    return {
                        ...kpiToken,
                        specification: resolved.specification,
                        expired: resolved.expired,
                        oracles: resolved.oracles,
                        template: resolved.template,
                    };
                } else {
                    return kpiToken;
                }
            });
            setKpiTokens(updatedKPITokens);
        },
        [kpiTokens]
    );

    const updateURLParams = useCallback(
        (key: string, value: string) => {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set(key, value);
            setSearchParams(searchParams);
        },
        [location.search, setSearchParams]
    );

    const toggleFilters = useCallback(
        () => setFilterOpen(!filtersOpen),
        [filtersOpen]
    );

    const handleSortChange = useCallback(
        (sort: SelectOption<number>) => updateURLParams("sort", sort.label),
        [updateURLParams]
    );
    const handleStateChange = useCallback(
        (state: SelectOption<number>) => updateURLParams("state", state.label),
        [updateURLParams]
    );
    const handleTemplatesUpdate = useCallback(
        (newSelectedTemplates: Set<string>) =>
            setTemplates(new Set(newSelectedTemplates)),
        []
    );
    const handleOraclesTemplatesUpdate = useCallback(
        (newSelectedOracles: Set<string>) =>
            setOracles(new Set(newSelectedOracles)),
        []
    );
    const handlePageChange = useCallback(
        (page: SetStateAction<number>) => {
            updateURLParams("page", page.toString());
            const bodyElement = window.document.getElementById("__app_body");
            if (!bodyElement) return;
            bodyElement.scroll({ top: 0, left: 0, behavior: "instant" });
        },
        [updateURLParams]
    );

    return (
        <Layout>
            <div className="relative bg-grid-light dark:bg-grid-dark dark:bg-black">
                <div className="relative">
                    <div className="px-6 py-16 md:px-10">
                        <Typography variant="h3">
                            {t("campaign.all")}
                        </Typography>
                    </div>
                    <CampaignsTopNav
                        sortOptions={SORT_OPTIONS}
                        stateOptions={STATE_OPTIONS}
                        state={state}
                        sort={sort}
                        filtersOpen={filtersOpen}
                        setSearchQuery={setSearchQuery}
                        onOrderingChange={handleSortChange}
                        onStateChange={handleStateChange}
                        onToggleFilters={toggleFilters}
                    />
                    <div className="flex">
                        <SideFilters
                            open={filtersOpen}
                            selectedTemplates={templates}
                            setSelectedTemplates={handleTemplatesUpdate}
                            selectedOracles={oracles}
                            setSelectedOracles={handleOraclesTemplatesUpdate}
                            toggleFilters={toggleFilters}
                        />
                        <div className="flex flex-col items-center w-full mt-12 mb-32 sm:mx-3 md:mx-4 lg:mx-5">
                            <div className="space-y-12 md:space-y-16">
                                <div className="flex flex-wrap justify-center gap-5 lg:justify-start">
                                    {loading || !kpiTokensReady ? (
                                        placeholder
                                    ) : paginatedTokens.length > 0 ? (
                                        paginatedTokens.map((kpiToken) => {
                                            return (
                                                <KPITokenCard
                                                    key={kpiToken.address}
                                                    kpiToken={kpiToken}
                                                    onResolved={
                                                        handleOnResolvedKPIToken
                                                    }
                                                />
                                            );
                                        })
                                    ) : (
                                        <Empty />
                                    )}
                                </div>
                                <Pagination
                                    setCurrentPage={handlePageChange}
                                    currentPage={page}
                                    totalPages={totalPages}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
