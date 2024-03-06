import { type ChainId } from "@carrot-kpi/sdk";
import type { Address } from "viem";
import { useFeaturedBlacklistedKPITokenAddresses } from "./useFeaturedBlacklistedKPITokenAddresses";
import { useChainId, usePublicClient } from "wagmi";

export const useBlacklistedTokens = (): {
    loading: boolean;
    blacklistedKPITokens: Address[];
} => {
    const chainId = useChainId();
    const publicClient = usePublicClient();
    const {
        isLoading: loadingFeaturedBlacklistedKPITokenAddresses,
        data: featuredBlacklistedKPITokenAddresses,
    } = useFeaturedBlacklistedKPITokenAddresses({ publicClient });

    return {
        blacklistedKPITokens:
            featuredBlacklistedKPITokenAddresses?.[chainId as ChainId]
                ?.blacklisted || [],
        loading: loadingFeaturedBlacklistedKPITokenAddresses,
    };
};
