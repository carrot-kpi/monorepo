import { useEffect, useState } from "react";
import { Template, Fetcher } from "@carrot-kpi/sdk";
import { useProvider, useNetwork } from "wagmi";
import { BigNumberish } from "@ethersproject/bignumber";

export function useKpiTokenTemplates(ids?: BigNumberish[]): {
    loading: boolean;
    templates: Template[];
} {
    const { chain } = useNetwork();
    const provider = useProvider();

    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain) return;
            setLoading(true);
            try {
                const templates = await Fetcher.fetchKpiTokenTemplates(
                    provider,
                    ids
                );
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
    }, [chain, ids, provider]);

    return { loading, templates };
}
