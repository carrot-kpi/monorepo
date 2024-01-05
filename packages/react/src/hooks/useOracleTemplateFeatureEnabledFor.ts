import { type Address } from "wagmi";
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
    allowed: boolean;
} {
    return useTemplateFeatureEnabledFor({
        ...params,
        type: "oracle",
    });
}
