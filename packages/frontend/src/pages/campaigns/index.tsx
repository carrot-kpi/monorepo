import { usePagination, useResetPageScroll } from "@carrot-kpi/react";
import { type SelectOption, Typography } from "@carrot-kpi/ui";
import { ResolvedKPIToken } from "@carrot-kpi/sdk";
import React, {
    useEffect,
    useCallback,
    useMemo,
    useState,
    type SetStateAction,
    useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/layout";
import { KPITokenCard } from "../../components/ui/kpi-token-card";
import { CampaignsTopNav } from "./top-nav";
import { filterResolvedKPITokens, sortKPITokens } from "../../utils/kpi-tokens";
import { Empty } from "../../components/ui/empty";
import { useDebounce } from "react-use";
import { SideFilters } from "./side-filters";
import {
    ORDERING_OPTIONS,
    STATE_OPTIONS,
    CampaignOrder,
    CampaignState,
    getOptionByLabel,
} from "./select-options";
import { Pagination } from "../../components/pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchResolvedKPITokens } from "../../hooks/useSearchResolvedKPITokens";

export const Campaigns = () => {
    useResetPageScroll();
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    //  fetch KPITokens
    const [results, setResults] = useState<ResolvedKPIToken[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    useDebounce(() => setDebouncedSearchQuery(searchQuery), 300, [searchQuery]);

    // page settings
    const [filtersOpen, setFilterOpen] = useState(false);
    const toggleFilters = useCallback(
        () => setFilterOpen(!filtersOpen),
        [filtersOpen]
    );
    const [ordering, setOrdering] = useState<SelectOption>(ORDERING_OPTIONS[0]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearchParams = useCallback(
        (key: string, value: string) => {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set(key, value);
            navigate(`?${searchParams}`);
        },
        [location.search, navigate]
    );
    const [pageSize, setPageSize] = useState(12);
    const { data, totalPages } = usePagination(results, currentPage, pageSize);

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

    const handleOrderingChange = useCallback(
        (orderingState: SelectOption) =>
            handleSearchParams("ordering", orderingState.label),
        [handleSearchParams]
    );

    const handleStateChange = useCallback(
        (campaignState: SelectOption) =>
            handleSearchParams("state", campaignState.label),
        [handleSearchParams]
    );

    const handlePageChange = useCallback(
        (pageNumber: SetStateAction<number>) =>
            handleSearchParams("page", pageNumber.toString()),
        [handleSearchParams]
    );

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pageParams = searchParams.get("page") ?? "1";
        setCurrentPage(parseInt(pageParams));
        const orderingParams =
            searchParams.get("ordering") ?? ORDERING_OPTIONS[0].label;
        setOrdering(getOptionByLabel(ORDERING_OPTIONS, orderingParams));
        const stateParams = searchParams.get("state") ?? STATE_OPTIONS[0].label;
        setCampaignState(getOptionByLabel(STATE_OPTIONS, stateParams));
    }, [location]);

    // fetch data
    const { loading, kpiTokens: resolvedKPITokens } =
        useSearchResolvedKPITokens(debouncedSearchQuery);

    // filters
    const [campaignState, setCampaignState] = useState<SelectOption>(
        STATE_OPTIONS[0]
    );
    // side filters
    const [selectedTemplates, setSelectedTemplates] = useState<Set<string>>(
        new Set<string>()
    );

    const [selectedOracles, setSelectedOracles] = useState<Set<string>>(
        new Set<string>()
    );
    const handleSelectedTemplatesUpdate = useCallback(
        (newSelectedTemplates: Set<string>) =>
            setSelectedTemplates(new Set(newSelectedTemplates)),
        []
    );
    const handleSelectedOraclesTemplatesUpdate = useCallback(
        (newSelectedOracles: Set<string>) =>
            setSelectedOracles(new Set(newSelectedOracles)),
        []
    );

    // filter results
    const filteredKPITokensByState = useMemo(() => {
        return filterResolvedKPITokens(
            resolvedKPITokens,
            campaignState.value as unknown as CampaignState
        );
    }, [resolvedKPITokens, campaignState]);

    const filteredTokens = useMemo(() => {
        if (selectedTemplates.size === 0 && selectedOracles.size === 0)
            return filteredKPITokensByState;

        return filteredKPITokensByState.filter(
            (token) =>
                selectedTemplates.has(token.template.address) ||
                token.oracles
                    .map((oracle) => oracle.template.address)
                    .some((oracleAddress) => selectedOracles.has(oracleAddress))
        );
    }, [filteredKPITokensByState, selectedTemplates, selectedOracles]);

    // sort results
    const sortedFilteredTokens = useMemo(() => {
        return sortKPITokens(
            filteredTokens,
            ordering.value as unknown as CampaignOrder
        );
    }, [filteredTokens, ordering]);

    useEffect(() => {
        setResults(sortedFilteredTokens);
    }, [sortedFilteredTokens]);

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
                        ordering={ordering}
                        orderingOptions={ORDERING_OPTIONS}
                        onOrderingChange={handleOrderingChange}
                        state={campaignState}
                        stateOptions={STATE_OPTIONS}
                        onStateChange={handleStateChange}
                        onToggleFilters={toggleFilters}
                        filtersOpen={filtersOpen}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className="flex">
                        <SideFilters
                            open={filtersOpen}
                            toggleFilters={toggleFilters}
                            selectedTemplates={selectedTemplates}
                            setSelectedTemplates={handleSelectedTemplatesUpdate}
                            selectedOracles={selectedOracles}
                            setSelectedOracles={
                                handleSelectedOraclesTemplatesUpdate
                            }
                        />
                        <div className="flex flex-col items-center w-full mt-12 mb-32 sm:mx-3 md:mx-4 lg:mx-5">
                            {!loading && data.length === 0 && (
                                <div className="flex justify-center w-full">
                                    <Empty />
                                </div>
                            )}
                            {(loading || data.length > 0) && (
                                <div className="space-y-12 md:space-y-16">
                                    <div className="flex flex-wrap justify-center gap-5 lg:justify-start">
                                        {loading
                                            ? new Array(3)
                                                  .fill(null)
                                                  .map((_, index) => {
                                                      return (
                                                          <KPITokenCard
                                                              key={index}
                                                          />
                                                      );
                                                  })
                                            : data.map((kpiToken) => {
                                                  return (
                                                      <KPITokenCard
                                                          key={kpiToken.address}
                                                          kpiToken={kpiToken}
                                                      />
                                                  );
                                              })}
                                    </div>
                                    {!loading && data.length > 0 && (
                                        <Pagination
                                            setCurrentPage={handlePageChange}
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
