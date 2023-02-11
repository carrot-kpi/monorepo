import { useEffect, useState } from "react";
import { Template, Fetcher } from "@carrot-kpi/sdk";
import { useProvider, useNetwork } from "wagmi";
import { BigNumberish } from "@ethersproject/bignumber";
import { usePreferences } from "./usePreferences";

export function useOracleTemplate(id?: BigNumberish): {
    loading: boolean;
    template: Template | null;
} {
    const { preferDecentralization } = usePreferences();
    const { chain } = useNetwork();
    const provider = useProvider();

    const [template, setTemplate] = useState<Template | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const fetchData = async (): Promise<void> => {
            if (!chain || !id) return;
            if (!cancelled) setLoading(true);
            try {
                const templates = await Fetcher.fetchOracleTemplates({
                    provider,
                    preferDecentralization,
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
    }, [chain, provider, preferDecentralization, id]);

    return { loading, template };
}