import { useEffect, useState } from "react";
import { KPIToken } from "@carrot-kpi/sdk";
import { useProvider } from "wagmi";
import { useFetcher } from "./useFetcher";

export function useKPITokens(searchQuery?: string): {
    loading: boolean;
    kpiTokens: { [address: string]: KPIToken };
} {
    const provider = useProvider();
    const fetcher = useFetcher();

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
                const kpiTokens = await fetcher.fetchKPITokens({
                    searchQuery,
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
    }, [fetcher, provider, searchQuery]);

    return { loading, kpiTokens };
}
