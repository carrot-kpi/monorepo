import { useEffect, useState } from "react";
import { Template, Fetcher, ResolvedTemplate } from "@carrot-kpi/sdk";
import { useNetwork } from "wagmi";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";

interface ResolvedTemplatesParams {
    templates?: Template[];
}

export function useResolvedTemplates(params?: ResolvedTemplatesParams): {
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
            if (!chain || !params?.templates || params.templates.length === 0)
                return;
            if (!cancelled) setLoading(true);
            try {
                const resolved = await Fetcher.resolveTemplates({
                    ipfsGatewayURL,
                    templates: params.templates,
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
    }, [chain, ipfsGatewayURL, params?.templates]);

    return { loading, resolvedTemplates };
}
