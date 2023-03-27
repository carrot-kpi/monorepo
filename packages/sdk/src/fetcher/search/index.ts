import { ResolvedKPIToken } from "../../entities/kpi-token";
import { transformInKPITokensObject } from "../serializer";
import { ResolvedKPITokensMap } from "../types";

export function searchKPItokens(
    searchQuery: string,
    allKPITokens: ResolvedKPITokensMap
) {
    const filteredTokens = Object.values(allKPITokens).filter((token) =>
        tokenSpecificationIncludesQuery(token, searchQuery)
    );

    return transformInKPITokensObject(filteredTokens);
}

function tokenSpecificationIncludesQuery(
    token: ResolvedKPIToken,
    searchQuery: string
) {
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
