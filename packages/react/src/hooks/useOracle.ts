import { useEffect, useState } from "react";
import { Oracle } from "@carrot-kpi/sdk";
import { useNetwork } from "wagmi";
import { useFetcher } from "./useFetcher";

export function useOracle(oracleAddress?: string): {
    loading: boolean;
    oracle: Oracle | null;
} {
    const { chain } = useNetwork();
    const [oracle, setOracle] = useState<Oracle | null>(null);
    const [loading, setLoading] = useState(true);
    const { fetcher } = useFetcher();

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain || !oracleAddress) return;
            if (!cancelled) setLoading(true);
            try {
                const fetchedOracle = (
                    await fetcher.fetchOracles({
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
    }, [chain, oracleAddress, fetcher]);

    return { loading, oracle };
}
