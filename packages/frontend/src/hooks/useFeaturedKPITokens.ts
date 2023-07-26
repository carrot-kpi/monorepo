import { usePreferDecentralization } from "@carrot-kpi/react";
import { ChainId, Fetcher, KPIToken, enforce } from "@carrot-kpi/sdk";
import { useQuery } from "@tanstack/react-query";
import { useNetwork, usePublicClient, type Address } from "wagmi";
import { FEATURED_BLACKLISTED_KPI_TOKENS_CONFIGURATION_LOCATION } from "../constants";

type FeaturedBlacklistedKPITokens = Record<
    ChainId,
    { featured: Address[]; blacklisted: Address[] }
>;

export const FEATURED_KPI_TOKEN_QUERY_KEY_PREFIX =
    "featuredKPITokens" as string;

export function useFeaturedKPITokens(): {
    loading: boolean;
    kpiTokens: KPIToken[];
} {
    const preferDecentralization = usePreferDecentralization();
    const { chain } = useNetwork();
    const publicClient = usePublicClient();

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

            const kpiTokens = await Fetcher.fetchKPITokens({
                publicClient,
                preferDecentralization,
                addresses:
                    featuredBlacklistedKPITokens[chain.id as ChainId].featured,
            });

            return Object.values(kpiTokens).reverse();
        },
    });

    return { loading: loading, kpiTokens: kpiTokens || [] };
}
