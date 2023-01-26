import { uriToHttps, IpfsService, parseENSName } from "@carrot-kpi/sdk";
import { TokenList } from "@uniswap/token-lists";
import { useEffect, useState } from "react";

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
                            const resolvedUrl = resolvedUrls[i];
                            let response;
                            try {
                                response = await fetch(resolvedUrl, {
                                    credentials: "omit",
                                });
                            } catch (error) {
                                console.warn(
                                    `failed to fetch  ${resolvedUrl}`,
                                    error
                                );
                                continue;
                            }
                            if (!response.ok) continue;
                            // TODO: should we validate the token list's schema?
                            return await response.json();
                        }
                        console.warn("unrecognized list url", url);
                    })
                );
            } finally {
                setLoading(false);
            }
            setLists(lists);
        };
        void fetchLists();
    }, [urls]);

    return { loading, lists };
};
