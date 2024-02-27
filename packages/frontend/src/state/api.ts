import {
    Fetcher,
    type FeaturedBlacklistedKPITokens,
    type KPIToken,
    type SupportedChain,
} from "@carrot-kpi/sdk";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccount } from "@wagmi/core";
import type { Address, PublicClient, Transport } from "viem";
import { createCarrotApi } from "./hooks";
import { config } from "../standalone-entrypoint";

export interface FetchFeaturedKPITokensParams {
    publicClient?: PublicClient<Transport, SupportedChain | undefined>;
    preferDecentralization?: boolean;
    featuredAddresses?: Address[];
    blacklistedAddresses?: Address[];
}

export const staticApi = createCarrotApi({
    reducerPath: "staticApi",
    baseQuery: fetchBaseQuery({ baseUrl: "" }),
    endpoints: (builder) => ({
        fetchFeaturedBlacklistedKPITokenAddresses: builder.query<
            FeaturedBlacklistedKPITokens,
            void
        >({
            queryFn: async () => {
                const { chain } = await getAccount(config);
                if (!chain)
                    return {
                        error: {
                            status: 500,
                            data: "no chain available",
                        },
                    };
                const response = await fetch(
                    `${chain.serviceUrls.staticCdn}/featured-blacklisted-kpi-tokens.json`,
                );
                if (!response.ok)
                    return {
                        error: {
                            status: response.status,
                            data: await response.text(),
                        },
                    };
                return {
                    data: (await response.json()) as FeaturedBlacklistedKPITokens,
                };
            },
        }),
        fetchFeaturedKPITokens: builder.query<
            KPIToken[],
            FetchFeaturedKPITokensParams
        >({
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return `${endpointName}(${JSON.stringify({
                    chainId: queryArgs.publicClient?.chain?.id,
                    blacklistedAddresses: queryArgs.blacklistedAddresses,
                    featuredAddresses: queryArgs.featuredAddresses,
                    preferDecentralization: queryArgs.preferDecentralization,
                })})`;
            },
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

export interface FetchLatestKPITokensParams {
    publicClient?: PublicClient<Transport, SupportedChain | undefined>;
    preferDecentralization?: boolean;
    limit?: number;
    blacklistedAddresses?: Address[];
}

export const LATEST_KPI_TOKEN_QUERY_TAG = "LatestKPITokens" as const;

export const applicationApi = createCarrotApi({
    reducerPath: "applicationApi",
    baseQuery: fetchBaseQuery({ baseUrl: "" }),
    tagTypes: [LATEST_KPI_TOKEN_QUERY_TAG],
    endpoints: (builder) => ({
        fetchLatestKPITokens: builder.query<
            KPIToken[],
            FetchLatestKPITokensParams
        >({
            providesTags: [LATEST_KPI_TOKEN_QUERY_TAG],
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return `${endpointName}(${JSON.stringify({
                    chainId: queryArgs.publicClient?.chain?.id,
                    blacklistedAddresses: queryArgs.blacklistedAddresses,
                    limit: queryArgs.limit,
                    preferDecentralization: queryArgs.preferDecentralization,
                })})`;
            },
            queryFn: async ({
                publicClient,
                preferDecentralization,
                limit = 5,
                blacklistedAddresses,
            }) => {
                if (!publicClient || !limit) return { data: [] };

                try {
                    const kpiTokenAddresses =
                        await Fetcher.fetchLatestKPITokenAddresses({
                            publicClient,
                            preferDecentralization,
                            limit,
                        });
                    const kpiTokens = await Fetcher.fetchKPITokens({
                        publicClient,
                        preferDecentralization,
                        blacklisted: blacklistedAddresses,
                        addresses: kpiTokenAddresses,
                    });

                    return { data: Object.values(kpiTokens).reverse() };
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
