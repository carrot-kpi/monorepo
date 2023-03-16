import { useState } from "react";
import { useDebounce } from "react-use";

export type SearchQueryProp = string | undefined;

export function useSearch() {
    const [searchQuery, setSearchQuery] = useState<SearchQueryProp>();
    const [searchFinalQuery, setSearchFinalQuery] = useState<SearchQueryProp>();

    useDebounce(() => setSearchFinalQuery(searchQuery), 990, [searchQuery]);

    return { searchQuery: searchFinalQuery, setSearchQuery };
}
