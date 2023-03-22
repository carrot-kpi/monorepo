import { KPIToken } from "@carrot-kpi/sdk";
import { Order } from "../pages/campaigns";

export const filterKPITokens = (tokens: KPIToken[], activeOnly?: boolean) => {
    if (tokens.length === 0) return [];
    if (typeof activeOnly === "undefined") return tokens;
    return tokens.filter((token) => {
        return activeOnly ? !token.expired : token.expired;
    });
};

export const sortKPITokens = (tokens: KPIToken[], order: number) => {
    if (tokens.length === 0) return [];

    const comparator =
        order === Order.newest
            ? (a: KPIToken, b: KPIToken) =>
                  b.creationTimestamp - a.creationTimestamp
            : (a: KPIToken, b: KPIToken) =>
                  a.creationTimestamp - b.creationTimestamp;

    return tokens.sort(comparator);
};
