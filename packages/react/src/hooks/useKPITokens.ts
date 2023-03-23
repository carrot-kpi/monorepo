import { useEffect, useState } from "react";
import { KPIToken } from "@carrot-kpi/sdk/lib/entities/kpi-token";
import { Fetcher } from "@carrot-kpi/sdk/lib/fetcher";
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
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!provider) return;
            if (!cancelled) setLoading(true);
            try {
                const kpiTokens = await Fetcher.fetchKPITokens({
                    searchQuery,
                    provider,
                    ipfsGatewayURL,
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
    }, [ipfsGatewayURL, preferDecentralization, provider, searchQuery]);

    return { loading, kpiTokens };
}
