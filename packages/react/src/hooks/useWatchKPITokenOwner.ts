import { KPI_TOKEN_ABI } from "@carrot-kpi/sdk";
import { useContractRead } from "wagmi";

export function useWatchKPITokenOwner(address?: string): {
    loading: boolean;
    owner: string;
} {
    const { data, isLoading } = useContractRead({
        address,
        abi: KPI_TOKEN_ABI,
        functionName: "owner",
        watch: true,
    });

    return { loading: isLoading, owner: data as string };
}
