import { useIPFSGatewayURL, useKPITokens } from "@carrot-kpi/react";
import { Fetcher, ResolvedKPIToken } from "@carrot-kpi/sdk";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { useNetwork } from "wagmi";

const searchKPItokens = (
    searchQuery: string,
    kpiTokens: ResolvedKPIToken[]
) => {
    return kpiTokens.filter((token) =>
        tokenSpecificationIncludesQuery(token, searchQuery)
    );
};

const tokenSpecificationIncludesQuery = (
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

export function useSearchedResolvedKPITokens(searchQuery: string) {
    const { chain } = useNetwork();
    const { loading: loadingKPITokens, kpiTokens } = useKPITokens();
    const ipfsGatewayURL = useIPFSGatewayURL();

    const [loading, setLoading] = useState(false);
    const [searchableKPITokens, setSearchableKPITokens] = useState<
        ResolvedKPIToken[]
    >([]);
    const [debouncedSearchableKPITokens, setDebouncedSearchableKPITokens] =
        useState<ResolvedKPIToken[]>([]);
    const [searchedKPITokens, setSearchedKPITokens] = useState<
        ResolvedKPIToken[]
    >([]);

    useDebounce(
        () => {
            setDebouncedSearchableKPITokens(searchableKPITokens);
        },
        300,
        [searchableKPITokens]
    );

    useEffect(() => {
        setSearchableKPITokens([]);
        setDebouncedSearchableKPITokens([]);
        setSearchedKPITokens([]);
    }, [chain?.id]);

    useEffect(() => {
        let cancelled = false;
        const kpiTokensArray = Object.values(kpiTokens);
        if (!kpiTokens || kpiTokensArray.length === 0) return;
        const fetchData = async () => {
            if (!cancelled) setLoading(true);
            const promises = kpiTokensArray.map(async (kpiToken) => {
                return (
                    await Fetcher.resolveKPITokens({
                        ipfsGatewayURL,
                        kpiTokens: [kpiToken],
                    })
                )[kpiToken.address];
            });
            for (const promise of promises) {
                promise
                    .then((result) => {
                        setSearchableKPITokens((prevState) => [
                            ...prevState,
                            result,
                        ]);
                    })
                    .catch((error) => {
                        console.warn(
                            "error while fetching searchable resolved kpi tokens",
                            error
                        );
                    });
            }
            await Promise.allSettled(promises);
            if (!cancelled) setLoading(false);
        };
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [ipfsGatewayURL, kpiTokens]);

    useEffect(() => {
        if (!searchQuery) setSearchedKPITokens(debouncedSearchableKPITokens);
        setSearchedKPITokens(
            searchKPItokens(searchQuery, debouncedSearchableKPITokens)
        );
    }, [debouncedSearchableKPITokens, ipfsGatewayURL, kpiTokens, searchQuery]);

    return {
        loading: loading || loadingKPITokens,
        kpiTokens: searchedKPITokens,
    };
}
