import { useEffect, useState } from "react";
import { Template, Fetcher } from "@carrot-kpi/sdk";
import { useProvider, useNetwork } from "wagmi";
import { BigNumberish } from "@ethersproject/bignumber";
import { usePreferDecentralization } from "./usePreferDecentralization";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";

export function useOracleTemplates(ids?: BigNumberish[]): {
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
    }, [chain, provider, preferDecentralization, ids, ipfsGatewayURL]);

    return { loading, templates };
}
