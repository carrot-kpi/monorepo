import { KPI_TOKEN_ABI } from "@carrot-kpi/sdk";
import { useContractRead } from "wagmi";

export function useWatchData(address?: string): {
    loading: boolean;
    data: string;
} {
    const { data, isLoading } = useContractRead({
        address,
        abi: KPI_TOKEN_ABI,
        functionName: "data",
        watch: true,
    });

    return { loading: isLoading, data: data as string };
}
