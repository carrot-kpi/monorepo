import { ResolvedKPIToken } from "@carrot-kpi/sdk";

export const tokenSpecificationIncludesQuery = (
    token: ResolvedKPIToken,
    query: string
) => {
    const lowerCaseQuery = query.toLowerCase();
    const specification = token.specification;

    return (
        includesQuery(specification.title, lowerCaseQuery) ||
        includesQuery(specification.description, lowerCaseQuery) ||
        includesQuery(specification.tags, lowerCaseQuery)
    );
};

const includesQuery = (value: string | string[], query: string) => {
    const result =
        typeof value === "string"
            ? value.toString().toLowerCase()
            : value.map((i) => i.toLowerCase());
    return result.includes(query);
};
