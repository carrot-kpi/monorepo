import { useEffect, useState } from "react";
import { KPIToken, Fetcher } from "@carrot-kpi/sdk";
import { useProvider, useNetwork } from "wagmi";
import { usePreferDecentralization } from "./usePreferDecentralization";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";

export function useKPIToken(kpiTokenAddress?: string): {
    loading: boolean;
    kpiToken: KPIToken | null;
} {
    const preferDecentralization = usePreferDecentralization();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const { chain } = useNetwork();
    const provider = useProvider();
    const [kpiToken, setKPIToken] = useState<KPIToken | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetcher = Fetcher(
            provider,
            ipfsGatewayURL,
            preferDecentralization
        );

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
    }, [
        chain,
        ipfsGatewayURL,
        kpiTokenAddress,
        preferDecentralization,
        provider,
    ]);

    return { loading, kpiToken };
}
