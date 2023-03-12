import { Fetcher } from "@carrot-kpi/sdk";
import { useProvider, useNetwork } from "wagmi";
import { KPIToken } from "@carrot-kpi/sdk";
import {
    usePreferDecentralization,
    useIPFSGatewayURL,
} from "@carrot-kpi/react";
import { useQuery } from "@tanstack/react-query";

export const LATEST_KPI_TOKEN_QUERY_KEY_PREFIX = "latestKPITokens" as string;

export function useLatestKPITokens(limit = 5): {
    loading: boolean;
    kpiTokens: KPIToken[];
} {
    const preferDecentralization = usePreferDecentralization();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const { chain } = useNetwork();
    const provider = useProvider();
    const fetcher = Fetcher(provider);

    const { data: kpiTokens, isLoading: loading } = useQuery({
        queryKey: [LATEST_KPI_TOKEN_QUERY_KEY_PREFIX, { limit, chain }],
        queryFn: async () => {
            if (!chain) return [];

            const kpiTokensAmount = await fetcher.fetchKPITokensAmount({
                preferDecentralization,
            });
            const fromIndex = Math.max(kpiTokensAmount - limit, 0);
            const kpiTokenAddresses = await fetcher.fetchKPITokenAddresses({
                preferDecentralization,
                fromIndex,
                toIndex: kpiTokensAmount,
            });
            const kpiTokens = await fetcher.fetchKPITokens({
                ipfsGatewayURL,
                preferDecentralization,
                addresses: kpiTokenAddresses,
            });

            return Object.values(kpiTokens).reverse();
        },
    });

    return { loading: loading, kpiTokens: kpiTokens || [] };
}
