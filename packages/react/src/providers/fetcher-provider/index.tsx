import React, { useMemo, ReactNode } from "react";
import { Fetcher } from "@carrot-kpi/sdk";
import { useProvider } from "wagmi";
import { useIPFSGatewayURL, usePreferDecentralization } from "../../hooks";

export const FetcherContext = React.createContext<Fetcher>(null as any);

export function FetcherProvider({ children }: { children: ReactNode }) {
    const preferDecentralization = usePreferDecentralization();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const provider = useProvider();

    const fetcher = useMemo(
        () =>
            new Fetcher({
                provider,
                ipfsGatewayURL,
                preferDecentralization,
            }),
        [provider, ipfsGatewayURL, preferDecentralization]
    );

    return (
        <FetcherContext.Provider value={fetcher}>
            {children}
        </FetcherContext.Provider>
    );
}
