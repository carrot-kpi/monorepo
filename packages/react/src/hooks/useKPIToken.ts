import { useEffect, useState } from "react";
import { KPIToken } from "@carrot-kpi/sdk";
import { useNetwork } from "wagmi";
import { useFetcher } from "./useFetcher";

export function useKPIToken(kpiTokenAddress?: string): {
    loading: boolean;
    kpiToken: KPIToken | null;
} {
    const { chain } = useNetwork();
    const [kpiToken, setKPIToken] = useState<KPIToken | null>(null);
    const [loading, setLoading] = useState(true);
    const fetcher = useFetcher();

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain || !kpiTokenAddress) return;
            if (!cancelled) setLoading(true);
            try {
                const kpiToken = (
                    await fetcher.fetchKPITokens({
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
    }, [chain, fetcher, kpiTokenAddress]);

    return { loading, kpiToken };
}
