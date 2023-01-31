import { useEffect, useState } from "react";
import { Fetcher } from "@carrot-kpi/sdk";
import { useBlockNumber, useProvider } from "wagmi";

export function useWatchOracleData(oracleAddress?: string): {
    loading: boolean;
    data: string;
} {
    const { data: blockNumber } = useBlockNumber({
        watch: true,
    });
    const provider = useProvider();

    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!oracleAddress) return;
            if (!cancelled) setLoading(true);
            try {
                const data = await Fetcher.fetchKPITokenData(
                    provider,
                    oracleAddress
                );
                if (!data) return;
                if (!cancelled) setData(data);
            } catch (error) {
                console.error(
                    `error fetching kpi token at address ${oracleAddress}`,
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
    }, [oracleAddress, provider, blockNumber]);

    return { loading, data };
}
