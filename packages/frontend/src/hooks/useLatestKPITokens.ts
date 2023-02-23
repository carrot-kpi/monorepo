import { Fetcher } from "@carrot-kpi/sdk";
import { useProvider, useNetwork } from "wagmi";
import { KPIToken } from "@carrot-kpi/sdk";
import { usePreferDecentralization } from "@carrot-kpi/react";
import { useQuery } from "@tanstack/react-query";

export function useLatestKPITokens(limit = 5): {
    loading: boolean;
    kpiTokens: KPIToken[];
} {
    const preferDecentralization = usePreferDecentralization();
    const { chain } = useNetwork();
    const provider = useProvider();

    const { data: kpiTokens, isLoading: loading } = useQuery({
        queryKey: ["latestKPITokens", { limit, chain }],
        queryFn: async () => {
            if (!chain) return [];

            const kpiTokensAmount = await Fetcher.fetchKPITokensAmount({
                provider,
                preferDecentralization,
            });
            const fromIndex = Math.max(kpiTokensAmount - limit, 0);
            const kpiTokenAddresses = await Fetcher.fetchKPITokenAddresses({
                provider,
                preferDecentralization,
                fromIndex,
                toIndex: kpiTokensAmount,
            });
            const kpiTokens = await Fetcher.fetchKPITokens({
                provider,
                preferDecentralization,
                addresses: kpiTokenAddresses,
            });

            return Object.values(kpiTokens).reverse();
        },
    });

    return { loading: loading, kpiTokens: kpiTokens || [] };
}
