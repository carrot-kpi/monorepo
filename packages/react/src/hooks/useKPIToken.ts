import { useEffect, useState } from "react";
import { KPIToken, Fetcher } from "@carrot-kpi/sdk";
import { usePublicClient, useNetwork, type Address } from "wagmi";
import { usePreferDecentralization } from "./usePreferDecentralization";

export function useKPIToken(kpiTokenAddress?: Address): {
    loading: boolean;
    kpiToken: KPIToken | null;
} {
    const preferDecentralization = usePreferDecentralization();
    const { chain } = useNetwork();
    const publicClient = usePublicClient();

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
                        publicClient,
                        preferDecentralization,
                        addresses: [kpiTokenAddress],
                    })
                )[kpiTokenAddress];
                if (!kpiToken) return;
                if (!cancelled) setKPIToken(kpiToken);
            } catch (error) {
                console.error(
                    `error fetching kpi token at address ${kpiTokenAddress}`,
                    error,
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [chain, kpiTokenAddress, preferDecentralization, publicClient]);

    return { loading, kpiToken };
}
