import { ResolvedKPIToken } from "@carrot-kpi/sdk";
import { CampaignOrder, CampaignState } from "../pages/campaigns";

export const filterKPITokens = (
    tokens: ResolvedKPIToken[],
    state: CampaignState
) => {
    if (tokens.length === 0) return [];

    if (state === CampaignState.ALL) return tokens;

    return tokens.filter((token) => {
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
    tokens: ResolvedKPIToken[],
    order: CampaignOrder
) => {
    if (tokens.length === 0) return [];

    const comparator =
        order === CampaignOrder.NEWEST
            ? (a: ResolvedKPIToken, b: ResolvedKPIToken) =>
                  b.creationTimestamp - a.creationTimestamp
            : (a: ResolvedKPIToken, b: ResolvedKPIToken) =>
                  a.creationTimestamp - b.creationTimestamp;

    return tokens.sort(comparator);
};
