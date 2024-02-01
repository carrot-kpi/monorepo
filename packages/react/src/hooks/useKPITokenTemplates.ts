import { useEffect, useState } from "react";
import { Template, Fetcher } from "@carrot-kpi/sdk";
import { usePublicClient, useAccount } from "wagmi";
import { usePreferDecentralization } from "./usePreferDecentralization";

interface KPITokenTemplatesParams {
    ids?: number[];
}

export function useKPITokenTemplates(params?: KPITokenTemplatesParams): {
    loading: boolean;
    templates: Template[];
} {
    const preferDecentralization = usePreferDecentralization();
    const { chain } = useAccount();
    const publicClient = usePublicClient();

    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain || !publicClient) return;
            if (!cancelled) setLoading(true);
            try {
                const templates = await Fetcher.fetchKPITokenTemplates({
                    publicClient,
                    preferDecentralization,
                    ids: params?.ids,
                });
                if (!cancelled) setTemplates(templates);
            } catch (error) {
                console.error("error fetching kpi token templates", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [chain, params?.ids, preferDecentralization, publicClient]);

    return { loading, templates };
}
