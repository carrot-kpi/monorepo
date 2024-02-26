import type { Address } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { FACTORY_ABI } from "@carrot-kpi/sdk";

export const useIsCreatorAllowed = (creator?: Address) => {
    const { chain } = useAccount();

    const factoryAddress = chain?.contracts.factory.address;
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
            enabled: !!creator && !!factoryAddress,
        },
    });

    return {
        loading: isLoading,
        allowed: !!(data?.[0].result || data?.[1].result),
    };
};
