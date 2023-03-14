import { useEffect, useState } from "react";
import { Template } from "@carrot-kpi/sdk";
import { useNetwork } from "wagmi";
import { BigNumberish } from "@ethersproject/bignumber";
import { useFetcher } from "./useFetcher";

export function useKPITokenTemplates(ids?: BigNumberish[]): {
    loading: boolean;
    templates: Template[];
} {
    const { chain } = useNetwork();
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const fetcher = useFetcher();

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain) return;
            if (!cancelled) setLoading(true);
            try {
                const templates = await fetcher.fetchKPITokenTemplates({
                    ids,
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
    }, [chain, ids, fetcher]);

    return { loading, templates };
}
