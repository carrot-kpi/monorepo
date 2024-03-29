import { useEffect, useState } from "react";
import { Template, Fetcher } from "@carrot-kpi/sdk";
import { usePublicClient, useAccount } from "wagmi";
import { usePreferDecentralization } from "./usePreferDecentralization";

interface OracleTemplatesParams {
    ids?: number[];
}

export function useOracleTemplates(params?: OracleTemplatesParams): {
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
        const fetchData = async (): Promise<void> => {
            if (!chain || !publicClient) return;
            if (!cancelled) setLoading(true);
            try {
                const templates = await Fetcher.fetchOracleTemplates({
                    publicClient,
                    preferDecentralization,
                    ids: params?.ids,
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
    }, [chain, publicClient, preferDecentralization, params?.ids]);

    return { loading, templates };
}
