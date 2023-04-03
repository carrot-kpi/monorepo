import { uriToHttps, parseENSName } from "@carrot-kpi/sdk";
import { TokenList } from "@uniswap/token-lists";
import { useEffect, useState } from "react";
import { useIPFSGatewayURL } from "./useIPFSGatewayURL";

const fetchList = async (url: string): Promise<TokenList | null> => {
    let response;
    try {
        response = await fetch(url, {
            credentials: "omit",
        });
    } catch (error) {
        console.warn(`failed to fetch  ${url}`, error);
        return null;
    }
    if (!response.ok) return null;
    // TODO: should we validate the token list's schema?
    return (await response.json()) as TokenList;
};

export const useTokenLists = (
    urls?: string[]
): { loading: boolean; lists: TokenList[] } => {
    const ipfsGatewayURL = useIPFSGatewayURL();

    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState<TokenList[]>([]);

    useEffect(() => {
        let cancelled = false;
        const fetchLists = async () => {
            if (!urls || urls.length === 0) return;
            if (!cancelled) setLoading(true);
            let listResults = [];
            try {
                listResults = await Promise.allSettled(
                    urls.map(async (url) => {
                        const parsedENSName = parseENSName(url);
                        let resolvedUrls: string[];
                        if (!!parsedENSName) {
                            const { name, path } = parsedENSName;
                            const lowerCaseName = name.toLowerCase();
                            resolvedUrls = [
                                `https://${lowerCaseName}.eth.limo/${path}`,
                                `https://${lowerCaseName}.eth.link/${path}`,
                            ];
                        } else {
                            resolvedUrls = uriToHttps(url, ipfsGatewayURL);
                        }
                        for (let i = 0; i < resolvedUrls.length; i++) {
                            const fetchedList = await fetchList(
                                resolvedUrls[i]
                            );
                            if (fetchedList === null) continue;
                            return fetchedList;
                        }
                        throw new Error(`unrecognized list url ${url}`);
                    })
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
            if (!cancelled)
                setLists(
                    listResults.reduce((accumulator: TokenList[], result) => {
                        if (result.status === "fulfilled")
                            accumulator.push(result.value);
                        return accumulator;
                    }, [])
                );
        };
        void fetchLists();
        return () => {
            cancelled = true;
        };
    }, [ipfsGatewayURL, urls]);

    return { loading, lists };
};
