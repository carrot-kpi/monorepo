import { KPIToken } from "../../entities/kpi-token";

export type KPITokensObjectProp = { [address: string]: KPIToken };

export function transformInKPITokensObject(
    filteredTokens: KPIToken[]
): KPITokensObjectProp {
    return filteredTokens.reduce(
        (kpiTokensObj: KPITokensObjectProp, token: KPIToken) => {
            kpiTokensObj[token.address] = token;
            return kpiTokensObj;
        },
        {}
    );
}
