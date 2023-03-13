import { useEffect, useState } from "react";
import { KPIToken, Fetcher } from "@carrot-kpi/sdk";
import { useProvider } from "wagmi";
import { usePreferDecentralization } from "./usePreferDecentralization";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";

export function useKPITokens(searchQuery?: string): {
    loading: boolean;
    kpiTokens: { [address: string]: KPIToken };
} {
    const preferDecentralization = usePreferDecentralization();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const provider = useProvider();
    const [kpiTokens, setKPITokens] = useState<{ [address: string]: KPIToken }>(
        {}
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetcher = new Fetcher({
            provider,
            ipfsGatewayURL,
            preferDecentralization,
        });
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
    }, [provider, ipfsGatewayURL, preferDecentralization, searchQuery]);

    return { loading, kpiTokens };
}
