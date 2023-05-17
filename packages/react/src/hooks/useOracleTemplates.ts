import { useEffect, useState } from "react";
import { Template, Fetcher } from "@carrot-kpi/sdk";
import { usePublicClient, useNetwork } from "wagmi";
import { usePreferDecentralization } from "./usePreferDecentralization";

export function useOracleTemplates(ids?: number[]): {
    loading: boolean;
    templates: Template[];
} {
    const preferDecentralization = usePreferDecentralization();
    const { chain } = useNetwork();
    const publicClient = usePublicClient();

    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const fetchData = async (): Promise<void> => {
            if (!chain) return;
            if (!cancelled) setLoading(true);
            try {
                const templates = await Fetcher.fetchOracleTemplates({
                    publicClient,
                    preferDecentralization,
                    ids,
                });
                if (!cancelled) setTemplates(templates);
            } catch (error) {
                console.error("error fetching oracle templates", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [chain, publicClient, preferDecentralization, ids]);

    return { loading, templates };
}
