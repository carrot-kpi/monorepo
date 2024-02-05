import { useEffect, useState } from "react";
import { useBlockNumber } from "wagmi";
import type { UseQueryReturnType } from "wagmi/dist/types/utils/query";

interface HookParams {
    query?: { enabled?: boolean };
    [key: string]: unknown;
}

interface UsePassiveHookParams<T> {
    hook: (params: HookParams) => T;
    params: HookParams;
}

export function useWagmiPassiveHook<T>({
    hook,
    params,
}: UsePassiveHookParams<T>): T {
    const [browserFocused, setBrowserFocused] = useState(true);

    const { data: blockNumber } = useBlockNumber({
        watch: true,
        query: { enabled: params.query?.enabled && browserFocused },
    });

    const result = hook({
        ...params,
        query: {
            enabled: params.query?.enabled && browserFocused,
        },
    });

    useEffect(() => {
        if (!params.query?.enabled || !browserFocused) return;
        (result as UseQueryReturnType).refetch();
    }, [browserFocused, blockNumber, result, params.query?.enabled]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setBrowserFocused(document.visibilityState === "visible");
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };
    }, []);

    return result;
}
