import { useEffect, useState } from "react";
import { Template } from "@carrot-kpi/sdk";
import { useNetwork } from "wagmi";
import { BigNumberish } from "@ethersproject/bignumber";
import { useFetcher } from "./useFetcher";

export function useOracleTemplate(id?: BigNumberish): {
    loading: boolean;
    template: Template | null;
} {
    const { chain } = useNetwork();
    const [template, setTemplate] = useState<Template | null>(null);
    const [loading, setLoading] = useState(true);
    const fetcher = useFetcher();

    useEffect(() => {
        let cancelled = false;
        const fetchData = async (): Promise<void> => {
            if (!chain || !id) return;
            if (!cancelled) setLoading(true);
            try {
                const templates = await fetcher.fetchOracleTemplates({
                    ids: [id],
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
    }, [fetcher, chain, id]);

    return { loading, template };
}
