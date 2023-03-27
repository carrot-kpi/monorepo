import { useEffect, useState } from "react";
import { KPIToken, Fetcher, ResolvedKPIToken } from "@carrot-kpi/sdk";
import { useNetwork } from "wagmi";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";

export function useResolvedKPIToken(kpiToken?: KPIToken): {
    loading: boolean;
    resolvedKPIToken: ResolvedKPIToken | null;
} {
    const { chain } = useNetwork();
    const ipfsGatewayURL = useIPFSGatewayURL();

    const [resolvedKPIToken, setResolvedKPIToken] =
        useState<ResolvedKPIToken | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain || !kpiToken) return;
            if (!cancelled) setLoading(true);
            try {
                const resolved = (
                    await Fetcher.resolveKPITokens({
                        ipfsGatewayURL,
                        kpiTokens: [kpiToken],
                    })
                )[kpiToken.address];
                if (!resolved) return;
                if (!cancelled) setResolvedKPIToken(resolved);
            } catch (error) {
                console.error(
                    `error resolving kpi token at address ${kpiToken.address}`,
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
    }, [chain, ipfsGatewayURL, kpiToken]);

    return { loading, resolvedKPIToken };
}
