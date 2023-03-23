import { KPIToken } from "@carrot-kpi/sdk/lib/entities/kpi-token";

export const filterKPITokens = (tokens: KPIToken[], activeOnly?: boolean) => {
    if (tokens.length === 0) return [];
    if (typeof activeOnly === "undefined") return tokens;
    return tokens.filter((token) => {
        return activeOnly ? !token.expired : token.expired;
    });
};

export const sortKPITokens = (
    tokens: KPIToken[],
    ordering?: "newest-first" | "oldest-first"
) => {
    if (tokens.length === 0) return [];
    const comparator =
        ordering === "newest-first"
            ? (a: KPIToken, b: KPIToken) => {
                  return b.creationTimestamp - a.creationTimestamp;
              }
            : (a: KPIToken, b: KPIToken) => {
                  return a.creationTimestamp - b.creationTimestamp;
              };

    return tokens.sort(comparator);
};
