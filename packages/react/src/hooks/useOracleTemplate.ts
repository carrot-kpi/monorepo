import { useEffect, useState } from "react";
import { Template, Fetcher } from "@carrot-kpi/sdk";
import { usePublicClient, useAccount } from "wagmi";
import { usePreferDecentralization } from "./usePreferDecentralization";

interface OracleTemplateParams {
    id?: number;
}

export function useOracleTemplate(params?: OracleTemplateParams): {
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
        const fetchData = async (): Promise<void> => {
            if (!chain || !publicClient || !params?.id) return;
            if (!cancelled) setLoading(true);
            try {
                const templates = await Fetcher.fetchOracleTemplates({
                    publicClient,
                    preferDecentralization,
                    ids: [params.id],
                });
                if (!cancelled) setTemplate(templates[0] || null);
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
    }, [chain, publicClient, preferDecentralization, params?.id]);

    return { loading, template };
}
