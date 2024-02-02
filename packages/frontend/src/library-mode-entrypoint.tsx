import React from "react";
import { createConfig, http } from "wagmi";
import { SharedEntrypoint } from "./shared-entrypoint";
import { HashRouter } from "react-router-dom";
import { HostStateProvider } from "./state";
import { ReactSharedStateProvider } from "@carrot-kpi/shared-state";
import { LibraryModeSharedStateUpdater } from "./updaters/library-mode-shared-state";
import { templatesTesting } from "./library-mode-entrypoint";
import type { Chain, Hex } from "viem";

export * from "./connectors/templates-testing";

console.log("Carrot host frontend running in library mode");

interface RootProps {
    supportedChain: Chain;
    rpcURL: string;
    privateKey: Hex;
    ipfsGatewayURL: string;
    kpiTokenTemplateBaseURL?: string;
    oracleTemplateBaseURL?: string;
    templateId?: number;
    enableStagingMode?: boolean;
}

export const Root = ({
    supportedChain,
    rpcURL,
    privateKey,
    kpiTokenTemplateBaseURL,
    oracleTemplateBaseURL,
    ipfsGatewayURL,
    templateId,
    enableStagingMode,
}: RootProps) => {
    const config = createConfig({
        chains: [supportedChain] as const,
        transports: {
            [supportedChain.id]: http(supportedChain.rpcUrls.default.http[0]),
        },
        connectors: [
            templatesTesting({
                rpcURL,
                privateKey,
            }),
        ],
    });

    return (
        <HashRouter>
            <HostStateProvider>
                <ReactSharedStateProvider>
                    <LibraryModeSharedStateUpdater
                        kpiTokenTemplateBaseURL={kpiTokenTemplateBaseURL}
                        oracleTemplateBaseURL={oracleTemplateBaseURL}
                        ipfsGatewayURL={ipfsGatewayURL}
                        enableStagingMode={enableStagingMode}
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
