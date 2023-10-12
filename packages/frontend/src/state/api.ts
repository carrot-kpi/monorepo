import {
    Fetcher,
    type FeaturedBlacklistedKPITokens,
    type KPIToken,
} from "@carrot-kpi/sdk";
import { STATIC_CDN_URL } from "../constants";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Address, PublicClient } from "viem";
import { createCarrotApi } from "./hooks";

export interface FeaturedKPITokensParams {
    publicClient?: PublicClient;
    preferDecentralization?: boolean;
    featuredAddresses?: Address[];
    blacklistedAddresses?: Address[];
}

export const staticApi = createCarrotApi({
    reducerPath: "static",
    baseQuery: fetchBaseQuery({ baseUrl: STATIC_CDN_URL }),
    endpoints: (builder) => ({
        fetchFeaturedBlacklistedKPITokenAddresses: builder.query<
            FeaturedBlacklistedKPITokens,
            void
        >({
            query: () => "featured-blacklisted-kpi-tokens.json",
        }),
        fetchFeaturedKPITokens: builder.query<
            KPIToken[],
            FeaturedKPITokensParams
        >({
            queryFn: async ({
                publicClient,
                preferDecentralization,
                featuredAddresses,
                blacklistedAddresses,
            }) => {
                try {
                    if (
                        !publicClient ||
                        !featuredAddresses ||
                        featuredAddresses.length === 0
                    )
                        return { data: [] };

                    const kpiTokens = await Fetcher.fetchKPITokens({
                        preferDecentralization,
                        publicClient,
                        blacklisted: blacklistedAddresses,
                        addresses: featuredAddresses,
                    });

                    return {
                        data: Object.values(kpiTokens).reverse(),
                    };
                } catch (error) {
                    return {
                        error: {
                            status: 500,
                            data: error,
                        },
                    };
                }
            },
        }),
    }),
});
