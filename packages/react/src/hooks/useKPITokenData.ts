import { useEffect, useState } from "react";
import { Fetcher } from "@carrot-kpi/sdk";
import { useProvider } from "wagmi";

export function useKPITokenData(kpiTokenAddress?: string): {
    loading: boolean;
    data: string;
} {
    const provider = useProvider();

    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!kpiTokenAddress) return;
            if (!cancelled) setLoading(true);
            try {
                const data = await Fetcher.fetchKPITokenData(
                    provider,
                    kpiTokenAddress
                );
                if (!data) return;
                if (!cancelled) setData(data);
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
    }, [kpiTokenAddress, provider]);

    return { loading, data };
}
