import { KPIToken } from "@carrot-kpi/sdk";
import { CampaignOrder, CampaignState } from "../pages/campaigns";

export const filterStateKPITokens = (
    tokens: KPIToken[],
    state: CampaignState
) => {
    if (tokens.length === 0) return [];

    if (state === CampaignState.ALL) return tokens;

    return tokens.filter((token) => {
        return state === CampaignState.ACTIVE ? !token.expired : token.expired;
    });
};

export const sortKPITokens = (tokens: KPIToken[], order: CampaignOrder) => {
    if (tokens.length === 0) return [];

    const comparator =
        order === CampaignOrder.NEWEST
            ? (a: KPIToken, b: KPIToken) =>
                  b.creationTimestamp - a.creationTimestamp
            : (a: KPIToken, b: KPIToken) =>
                  a.creationTimestamp - b.creationTimestamp;

    return tokens.sort(comparator);
};
