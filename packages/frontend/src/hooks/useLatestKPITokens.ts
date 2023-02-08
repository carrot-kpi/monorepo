import { useEffect, useState } from "react";
import { Fetcher } from "@carrot-kpi/sdk";
import { useProvider, useNetwork } from "wagmi";
import { KPIToken } from "@carrot-kpi/sdk";
import { usePreferences } from "@carrot-kpi/react";

export function useLatestKPITokens(limit = 5): {
    loading: boolean;
    kpiTokens: KPIToken[];
} {
    const { preferDecentralization } = usePreferences();
    const { chain } = useNetwork();
    const provider = useProvider();

    const [kpiTokens, setKPITokens] = useState<KPIToken[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain) return;
            if (!cancelled) setLoading(true);
            try {
                const kpiTokensAmount = await Fetcher.fetchKPITokensAmount({
                    provider,
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
                    addresses: kpiTokenAddresses,
                });
                if (!cancelled)
                    setKPITokens(Object.values(kpiTokens).reverse());
            } catch (error) {
                console.error("error fetching kpi token templates", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [chain, limit, preferDecentralization, provider]);

    return { loading, kpiTokens };
}
