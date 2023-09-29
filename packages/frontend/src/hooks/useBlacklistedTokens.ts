import {
    type ChainId,
    type FeaturedBlacklistedKPITokens,
} from "@carrot-kpi/sdk";
import { useQuery } from "@tanstack/react-query";
import type { Address } from "viem";
import { STATIC_CDN_URL } from "../constants";

export const BLACKLISTED_KPI_TOKEN_QUERY_KEY_PREFIX =
    "blacklistedKPITokens" as string;

export const useBlacklistedTokens = (
    chain: ChainId,
): {
    loading: boolean;
    blacklistedKPITokens: Address[];
} => {
    const { data: blacklistedKPITokens, isLoading: loading } = useQuery({
        queryKey: [BLACKLISTED_KPI_TOKEN_QUERY_KEY_PREFIX, { chain }],
        queryFn: async () => {
            const featuredBlacklistedKPITokens = (await (
                await fetch(
                    `${STATIC_CDN_URL}/featured-blacklisted-kpi-tokens.json`,
                )
            ).json()) as FeaturedBlacklistedKPITokens;

            return featuredBlacklistedKPITokens[chain].blacklisted;
        },
    });

    return {
        blacklistedKPITokens: blacklistedKPITokens || [],
        loading,
    };
};
