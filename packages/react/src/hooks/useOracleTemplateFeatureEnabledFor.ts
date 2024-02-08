import { type Address } from "viem";
import { useTemplateFeatureEnabledFor } from "./useTemplateFeatureEnabledFor";

interface OracleTemplateFeatureEnabledForParams {
    templateId?: number;
    featureId?: number;
    account?: Address;
}

export function useOracleTemplateFeatureEnabledFor(
    params?: OracleTemplateFeatureEnabledForParams,
): {
    loading: boolean;
    enabled: boolean;
} {
    return useTemplateFeatureEnabledFor({
        ...params,
        type: "oracle",
    });
}
