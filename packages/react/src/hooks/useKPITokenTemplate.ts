import { useEffect, useState } from "react";
import { Template, Fetcher } from "@carrot-kpi/sdk";
import { usePublicClient, useAccount } from "wagmi";
import { usePreferDecentralization } from "./usePreferDecentralization";

interface KPITokenTemplateParams {
    id?: number;
}

export function useKPITokenTemplate(params?: KPITokenTemplateParams): {
    loading: boolean;
    template: Template | null;
} {
    const preferDecentralization = usePreferDecentralization();
    const { chain } = useAccount();
    const publicClient = usePublicClient();

    const [template, setTemplate] = useState<Template | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain || !publicClient || !params?.id) return;
            if (!cancelled) setLoading(true);
            try {
                const templates = await Fetcher.fetchKPITokenTemplates({
                    publicClient,
                    preferDecentralization,
                    ids: [params.id],
                });
                if (!cancelled) setTemplate(templates[0] || null);
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
    }, [chain, params?.id, preferDecentralization, publicClient]);

    return { loading, template };
}
