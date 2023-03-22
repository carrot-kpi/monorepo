import { KPIToken } from "../../entities/kpi-token";

export type KPITokensObject = Record<string, KPIToken>;

export function transformInKPITokensObject(
    filteredTokens: KPIToken[]
): KPITokensObject {
    return filteredTokens.reduce(
        (kpiTokensObj: KPITokensObject, token: KPIToken) => {
            kpiTokensObj[token.address] = token;
            return kpiTokensObj;
        },
        {}
    );
}
