import React from "react";
import {
    ChainProviderFn,
    configureChains,
    Connector,
    createClient,
    WagmiConfig,
} from "wagmi";
import { Chain } from "wagmi";
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
    const { provider, chains, webSocketProvider } = configureChains(
        supportedChains,
        providers
    );
    const client = createClient({
        autoConnect: true,
        connectors: getConnectors(chains),
        provider,
        webSocketProvider,
    });
    if (!!ipfsGateway) IpfsService.gateway = ipfsGateway;
    return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
