import { useEffect, useState } from "react";
import { Template } from "@carrot-kpi/sdk";
import { useNetwork } from "wagmi";
import { BigNumberish } from "@ethersproject/bignumber";
import { useFetcher } from "./useFetcher";

export function useOracleTemplates(ids?: BigNumberish[]): {
    loading: boolean;
    templates: Template[];
} {
    const { chain } = useNetwork();
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const { fetcher } = useFetcher();

    useEffect(() => {
        let cancelled = false;
        const fetchData = async (): Promise<void> => {
            if (!chain) return;
            if (!cancelled) setLoading(true);
            try {
                const templates = await fetcher.fetchOracleTemplates({
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
    }, [fetcher, chain, ids]);

    return { loading, templates };
}
