import { useEffect, useState } from "react";

interface HookParams {
    enabled?: boolean;
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

    return hook({
        ...params,
        enabled: params.enabled && browserFocused,
    });
}
