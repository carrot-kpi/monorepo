import { useEffect, useState } from "react";
import { Template, Fetcher, ResolvedTemplate } from "@carrot-kpi/sdk";
import { useNetwork } from "wagmi";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";

export function useResolvedTemplate(template?: Template): {
    loading: boolean;
    resolvedTemplate: ResolvedTemplate | null;
} {
    const { chain } = useNetwork();
    const ipfsGatewayURL = useIPFSGatewayURL();

    const [resolvedTemplate, setResolvedTemplate] =
        useState<ResolvedTemplate | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain || !template) return;
            if (!cancelled) setLoading(true);
            try {
                const resolved = await Fetcher.resolveTemplates({
                    ipfsGatewayURL,
                    templates: [template],
                });
                if (resolved.length !== 1) return;
                if (!cancelled) setResolvedTemplate(resolved[0]);
            } catch (error) {
                console.error(
                    `error resolving template at address ${template.address}`,
                    error,
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [chain, ipfsGatewayURL, template]);

    return { loading, resolvedTemplate };
}
