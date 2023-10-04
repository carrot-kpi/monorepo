import "./i18n";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@carrot-kpi/switzer-font/400.css";
import "@carrot-kpi/switzer-font/500.css";
import "@carrot-kpi/switzer-font/700.css";
import "@carrot-kpi/ui/styles.css";

import "./global.css";

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
import {
    useSetDevMode,
    useSetIPFSGatewayURL,
    useSetKPITokenTemplateBaseURL,
    useSetOracleTemplateBaseURL,
    useSetStagingMode,
} from "@carrot-kpi/react";

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
    const setDevMode = useSetDevMode();
    const setStagingMode = useSetStagingMode();
    const setIPFSGatewayURL = useSetIPFSGatewayURL();
    const setKPITokenTemplateBaseURL = useSetKPITokenTemplateBaseURL();
    const setOracleTemplateBaseURL = useSetOracleTemplateBaseURL();

    setDevMode(true);
    setStagingMode(false);
    setIPFSGatewayURL(ipfsGatewayURL);
    setKPITokenTemplateBaseURL(kpiTokenTemplateBaseURL);
    setOracleTemplateBaseURL(oracleTemplateBaseURL);

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
