import { useEffect, useState } from "react";
import { Fetcher } from "@carrot-kpi/sdk";
import { useProvider } from "wagmi";

export function useOracleData(oracleAddress?: string): {
    loading: boolean;
    data: string;
} {
    const provider = useProvider();

    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!oracleAddress) return;
            if (!cancelled) setLoading(true);
            try {
                const data = await Fetcher.fetchOracleData(
                    provider,
                    oracleAddress
                );
                if (!data) return;
                if (!cancelled) setData(data);
            } catch (error) {
                console.error(
                    `error fetching oracle data at address ${oracleAddress}`,
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
    }, [oracleAddress, provider]);

    return { loading, data };
}
