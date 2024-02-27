import { useEffect, useState } from "react";
import { Template, Fetcher, ResolvedTemplate } from "@carrot-kpi/sdk";
import { useAccount } from "wagmi";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";
import { usePreferDecentralization } from "./usePreferDecentralization";

interface ResolvedTemplateParams {
    template?: Template;
}

export function useResolvedTemplate(params?: ResolvedTemplateParams): {
    loading: boolean;
    resolvedTemplate: ResolvedTemplate | null;
} {
    const { chain } = useAccount();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const preferDecentralization = usePreferDecentralization();

    const [resolvedTemplate, setResolvedTemplate] =
        useState<ResolvedTemplate | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (!chain || !params?.template) return;
            if (!cancelled) setLoading(true);
            try {
                const resolved = await Fetcher.resolveTemplates({
                    ipfsGatewayURL,
                    dataCDNURL: chain.serviceUrls.dataCdn,
                    preferDecentralization,
                    templates: [params.template],
                });
                if (resolved.length !== 1) return;
                if (!cancelled) setResolvedTemplate(resolved[0]);
            } catch (error) {
                console.error(
                    `error resolving template at address ${params.template.address}`,
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
    }, [chain, ipfsGatewayURL, preferDecentralization, params?.template]);

    return { loading, resolvedTemplate };
}
