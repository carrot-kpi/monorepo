import { ResolvedKPIToken } from "@carrot-kpi/sdk";

export const searchResolvedKPItokens = (
    searchQuery: string,
    kpiTokens: ResolvedKPIToken[]
) => {
    return kpiTokens.filter((token) =>
        tokenSpecificationIncludesQuery(token, searchQuery)
    );
};

export const tokenSpecificationIncludesQuery = (
    token: ResolvedKPIToken,
    searchQuery: string
) => {
    const query = searchQuery.toLowerCase();
    const specification = token.specification;

    return (
        includesQuery(specification.title, query) ||
        includesQuery(specification.description, query) ||
        includesQuery(specification.tags, query)
    );
};

const includesQuery = (value: string | string[], query: string) => {
    const result =
        typeof value === "string"
            ? value.toString().toLowerCase()
            : value.map((i) => i.toLowerCase());
    return result.includes(query);
};
