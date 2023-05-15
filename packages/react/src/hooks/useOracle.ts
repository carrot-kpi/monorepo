import { useEffect, useState } from "react";
import { Fetcher, Oracle } from "@carrot-kpi/sdk";
import { usePublicClient, useNetwork, Address } from "wagmi";
import { usePreferDecentralization } from "./usePreferDecentralization";

export function useOracle(oracleAddress?: Address): {
    loading: boolean;
    oracle: Oracle | null;
} {
    const preferDecentralization = usePreferDecentralization();
    const { chain } = useNetwork();
    const publicClient = usePublicClient();

    const [oracle, setOracle] = useState<Oracle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain || !oracleAddress) return;
            if (!cancelled) setLoading(true);
            try {
                const fetchedOracle = (
                    await Fetcher.fetchOracles({
                        publicClient,
                        preferDecentralization,
                        addresses: [oracleAddress],
                    })
                )[oracleAddress];
                if (!fetchedOracle) return;
                if (!cancelled) setOracle(fetchedOracle);
            } catch (error) {
                console.error(
                    `error fetching oracle at address ${oracleAddress}`,
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
    }, [chain, oracleAddress, preferDecentralization, publicClient]);

    return { loading, oracle };
}
