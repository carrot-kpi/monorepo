import {
    useIPFSGatewayURL,
    useKPITokens,
    usePreferDecentralization,
} from "@carrot-kpi/react";
import { Fetcher, ResolvedKPIToken } from "@carrot-kpi/sdk";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { tokenSpecificationIncludesQuery } from "../utils/search";

export function useSearchResolvedKPITokens(searchQuery: string) {
    const { chain } = useAccount();
    const { kpiTokens } = useKPITokens();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const preferDecentralization = usePreferDecentralization();

    const [loading, setLoading] = useState(true);
    const [initialTokens, setInitialTokens] = useState<ResolvedKPIToken[]>([]);
    const [tokens, setTokens] = useState<ResolvedKPIToken[]>([]);

    useEffect(() => {
        const kpiTokensArray = Object.values(kpiTokens);
        if (!chain || !kpiTokens || kpiTokensArray.length === 0) return;
        const fetchData = async () => {
            const promises = kpiTokensArray.map(async (kpiToken) => {
                return (
                    await Fetcher.resolveKPITokens({
                        ipfsGatewayURL,
                        preferDecentralization,
                        kpiTokens: [kpiToken],
                    })
                )[kpiToken.address];
            });

            await Promise.allSettled(promises).then(() => {
                for (const promise of promises) {
                    promise
                        .then((result) => {
                            setInitialTokens((prevState) => [
                                ...prevState,
                                result,
                            ]);
                        })
                        .catch((error) => {
                            console.warn(
                                "error while fetching searchable resolved kpi tokens",
                                error,
                            );
                        });
                }
            });
        };
        void fetchData();
    }, [chain, ipfsGatewayURL, kpiTokens, preferDecentralization]);

    useEffect(() => {
        setInitialTokens([]);
        setTokens([]);
    }, [chain?.id]);

    useEffect(() => {
        setTokens(initialTokens);
    }, [initialTokens]);

    useEffect(() => {
        if (tokens.length === 0) return;
        setLoading(false);
    }, [tokens]);

    useEffect(() => {
        if (!initialTokens) return;
        if (!searchQuery) setTokens(initialTokens);

        const searchedTokens = initialTokens.filter((token) =>
            tokenSpecificationIncludesQuery(token, searchQuery),
        );

        setTokens(searchedTokens);
    }, [searchQuery, initialTokens]);

    return {
        loading,
        kpiTokens: tokens,
    };
}
