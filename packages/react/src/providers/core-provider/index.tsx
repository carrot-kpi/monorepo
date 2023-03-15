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
import { ReactSharedStateProvider } from "@carrot-kpi/shared-state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useSetIPFSGatewayURL } from "../../hooks/useSetIPFSGatewayURL";
import { FetcherProvider } from "../fetcher-provider";

interface InternalSetupProps {
    children: ReactNode;
    ipfsGatewayURL?: string;
    supportedChains: Chain[];
    providers: ChainProviderFn[];
    getConnectors: (chains: Chain[]) => Connector[];
}

const InternalSetup = ({
    supportedChains,
    ipfsGatewayURL,
    getConnectors,
    providers,
    children,
}: InternalSetupProps) => {
    const setIPFSGatewayURL = useSetIPFSGatewayURL();

    if (!!ipfsGatewayURL) setIPFSGatewayURL(ipfsGatewayURL);

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

    return <WagmiConfig client={client}>{children}</WagmiConfig>;
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

    return (
        <ReactSharedStateProvider>
            <QueryClientProvider client={reactQueryClient}>
                <InternalSetup
                    ipfsGatewayURL={ipfsGatewayURL}
                    supportedChains={supportedChains}
                    providers={providers}
                    getConnectors={getConnectors}
                >
                    <FetcherProvider>{children}</FetcherProvider>
                </InternalSetup>
            </QueryClientProvider>
        </ReactSharedStateProvider>
    );
};
