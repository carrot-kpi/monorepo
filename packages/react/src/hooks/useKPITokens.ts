import { useEffect, useState } from "react";
import { KPIToken, Fetcher } from "@carrot-kpi/sdk";
import { useProvider } from "wagmi";
import { usePreferDecentralization } from "./usePreferDecentralization";

export function useKPITokens(): {
    loading: boolean;
    kpiTokens: { [address: string]: KPIToken };
} {
    const preferDecentralization = usePreferDecentralization();
    const provider = useProvider();

    const [kpiTokens, setKPITokens] = useState<{ [address: string]: KPIToken }>(
        {}
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!provider) return;
            if (!cancelled) setLoading(true);
            try {
                const kpiTokens = await Fetcher.fetchKPITokens({
                    provider,
                    preferDecentralization,
                });
                if (!cancelled) setKPITokens(kpiTokens);
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
