import React from "react";
import {
    type ChainProviderFn,
    configureChains,
    Connector,
    createConfig,
    WagmiConfig,
} from "wagmi";
import type { Chain } from "wagmi";
import type { ReactNode } from "react";
import { ReactSharedStateProvider } from "@carrot-kpi/shared-state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useSetIPFSGatewayURL } from "../../hooks/useSetIPFSGatewayURL";

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
    const { chains, publicClient, webSocketPublicClient } = configureChains(
        supportedChains,
        [
            // jsonRpcProvider({
            //     rpc: (chain) => ({
            //         http: `https://${chain.id}.example.com`,
            //     }),
            // }),
            ...providers,
        ],
    );
    const config = createConfig({
        autoConnect: true,
        connectors: getConnectors(chains),
        publicClient,
        webSocketPublicClient,
    });

    return <WagmiConfig config={config}>{children}</WagmiConfig>;
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
                    {children}
                </InternalSetup>
            </QueryClientProvider>
        </ReactSharedStateProvider>
    );
};
