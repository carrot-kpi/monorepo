import { useNetwork } from "wagmi";
import { KPIToken } from "@carrot-kpi/sdk";
import { useQuery } from "@tanstack/react-query";
import { useFetcher } from "@carrot-kpi/react";

export const LATEST_KPI_TOKEN_QUERY_KEY_PREFIX = "latestKPITokens" as string;

export function useLatestKPITokens(limit = 5): {
    loading: boolean;
    kpiTokens: KPIToken[];
} {
    const { chain } = useNetwork();
    const fetcher = useFetcher();

    const { data: kpiTokens, isLoading: loading } = useQuery({
        queryKey: [LATEST_KPI_TOKEN_QUERY_KEY_PREFIX, { limit, chain }],
        queryFn: async () => {
            if (!chain) return [];

            const kpiTokensAmount = await fetcher.fetchKPITokensAmount();
            const fromIndex = Math.max(kpiTokensAmount - limit, 0);
            const kpiTokenAddresses = await fetcher.fetchKPITokenAddresses({
                fromIndex,
                toIndex: kpiTokensAmount,
            });
            const kpiTokens = await fetcher.fetchKPITokens({
                addresses: kpiTokenAddresses,
            });

            return Object.values(kpiTokens).reverse();
        },
    });

    return { loading: loading, kpiTokens: kpiTokens || [] };
}
