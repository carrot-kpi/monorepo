import { useEffect, useState } from "react";
import { Template, Fetcher, ResolvedTemplate } from "@carrot-kpi/sdk";
import { useNetwork } from "wagmi";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";

export function useResolvedTemplates(templates?: Template[]): {
    loading: boolean;
    resolvedTemplates: ResolvedTemplate[] | null;
} {
    const { chain } = useNetwork();
    const ipfsGatewayURL = useIPFSGatewayURL();

    const [resolvedTemplates, setResolvedTemplates] = useState<
        ResolvedTemplate[]
    >([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain || !templates || templates.length === 0) return;
            if (!cancelled) setLoading(true);
            try {
                const resolved = await Fetcher.resolveTemplates({
                    ipfsGatewayURL,
                    templates,
                });
                if (resolved.length !== 1) return;
                if (!cancelled) setResolvedTemplates(resolved);
            } catch (error) {
                console.error(`error resolving templates`, error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [chain, ipfsGatewayURL, templates]);

    return { loading, resolvedTemplates };
}
