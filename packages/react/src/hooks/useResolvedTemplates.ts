import { useEffect, useState } from "react";
import {
    Template,
    Fetcher,
    ResolvedTemplate,
    getServiceURL,
    Service,
} from "@carrot-kpi/sdk";
import { useAccount } from "wagmi";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";
import { usePreferDecentralization } from "./usePreferDecentralization";
import { useProdMode } from "./useProdMode";

interface ResolvedTemplatesParams {
    templates?: Template[];
}

export function useResolvedTemplates(params?: ResolvedTemplatesParams): {
    loading: boolean;
    resolvedTemplates: ResolvedTemplate[] | null;
} {
    const { chain } = useAccount();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const preferDecentralization = usePreferDecentralization();
    const prodMode = useProdMode();

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
                    dataCDNURL: getServiceURL(Service.DATA_CDN, prodMode),
                    preferDecentralization,
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
    }, [
        chain,
        ipfsGatewayURL,
        preferDecentralization,
        prodMode,
        params?.templates,
    ]);

    return { loading, resolvedTemplates };
}
