import { uriToHttps, IpfsService, parseENSName } from "@carrot-kpi/sdk";
import { TokenList } from "@uniswap/token-lists";
import { useEffect, useState } from "react";

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
    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState<TokenList[]>([]);

    useEffect(() => {
        const fetchLists = async () => {
            if (!urls || urls.length === 0) return;
            setLoading(true);
            let lists = [];
            try {
                lists = await Promise.all(
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
                            resolvedUrls = uriToHttps(url, IpfsService.gateway);
                        }
                        for (let i = 0; i < resolvedUrls.length; i++) {
                            const fetchedList = await fetchList(
                                resolvedUrls[i]
                            );
                            if (fetchedList === null) continue;
                            return fetchedList;
                        }
                        return null;
                        console.warn("unrecognized list url", url);
                    })
                );
            } finally {
                setLoading(false);
            }
            setLists(lists.filter((list) => list !== null) as TokenList[]);
        };
        void fetchLists();
    }, [urls]);

    return { loading, lists };
};
