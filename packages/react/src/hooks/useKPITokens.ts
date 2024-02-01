import { useEffect, useState } from "react";
import { KPIToken, Fetcher } from "@carrot-kpi/sdk";
import { usePublicClient } from "wagmi";
import { type Address } from "viem";
import { usePreferDecentralization } from "./usePreferDecentralization";

interface KPITokensParams {
    blacklisted?: Address[];
}

export function useKPITokens(params?: KPITokensParams): {
    loading: boolean;
    kpiTokens: { [address: string]: KPIToken };
} {
    const preferDecentralization = usePreferDecentralization();
    const publicClient = usePublicClient();

    const [kpiTokens, setKPITokens] = useState<{ [address: string]: KPIToken }>(
        {},
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!publicClient) return;
            if (!cancelled) setLoading(true);
            try {
                const kpiTokens = await Fetcher.fetchKPITokens({
                    publicClient,
                    preferDecentralization,
                    blacklisted: params?.blacklisted,
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
    }, [preferDecentralization, params?.blacklisted, publicClient]);

    return { loading, kpiTokens };
}
