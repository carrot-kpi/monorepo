import { Fetcher } from "@carrot-kpi/sdk";
import { useProvider, useNetwork } from "wagmi";
import { KPIToken } from "@carrot-kpi/sdk";
import { usePreferences } from "@carrot-kpi/react";
import { useQuery } from "@tanstack/react-query";

export function useLatestKPITokens(limit = 5): {
    isLoading: boolean;
    kpiTokens: KPIToken[];
} {
    const { preferDecentralization } = usePreferences();
    const { chain } = useNetwork();
    const provider = useProvider();

    const fetchKPIData = async () => {
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
    };

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["latestKPITokens", limit, preferDecentralization, chain],
        queryFn: fetchKPIData,
        initialData: [],
    });

    return {
        isLoading: isFetching || isLoading,
        kpiTokens: data,
    };
}
