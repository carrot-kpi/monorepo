import { useChainId, usePublicClient } from "wagmi";
import { staticApi } from "../state/api";
import {
    ChainId,
    type FeaturedBlacklistedKPITokens,
    type FeaturedBlacklistedKPITokensInChain,
} from "@carrot-kpi/sdk";
import { useEffect, useState } from "react";
import { usePreferDecentralization } from "@carrot-kpi/react";

export const useFeaturedKPITokens = (
    featuredBlacklistedKPITokens?: FeaturedBlacklistedKPITokens,
) => {
    const publicClient = usePublicClient();
    const preferDecentralization = usePreferDecentralization();
    const chainId = useChainId();
    const [
        featuredBlacklistedKPITokensInChain,
        setFeaturedBlacklistedKPITokensInChain,
    ] = useState<FeaturedBlacklistedKPITokensInChain | null>(null);

    useEffect(() => {
        if (!featuredBlacklistedKPITokens || !(chainId in ChainId)) return;
        setFeaturedBlacklistedKPITokensInChain(
            featuredBlacklistedKPITokens[chainId as ChainId],
        );
    }, [chainId, featuredBlacklistedKPITokens]);

    return staticApi.useFetchFeaturedKPITokensQuery({
        publicClient,
        preferDecentralization,
        featuredAddresses: featuredBlacklistedKPITokensInChain?.featured,
        blacklistedAddresses: featuredBlacklistedKPITokensInChain?.blacklisted,
    });
};
