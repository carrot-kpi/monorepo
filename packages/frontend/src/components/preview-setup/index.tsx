import React from "react";
import { CarrotCoreProvider } from "@carrot-kpi/react";
import { Chain, ChainProviderFn, Connector } from "wagmi";
import { App } from "../../pages/app";

interface PreviewSetupProps {
    supportedChains?: Chain[];
    providers?: ChainProviderFn[];
    connectors?: () => Connector[];
    ipfsGatewayURL?: string;
    customBaseURL?: string;
    templateId?: number;
}

export const PreviewSetup = ({
    supportedChains,
    providers,
    connectors,
    ipfsGatewayURL,
    customBaseURL,
    templateId,
}: PreviewSetupProps) => {
    return (
        <CarrotCoreProvider
            supportedChains={supportedChains || []}
            providers={providers || []}
            getConnectors={connectors || (() => [])}
            ipfsGatewayURL={ipfsGatewayURL}
        >
            <App customBaseURL={customBaseURL} templateId={templateId} />
        </CarrotCoreProvider>
    );
};
