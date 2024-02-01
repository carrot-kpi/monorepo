import type { Address } from "viem";
import { useChainId, useReadContracts } from "wagmi";
import { CHAIN_ADDRESSES, FACTORY_ABI, ChainId } from "@carrot-kpi/sdk";

export const useIsCreatorAllowed = (creator?: Address) => {
    const chainId = useChainId();

    const factoryAddress = CHAIN_ADDRESSES[chainId as ChainId].factory;
    const { data, isLoading } = useReadContracts({
        contracts: [
            {
                address: factoryAddress,
                abi: FACTORY_ABI,
                functionName: "permissionless",
            },
            {
                address: factoryAddress,
                abi: FACTORY_ABI,
                functionName: "creatorAllowed",
                args: [creator as Address],
            },
        ],
        query: {
            enabled: !!creator && chainId in ChainId,
        },
    });

    return {
        loading: isLoading,
        allowed: !!(data?.[0].result || data?.[1].result),
    };
};
