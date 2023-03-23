import { KPIToken } from "@carrot-kpi/sdk/lib/entities/kpi-token";
import { useQuery } from "@tanstack/react-query";

export function useFeaturedKPITokens(): {
    loading: boolean;
    kpiTokens: KPIToken[];
} {
    const { data: kpiTokens, isLoading: loading } = useQuery({
        queryKey: ["featueredKPITokens"],
        queryFn: async () => {
            // TODO: implement
            return [];
        },
    });

    return { loading: loading, kpiTokens: kpiTokens || [] };
}
