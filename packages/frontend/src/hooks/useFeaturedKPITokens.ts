import { usePreferDecentralization } from "@carrot-kpi/react";
import {
    ChainId,
    Fetcher,
    KPIToken,
    enforce,
    type FeaturedBlacklistedKPITokens,
} from "@carrot-kpi/sdk";
import { useQuery } from "@tanstack/react-query";
import { useNetwork, usePublicClient } from "wagmi";
import { useBlacklistedTokens } from "./useBlacklistedTokens";
import { STATIC_CDN_URL } from "../constants";

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
                    `${STATIC_CDN_URL}/featured-blacklisted-kpi-tokens.json`,
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
