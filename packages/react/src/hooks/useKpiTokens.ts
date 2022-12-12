import { useEffect, useState } from "react";
import { KpiToken, Fetcher } from "@carrot-kpi/sdk";
import { useProvider, useNetwork } from "wagmi";

export function useKpiTokens(): {
    loading: boolean;
    kpiTokens: { [address: string]: KpiToken };
} {
    const { chain } = useNetwork();
    const provider = useProvider();

    const [kpiTokens, setKpiTokens] = useState<{ [address: string]: KpiToken }>(
        {}
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain) return;
            if (!cancelled) setLoading(true);
            try {
                const kpiTokens = await Fetcher.fetchKpiTokens(provider);
                if (!cancelled) setKpiTokens(kpiTokens);
            } catch (error) {
                console.error("error fetching kpi tokens", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [chain, provider]);

    return { loading, kpiTokens };
}
