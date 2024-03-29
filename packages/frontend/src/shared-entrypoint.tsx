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
import { WagmiProvider, type Config as WagmiConfig } from "wagmi";
import { App } from "./pages/app";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import { ThemeUpdater } from "./updaters/theme";
import { Fathom } from "./components/fathom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { CarrotChain } from "./constants";

dayjs.extend(localizedFormat);

interface SharedEntrypointProps {
    config:
        | WagmiConfig<readonly [CarrotChain, ...CarrotChain[]]>
        | WagmiConfig<readonly [CarrotChain]>;
    templateId?: number;
    enableFathom: boolean;
}

const queryClient = new QueryClient();

export const SharedEntrypoint = ({
    config,
    templateId,
    enableFathom,
}: SharedEntrypointProps) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ThemeUpdater />
                {enableFathom && <Fathom />}
                <App templateId={templateId} />
            </QueryClientProvider>
        </WagmiProvider>
    );
};
