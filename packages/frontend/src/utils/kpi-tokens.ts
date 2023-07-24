import { KPIToken, ResolvedKPIToken } from "@carrot-kpi/sdk";
import {
    CampaignOrder,
    CampaignState,
} from "../pages/campaigns/select-options";

export const filterResolvedKPITokens = (
    tokens: (KPIToken | ResolvedKPIToken)[],
    state: CampaignState,
): (KPIToken | ResolvedKPIToken)[] => {
    const tokenValues = Object.values(tokens);
    if (tokenValues.length === 0) return [];

    if (state === CampaignState.ALL) return tokens;

    return tokenValues.filter((token) => {
        if ("specification" in token === false) return true;

        switch (state) {
            case CampaignState.ACTIVE:
                return !token.expired && !token.finalized;
            case CampaignState.EXPIRED:
                return token.expired;
            case CampaignState.FINALIZED:
                return token.finalized;
            default:
                return true;
        }
    });
};

export const sortKPITokens = (
    tokens: (KPIToken | ResolvedKPIToken)[],
    order: CampaignOrder,
): (KPIToken | ResolvedKPIToken)[] => {
    const tokenValues = Object.values(tokens);
    if (tokenValues.length === 0) return [];

    return tokenValues.sort((a, b) => {
        if ("specification" in a === false) return 0;

        if (order === CampaignOrder.NEWEST)
            return b.creationTimestamp - a.creationTimestamp;

        return a.creationTimestamp - b.creationTimestamp;
    });
};
