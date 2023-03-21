import { KPIToken } from "@carrot-kpi/sdk";

export const filterKPITokens = (tokens: KPIToken[], activeOnly?: boolean) => {
    if (tokens.length === 0) return [];
    if (typeof activeOnly === "undefined") return tokens;
    return tokens.filter((token) => {
        return activeOnly ? !token.expired : token.expired;
    });
};

export const sortKPITokens = (tokens: KPIToken[], ordering?: string) => {
    if (tokens.length === 0) return [];
    const comparator =
        ordering?.toLowerCase() === "oldest"
            ? (a: KPIToken, b: KPIToken) => {
                  return a.creationTimestamp - b.creationTimestamp;
              }
            : (a: KPIToken, b: KPIToken) => {
                  return b.creationTimestamp - a.creationTimestamp;
              };

    return tokens.sort(comparator);
};
