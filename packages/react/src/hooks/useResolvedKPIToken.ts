import { useEffect, useState } from "react";
import { KPIToken, Fetcher, ResolvedKPIToken } from "@carrot-kpi/sdk";
import { useAccount } from "wagmi";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";
import { isResolvedKPIToken } from "@carrot-kpi/sdk";
import { usePreferDecentralization } from "./usePreferDecentralization";

interface ResolvedKPITokenParams {
    kpiToken?: KPIToken | ResolvedKPIToken;
}

export function useResolvedKPIToken(params?: ResolvedKPITokenParams): {
    loading: boolean;
    resolvedKPIToken: ResolvedKPIToken | null;
} {
    const { chain } = useAccount();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const preferDecentralization = usePreferDecentralization();

    const [resolvedKPIToken, setResolvedKPIToken] =
        useState<ResolvedKPIToken | null>(
            params?.kpiToken && isResolvedKPIToken(params?.kpiToken)
                ? params.kpiToken
                : null,
        );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (
                !chain ||
                !params?.kpiToken ||
                resolvedKPIToken ||
                isResolvedKPIToken(params.kpiToken)
            )
                return;
            if (!cancelled) setLoading(true);
            try {
                const resolved = (
                    await Fetcher.resolveKPITokens({
                        ipfsGatewayURL,
                        dataCDNURL: chain.serviceUrls.dataCdn,
                        preferDecentralization,
                        kpiTokens: [params.kpiToken],
                    })
                )[params.kpiToken.address];
                if (!resolved) return;
                if (!cancelled) setResolvedKPIToken(resolved);
            } catch (error) {
                console.error(
                    `error resolving kpi token at address ${params.kpiToken.address}`,
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
    }, [
        chain,
        ipfsGatewayURL,
        params?.kpiToken,
        preferDecentralization,
        resolvedKPIToken,
    ]);

    return { loading, resolvedKPIToken };
}
