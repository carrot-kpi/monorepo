import { useEffect, useState } from "react";
import { KpiToken, Fetcher } from "@carrot-kpi/sdk";
import { useProvider } from "wagmi";
import { usePreferences } from "./usePreferences";

export function useKpiTokens(): {
    loading: boolean;
    kpiTokens: { [address: string]: KpiToken };
} {
    const { preferDecentralization } = usePreferences();
    const provider = useProvider();

    const [kpiTokens, setKpiTokens] = useState<{ [address: string]: KpiToken }>(
        {}
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!provider) return;
            if (!cancelled) setLoading(true);
            try {
                const kpiTokens = await Fetcher.fetchKpiTokens(
                    provider,
                    preferDecentralization
                );
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
    }, [preferDecentralization, provider]);

    return { loading, kpiTokens };
}
