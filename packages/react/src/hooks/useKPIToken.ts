import { useEffect, useState } from "react";
import { KPIToken, Fetcher } from "@carrot-kpi/sdk";
import { useProvider, useNetwork } from "wagmi";
import { usePreferences } from "./usePreferences";

export function useKPIToken(kpiTokenAddress?: string): {
    loading: boolean;
    kpiToken: KPIToken | null;
} {
    const { preferDecentralization } = usePreferences();
    const { chain } = useNetwork();
    const provider = useProvider();

    const [kpiToken, setKPIToken] = useState<KPIToken | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain || !kpiTokenAddress) return;
            if (!cancelled) setLoading(true);
            try {
                const kpiToken = (
                    await Fetcher.fetchKPITokens({
                        provider,
                        preferDecentralization,
                        addresses: [kpiTokenAddress],
                    })
                )[kpiTokenAddress];
                if (!kpiToken) return;
                if (!cancelled) setKPIToken(kpiToken);
            } catch (error) {
                console.error(
                    `error fetching kpi token at address ${kpiTokenAddress}`,
                    error
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [chain, kpiTokenAddress, preferDecentralization, provider]);

    return { loading, kpiToken };
}
