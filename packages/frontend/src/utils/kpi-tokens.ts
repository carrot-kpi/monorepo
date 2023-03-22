import { KPIToken } from "@carrot-kpi/sdk";
import { CampaignOrder } from "../pages/campaigns";

export const filterKPITokens = (tokens: KPIToken[], activeOnly?: boolean) => {
    if (tokens.length === 0) return [];
    if (typeof activeOnly === "undefined") return tokens;
    return tokens.filter((token) => {
        return activeOnly ? !token.expired : token.expired;
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
