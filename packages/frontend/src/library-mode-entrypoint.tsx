import React from "react";
import { createConfig, http } from "wagmi";
import { SharedEntrypoint } from "./shared-entrypoint";
import { HostStateProvider } from "./state";
import { ReactSharedStateProvider } from "@carrot-kpi/shared-state";
import { LibraryModeSharedStateUpdater } from "./updaters/library-mode-shared-state";
import { templatesTesting } from "./library-mode-entrypoint";
import type { Hex } from "viem";
import type { CarrotChain } from "./constants";

export * from "./connectors/templates-testing";

console.log("Carrot host frontend running in library mode");

interface RootProps {
    supportedChain: CarrotChain;
    rpcURL: string;
    privateKey: Hex;
    ipfsGatewayURL: string;
    kpiTokenTemplateBaseURL?: string;
    oracleTemplateBaseURL?: string;
    templateId?: number;
    enableTemplatePreviewMode?: boolean;
}

export const Root = ({
    supportedChain,
    rpcURL,
    privateKey,
    kpiTokenTemplateBaseURL,
    oracleTemplateBaseURL,
    ipfsGatewayURL,
    templateId,
    enableTemplatePreviewMode,
}: RootProps) => {
    const config = createConfig({
        chains: [supportedChain] as const,
        transports: {
            [supportedChain.id]: http(rpcURL),
        },
        connectors: [
            templatesTesting({
                rpcURL,
                privateKey,
            }),
        ],
    });

    return (
        <HostStateProvider>
            <ReactSharedStateProvider>
                <LibraryModeSharedStateUpdater
                    kpiTokenTemplateBaseURL={kpiTokenTemplateBaseURL}
                    oracleTemplateBaseURL={oracleTemplateBaseURL}
                    ipfsGatewayURL={ipfsGatewayURL}
                    enableTemplatePreviewMode={enableTemplatePreviewMode}
                />
                <SharedEntrypoint
                    config={config}
                    templateId={templateId}
                    enableFathom={false}
                />
            </ReactSharedStateProvider>
        </HostStateProvider>
    );
};
