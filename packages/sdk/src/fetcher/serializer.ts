import { ResolvedKPIToken } from "../entities/kpi-token";
import type { ResolvedKPITokensMap } from "./types";

export function transformInKPITokensObject(
    filteredTokens: ResolvedKPIToken[],
): ResolvedKPITokensMap {
    return filteredTokens.reduce(
        (kpiTokensObj: ResolvedKPITokensMap, token: ResolvedKPIToken) => {
            kpiTokensObj[token.address] = token;
            return kpiTokensObj;
        },
        {},
    );
}
