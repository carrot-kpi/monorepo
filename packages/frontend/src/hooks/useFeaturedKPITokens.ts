import { usePreferDecentralization } from "@carrot-kpi/react";
import {
    ChainId,
    Fetcher,
    KPIToken,
    enforce,
    type FeaturedBlacklistedKPITokens,
    FEATURED_BLACKLISTED_KPI_TOKENS_CONFIGURATION_LOCATION,
} from "@carrot-kpi/sdk";
import { useQuery } from "@tanstack/react-query";
import { useNetwork, usePublicClient } from "wagmi";
import { useBlacklistedTokens } from "./useBlacklistedTokens";

export const FEATURED_KPI_TOKEN_QUERY_KEY_PREFIX =
    "featuredKPITokens" as string;

export function useFeaturedKPITokens(): {
    loading: boolean;
    kpiTokens: KPIToken[];
} {
    const preferDecentralization = usePreferDecentralization();
    const { chain } = useNetwork();
    const publicClient = usePublicClient();
    const { blacklistedKPITokens } = useBlacklistedTokens(chain?.id as ChainId);

    const { data: kpiTokens, isLoading: loading } = useQuery({
        queryKey: [FEATURED_KPI_TOKEN_QUERY_KEY_PREFIX, { chain }],
        queryFn: async () => {
            if (!chain) return [];
            enforce(chain.id in ChainId, "unsupported chain");

            const featuredBlacklistedKPITokens = (await (
                await fetch(
                    FEATURED_BLACKLISTED_KPI_TOKENS_CONFIGURATION_LOCATION,
                )
            ).json()) as FeaturedBlacklistedKPITokens;
            const featuredKPITokens =
                featuredBlacklistedKPITokens[chain.id as ChainId].featured;

            if (featuredKPITokens.length === 0) return [];

            const kpiTokens = await Fetcher.fetchKPITokens({
                preferDecentralization,
                publicClient,
                blacklisted: blacklistedKPITokens,
                addresses: featuredKPITokens,
            });

            return Object.values(kpiTokens).reverse();
        },
    });

    return { loading: loading, kpiTokens: kpiTokens || [] };
}
