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
    if (!token.hasOwnProperty("specification")) return;

    const query = searchQuery.toLowerCase();
    const specification = token.specification;

    return (
        token.hasOwnProperty("specification") &&
        (includesQuery(specification.title, query) ||
            includesQuery(specification.description, query) ||
            includesQuery(specification.tags, query))
    );
}

function includesQuery(value: string | string[], query: string) {
    const result =
        typeof value === "string"
            ? value.toString().toLowerCase()
            : lowerCaseArray(value);

    return result.includes(query);
}

function lowerCaseArray(stringsArray: string[]) {
    return stringsArray.map((value) => value.toLowerCase());
}
