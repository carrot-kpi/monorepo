import React from "react";
import {
    ChainProviderFn,
    configureChains,
    Connector,
    createClient,
    WagmiConfig,
} from "wagmi";
import { Chain } from "wagmi";
// import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ReactNode } from "react";
import { IPFSService } from "@carrot-kpi/sdk";
import { PreferencesProvider } from "../../contexts/preferences";
// import { usePreferences } from "../../hooks/usePreferences";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

interface WagmiSetupProps {
    children: ReactNode;
    supportedChains: Chain[];
    providers: ChainProviderFn[];
    getConnectors: (chains: Chain[]) => Connector[];
    reactQueryClient: QueryClient;
}

const WagmiSetup = ({
    supportedChains,
    getConnectors,
    providers,
    reactQueryClient,
    children,
}: WagmiSetupProps) => {
    // TODO: this is the place to implement custom rpc setting

    const { provider, chains, webSocketProvider } = configureChains(
        supportedChains,
        [
            // jsonRpcProvider({
            //     rpc: (chain) => ({
            //         http: `https://${chain.id}.example.com`,
            //     }),
            // }),
            ...providers,
        ]
    );
    const client = createClient({
        autoConnect: true,
        connectors: getConnectors(chains),
        provider,
        webSocketProvider,
    });

    return (
        <QueryClientProvider client={reactQueryClient}>
            <WagmiConfig client={client}>{children}</WagmiConfig>
        </QueryClientProvider>
    );
};

interface CarrotCoreProviderProps {
    children: ReactNode;
    supportedChains: Chain[];
    providers: ChainProviderFn[];
    getConnectors: (chains: Chain[]) => Connector[];
    ipfsGatewayURL?: string;
    reactQueryClient: QueryClient;
}

export const CarrotCoreProvider = ({
    children,
    supportedChains,
    providers,
    getConnectors,
    ipfsGatewayURL,
    reactQueryClient,
}: CarrotCoreProviderProps) => {
    persistQueryClient({
        queryClient: reactQueryClient,
        persister: createSyncStoragePersister({
            key: "carrot-kpi-react-query-cache",
            storage: window.localStorage,
        }),
    });

    if (!!ipfsGatewayURL) IPFSService.gateway = ipfsGatewayURL;

    return (
        <PreferencesProvider>
            <WagmiSetup
                supportedChains={supportedChains}
                providers={providers}
                getConnectors={getConnectors}
                reactQueryClient={reactQueryClient}
            >
                {children}
            </WagmiSetup>
        </PreferencesProvider>
    );
};
