import { useEffect, useState } from "react";
import { Template, Fetcher } from "@carrot-kpi/sdk";
import { useProvider, useNetwork } from "wagmi";
import { BigNumberish } from "@ethersproject/bignumber";
import { usePreferDecentralization } from "./usePreferDecentralization";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";

export function useKPITokenTemplates(ids?: BigNumberish[]): {
    loading: boolean;
    templates: Template[];
} {
    const preferDecentralization = usePreferDecentralization();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const { chain } = useNetwork();
    const provider = useProvider();
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetcher = Fetcher(
            provider,
            ipfsGatewayURL,
            preferDecentralization
        );

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
    }, [chain, ids, ipfsGatewayURL, preferDecentralization, provider]);

    return { loading, templates };
}
