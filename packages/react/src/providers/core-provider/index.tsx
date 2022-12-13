import React, { Suspense, useEffect, useState } from "react";
import {
    Chain,
    ChainProviderFn,
    Client,
    configureChains,
    Connector,
    createClient,
    WagmiConfig,
} from "wagmi";
import { ReactNode } from "react";
import { IpfsService } from "@carrot-kpi/sdk";

interface CarrotCoreProviderProps {
    children: ReactNode;
    supportedChains: Chain[];
    providers: ChainProviderFn[];
    getConnectors: (chains: Chain[]) => Connector[];
    ipfsGateway?: string;
}

export const CarrotCoreProvider = ({
    children,
    supportedChains,
    providers,
    getConnectors,
    ipfsGateway,
}: CarrotCoreProviderProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [client, setClient] = useState<Client<any, any> | null>(null);

    useEffect(() => {
        const { provider, chains, webSocketProvider } = configureChains(
            supportedChains,
            providers
        );
        setClient(
            createClient({
                autoConnect: true,
                connectors: getConnectors(chains),
                provider,
                webSocketProvider,
            })
        );
    }, [getConnectors, providers, supportedChains]);

    if (!client) return <></>;
    if (!!ipfsGateway) IpfsService.gateway = ipfsGateway;
    return (
        <WagmiConfig client={client}>
            <Suspense fallback="Loading">{children}</Suspense>
        </WagmiConfig>
    );
};
