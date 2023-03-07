import { useState } from "react";
import { useDebounce } from "react-use";

export type SearchQueryProp = string | undefined;

export function useSearch() {
    const [searchQuery, setSearchQuery] = useState<SearchQueryProp>(undefined);
    const [searchFinalQuery, setSearchFinalQuery] =
        useState<SearchQueryProp>(undefined);

    useDebounce(
        () => {
            if (!!searchQuery) {
                setSearchFinalQuery(searchQuery);
            }
            if (searchQuery == "") {
                setSearchFinalQuery(undefined);
            }
        },
        990,
        [searchQuery]
    );

    return { searchQuery: searchFinalQuery, setSearchQuery };
}
