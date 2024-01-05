import { useEffect, useState } from "react";
import { Fetcher } from "@carrot-kpi/sdk";
import { useNetwork, type Address, usePublicClient } from "wagmi";
import { usePreferDecentralization } from "./usePreferDecentralization";

interface TemplateFeatureEnabledForParams {
    type?: "oracle" | "kpiToken";
    templateId?: number;
    featureId?: number;
    account?: Address;
}

export function useTemplateFeatureEnabledFor(
    params?: TemplateFeatureEnabledForParams,
): {
    loading: boolean;
    enabled: boolean;
} {
    const preferDecentralization = usePreferDecentralization();
    const { chain } = useNetwork();
    const publicClient = usePublicClient();

    const [enabled, setEnabled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function fetchData(): Promise<void> {
            if (
                !chain ||
                !params?.templateId ||
                !params?.featureId ||
                !params?.account
            )
                return;
            if (!cancelled) setLoading(true);
            try {
                const allowanceParams = {
                    publicClient,
                    preferDecentralization,
                    templateId: params.templateId,
                    featureId: params.featureId,
                    account: params.account,
                };
                const allowance = await (params.type === "oracle"
                    ? Fetcher.fetchOracleTemplateFeatureEnabledFor(
                          allowanceParams,
                      )
                    : Fetcher.fetchKPITokenTemplateFeatureEnabledFor(
                          allowanceParams,
                      ));
                if (!cancelled) setEnabled(allowance);
            } catch (error) {
                console.error(
                    `error fetching allowance status for feature with id ${params.featureId} for account ${params.account} on template with id ${params.templateId}`,
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
        params?.type,
        params?.templateId,
        params?.account,
        params?.featureId,
        preferDecentralization,
        publicClient,
    ]);

    return { loading, enabled };
}
