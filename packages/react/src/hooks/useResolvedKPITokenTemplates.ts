import { useEffect, useState } from "react";
import { Fetcher, ResolvedTemplate } from "@carrot-kpi/sdk";
import { useProvider, useNetwork } from "wagmi";
import { BigNumberish } from "@ethersproject/bignumber";
import { usePreferDecentralization } from "./usePreferDecentralization";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";

export function useResolvedKPITokenTemplates(ids?: BigNumberish[]): {
    loading: boolean;
    resolvedTemplates: ResolvedTemplate[];
} {
    const preferDecentralization = usePreferDecentralization();
    const { chain } = useNetwork();
    const provider = useProvider();
    const ipfsGatewayURL = useIPFSGatewayURL();

    const [resolvedTemplates, setResolvedTemplates] = useState<
        ResolvedTemplate[]
    >([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain) return;
            if (!cancelled) setLoading(true);
            try {
                const templates = await Fetcher.fetchKPITokenTemplates({
                    provider,
                    preferDecentralization,
                    ids,
                });
                const resolved = await Fetcher.resolveTemplates({
                    ipfsGatewayURL,
                    templates,
                });
                if (!cancelled) setResolvedTemplates(resolved);
            } catch (error) {
                console.error("error resolving kpi token templates", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [chain, ids, ipfsGatewayURL, preferDecentralization, provider]);

    return { loading, resolvedTemplates };
}
