import React, { ReactNode } from "react";
import { CarrotCoreProvider, usePreferencesSetters } from "@carrot-kpi/react";
import { Chain, ChainProviderFn, Connector } from "wagmi";
import { App } from "../../pages/app";

interface PreferDecentralizationSetterProps {
    children: ReactNode;
}

const PreferDecentralizationSetter = ({
    children,
}: PreferDecentralizationSetterProps) => {
    const { setPreferDecentralization } = usePreferencesSetters();

    // subgraph is not mocked in preview mode but the blockchain is.
    // This forces the preview lib to go through the forked blockchain
    // to fetch data correctly
    setPreferDecentralization(true);

    return <>{children}</>;
};

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
    const app = <App customBaseURL={customBaseURL} templateId={templateId} />;

    return (
        <CarrotCoreProvider
            supportedChains={supportedChains || []}
            providers={providers || []}
            getConnectors={connectors || (() => [])}
            ipfsGatewayURL={ipfsGatewayURL}
        >
            {__PREVIEW_MODE__ ? (
                <PreferDecentralizationSetter>
                    {app}
                </PreferDecentralizationSetter>
            ) : (
                app
            )}
        </CarrotCoreProvider>
    );
};
