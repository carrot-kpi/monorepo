import { useEffect, useState } from "react";
import { KPIToken, Fetcher } from "@carrot-kpi/sdk";
import { usePublicClient, useNetwork, type Address } from "wagmi";
import { usePreferDecentralization } from "./usePreferDecentralization";

interface KPITokenParams {
    kpiTokenAddress?: Address;
    blacklisted?: Address[];
}

export function useKPIToken(params?: KPITokenParams): {
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
            if (
                !chain ||
                !params?.kpiTokenAddress ||
                (!!kpiToken && kpiToken.address === params.kpiTokenAddress)
            )
                return;
            if (!cancelled) setLoading(true);
            try {
                const kpiTokenFetched = (
                    await Fetcher.fetchKPITokens({
                        publicClient,
                        preferDecentralization,
                        blacklisted: params.blacklisted,
                        addresses: [params.kpiTokenAddress],
                    })
                )[params.kpiTokenAddress];

                if (!kpiTokenFetched) return;
                if (!cancelled && !!kpiTokenFetched)
                    setKPIToken(kpiTokenFetched);
            } catch (error) {
                console.error(
                    `error fetching kpi token at address ${params.kpiTokenAddress}`,
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
        kpiToken,
        chain,
        params?.blacklisted,
        params?.kpiTokenAddress,
        preferDecentralization,
        publicClient,
    ]);

    return { loading, kpiToken };
}
