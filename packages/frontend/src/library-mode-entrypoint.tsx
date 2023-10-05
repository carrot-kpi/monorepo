import React from "react";
import {
    type Chain,
    type ChainProviderFn,
    Connector,
    configureChains,
    createConfig,
} from "wagmi";
import { ReadonlyConnector } from "./connectors";
import { SharedEntrypoint } from "./shared-entrypoint";
import { HashRouter } from "react-router-dom";
import { HostStateProvider } from "./state/connector";
import { ReactSharedStateProvider } from "@carrot-kpi/shared-state";
import { LibraryModeSharedStateUpdater } from "./updaters/library-mode-shared-state";

export * from "./connectors/template-testing";

console.log("Carrot host frontend running in library mode");

interface RootProps {
    supportedChains: Chain[];
    providers: ChainProviderFn[];
    getConnectors: () => Connector[];
    ipfsGatewayURL: string;
    kpiTokenTemplateBaseURL: string;
    oracleTemplateBaseURL: string;
    templateId: number;
}

export const Root = ({
    supportedChains,
    providers,
    getConnectors,
    kpiTokenTemplateBaseURL,
    oracleTemplateBaseURL,
    ipfsGatewayURL,
    templateId,
}: RootProps) => {
    const connectors = getConnectors();
    if (
        !connectors.some((connector) => connector instanceof ReadonlyConnector)
    ) {
        connectors.push(new ReadonlyConnector({ chains: supportedChains }));
    }

    const { publicClient, webSocketPublicClient } = configureChains(
        supportedChains,
        providers,
        { stallTimeout: 60_000 },
    );
    const config = createConfig({
        autoConnect: true,
        connectors,
        publicClient,
        webSocketPublicClient,
    });

    return (
        <HashRouter>
            <HostStateProvider>
                <ReactSharedStateProvider>
                    <LibraryModeSharedStateUpdater
                        kpiTokenTemplateBaseURL={kpiTokenTemplateBaseURL}
                        oracleTemplateBaseURL={oracleTemplateBaseURL}
                        ipfsGatewayURL={ipfsGatewayURL}
                    />
                    <SharedEntrypoint
                        config={config}
                        templateId={templateId}
                        enableFathom={false}
                    />
                </ReactSharedStateProvider>
            </HostStateProvider>
        </HashRouter>
    );
};
