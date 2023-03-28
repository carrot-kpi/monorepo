import { useEffect, useState } from "react";
import { KPIToken, Fetcher, ResolvedKPIToken } from "@carrot-kpi/sdk";
import { useNetwork } from "wagmi";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";
import { isResolvedKPIToken } from "@carrot-kpi/sdk";

export function useResolvedKPIToken(kpiToken?: KPIToken | ResolvedKPIToken): {
    loading: boolean;
    resolvedKPIToken: ResolvedKPIToken | null;
} {
    const { chain } = useNetwork();
    const ipfsGatewayURL = useIPFSGatewayURL();

    const [resolvedKPIToken, setResolvedKPIToken] =
        useState<ResolvedKPIToken | null>(
            isResolvedKPIToken(kpiToken) ? kpiToken : null
        );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (
                !chain ||
                !kpiToken ||
                resolvedKPIToken ||
                isResolvedKPIToken(kpiToken)
            )
                return;
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
    }, [chain, ipfsGatewayURL, kpiToken, resolvedKPIToken]);

    return { loading, resolvedKPIToken };
}
