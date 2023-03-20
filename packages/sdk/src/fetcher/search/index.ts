import { KPIToken } from "../../entities/kpi-token";
import { KPITokensObject, transformInKPITokensObject } from "../serializer";

export function searchKPItokens(
    searchQuery: string,
    allKPITokens: KPITokensObject
) {
    const filteredTokens = Object.values(allKPITokens).filter((token) => {
        return tokenSpecificationIncludesQuery(token, searchQuery);
    });

    return transformInKPITokensObject(filteredTokens);
}

function tokenSpecificationIncludesQuery(token: KPIToken, searchQuery: string) {
    const query = searchQuery.toLowerCase();
    return (
        token.hasOwnProperty("specification") &&
        (token.specification.title.toLowerCase().includes(query) ||
            token.specification.description.toLowerCase().includes(query) ||
            Object.values(token.specification.tags).includes(query))
    );
}
