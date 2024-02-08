import { useEffect, useState } from "react";
import { Fetcher, Oracle } from "@carrot-kpi/sdk";
import { usePublicClient, useAccount } from "wagmi";
import { type Address } from "viem";
import { usePreferDecentralization } from "./usePreferDecentralization";

interface OracleParams {
    oracleAddress?: Address;
}

export function useOracle(params?: OracleParams): {
    loading: boolean;
    oracle: Oracle | null;
} {
    const preferDecentralization = usePreferDecentralization();
    const { chain } = useAccount();
    const publicClient = usePublicClient();

    const [oracle, setOracle] = useState<Oracle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain || !publicClient || !params?.oracleAddress) return;
            if (!cancelled) setLoading(true);
            try {
                const fetchedOracle = (
                    await Fetcher.fetchOracles({
                        publicClient,
                        preferDecentralization,
                        addresses: [params.oracleAddress],
                    })
                )[params.oracleAddress];
                if (!fetchedOracle) return;
                if (!cancelled) setOracle(fetchedOracle);
            } catch (error) {
                console.error(
                    `error fetching oracle at address ${params.oracleAddress}`,
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
    }, [chain, params?.oracleAddress, preferDecentralization, publicClient]);

    return { loading, oracle };
}
