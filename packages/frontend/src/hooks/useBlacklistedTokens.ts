import { type ChainId } from "@carrot-kpi/sdk";
import type { Address } from "viem";
import { useFeaturedBlacklistedKPITokenAddresses } from "./useFeaturedKPITokenAddresses";
import { useChainId } from "wagmi";

export const useBlacklistedTokens = (): {
    loading: boolean;
    blacklistedKPITokens: Address[];
} => {
    const chainId = useChainId();
    const {
        isLoading: loadingFeaturedBlacklistedKPITokenAddresses,
        data: featuredBlacklistedKPITokenAddresses,
    } = useFeaturedBlacklistedKPITokenAddresses();

    return {
        blacklistedKPITokens:
            featuredBlacklistedKPITokenAddresses?.[chainId as ChainId]
                ?.blacklisted || [],
        loading: loadingFeaturedBlacklistedKPITokenAddresses,
    };
};
