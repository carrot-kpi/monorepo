import { useEffect, useState } from "react";
import { Template } from "@carrot-kpi/sdk";
import { useNetwork } from "wagmi";
import { BigNumberish } from "@ethersproject/bignumber";
import { useFetcher } from "./useFetcher";

export function useKPITokenTemplate(id?: BigNumberish): {
    loading: boolean;
    template: Template | null;
} {
    const { chain } = useNetwork();
    const { fetcher } = useFetcher();

    const [template, setTemplate] = useState<Template | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain || !id) return;
            if (!cancelled) setLoading(true);
            try {
                const templates = await fetcher.fetchKPITokenTemplates({
                    ids: [id],
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
    }, [chain, id, fetcher]);

    return { loading, template };
}
