import { type Address } from "wagmi";
import { useTemplateFeatureEnabledFor } from "./useTemplateFeatureEnabledFor";

interface KPITokenTemplateFeatureEnabledForParams {
    templateId?: number;
    featureId?: number;
    account?: Address;
}

export function useKPITokenTemplateFeatureEnabledFor(
    params?: KPITokenTemplateFeatureEnabledForParams,
): {
    loading: boolean;
    enabled: boolean;
} {
    return useTemplateFeatureEnabledFor({
        ...params,
        type: "kpiToken",
    });
}
