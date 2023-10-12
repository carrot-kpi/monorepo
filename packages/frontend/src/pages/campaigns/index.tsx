import { Typography, type SelectOption } from "@carrot-kpi/ui";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/layout";
import { useResolvedKPITokens } from "@carrot-kpi/react";
import { KPIToken, ResolvedKPIToken } from "@carrot-kpi/sdk";
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
import { SideFilters } from "./side-filters";
import { useDebounce } from "react-use";
import { tokenSpecificationIncludesQuery } from "../../utils/search";
import { Grid } from "./grid";

export const Campaigns = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [, setSearchParams] = useSearchParams();
    const { loading, resolvedKPITokens } = useResolvedKPITokens();

    const [kpiTokens, setKpiTokens] = useState<(KPIToken | ResolvedKPIToken)[]>(
        [],
    );
    const [kpiTokensReady, setKpiTokensReady] = useState(false);

    // filters
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [sort, setSort] = useState<SelectOption<number>>(SORT_OPTIONS[0]);
    const [state, setState] = useState<SelectOption<number>>(STATE_OPTIONS[0]);
    const [templates, setTemplates] = useState<Set<string>>(new Set<string>());
    const [oracles, setOracles] = useState<Set<string>>(new Set<string>());
    const [filtersOpen, setFilterOpen] = useState(false);

    useDebounce(() => setDebouncedSearchQuery(searchQuery), 300, [searchQuery]);

    useEffect(() => {
        const bodyElement = window.document.getElementById("__app_body");
        if (!bodyElement) return;
        bodyElement.scroll({ top: 0, left: 0, behavior: "instant" });
    }, []);

    useEffect(() => {
        if (loading || kpiTokens.length > 0) return;
        setKpiTokens(Object.values(resolvedKPITokens));
        setKpiTokensReady(true);
    }, [resolvedKPITokens, kpiTokens, loading]);

    useEffect(() => {
        const url = new URLSearchParams(location.search);
        setSort(
            getOptionByLabel(
                SORT_OPTIONS,
                url.get("sort") ?? SORT_OPTIONS[0].label,
            ),
        );
        setState(
            getOptionByLabel(
                STATE_OPTIONS,
                url.get("state") ?? STATE_OPTIONS[0].label,
            ),
        );
    }, [location]);

    const sortedAndfilteredKPITokens = useMemo(() => {
        return sortKPITokens(
            filterResolvedKPITokens(kpiTokens, state.value as CampaignState),
            sort.value as CampaignOrder,
        ).filter((kpiToken) =>
            tokenSpecificationIncludesQuery(kpiToken, debouncedSearchQuery),
        );
    }, [kpiTokens, state.value, sort.value, debouncedSearchQuery]);

    const updateURLParams = useCallback(
        (key: string, value: string) => {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set(key, value);
            setSearchParams(searchParams);
        },
        [location.search, setSearchParams],
    );

    const toggleFilters = useCallback(
        () => setFilterOpen(!filtersOpen),
        [filtersOpen],
    );

    const handleSortChange = useCallback(
        (sort: SelectOption<number>) => updateURLParams("sort", sort.label),
        [updateURLParams],
    );

    const handleStateChange = useCallback(
        (state: SelectOption<number>) => updateURLParams("state", state.label),
        [updateURLParams],
    );

    const handleTemplatesUpdate = useCallback(
        (newSelectedTemplates: Set<string>) =>
            setTemplates(new Set(newSelectedTemplates)),
        [],
    );

    const handleOraclesTemplatesUpdate = useCallback(
        (newSelectedOracles: Set<string>) =>
            setOracles(new Set(newSelectedOracles)),
        [],
    );

    return (
        <Layout>
            <div className="relative">
                <div className="relative">
                    <div className="px-6 py-16 md:px-10">
                        <Typography variant="h1">
                            {t("campaign.all")}
                        </Typography>
                    </div>
                    <div id="__campaigns_page">
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
                    </div>
                    <div className="flex">
                        <SideFilters
                            open={filtersOpen}
                            selectedTemplates={templates}
                            setSelectedTemplates={handleTemplatesUpdate}
                            selectedOracles={oracles}
                            setSelectedOracles={handleOraclesTemplatesUpdate}
                            toggleFilters={toggleFilters}
                        />
                        <div className="flex flex-col items-center w-full my-16 sm:mx-3 md:mx-4 lg:mx-5 space-y-12 md:space-y-16">
                            <div className="flex flex-wrap justify-center gap-5 lg:justify-start">
                                <Grid
                                    loading={loading}
                                    kpiTokensReady={kpiTokensReady}
                                    items={sortedAndfilteredKPITokens}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
