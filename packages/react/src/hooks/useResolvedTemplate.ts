import { useEffect, useState } from "react";
import {
    Template,
    Fetcher,
    ResolvedTemplate,
    getServiceURL,
    Service,
} from "@carrot-kpi/sdk";
import { useNetwork } from "wagmi";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";
import { useProdMode } from "./useProdMode";
import { usePreferDecentralization } from "./usePreferDecentralization";

interface ResolvedTemplateParams {
    template?: Template;
}

export function useResolvedTemplate(params?: ResolvedTemplateParams): {
    loading: boolean;
    resolvedTemplate: ResolvedTemplate | null;
} {
    const { chain } = useNetwork();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const preferDecentralization = usePreferDecentralization();
    const prodMode = useProdMode();

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
                    dataCDNURL: getServiceURL(Service.DATA_CDN, prodMode),
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
    }, [
        chain,
        ipfsGatewayURL,
        prodMode,
        preferDecentralization,
        params?.template,
    ]);

    return { loading, resolvedTemplate };
}
