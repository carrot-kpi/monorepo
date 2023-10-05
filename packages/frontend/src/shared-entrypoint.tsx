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
import { WagmiConfig, type Config } from "wagmi";
import { App } from "./pages/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import { ThemeUpdater } from "./updaters/theme";
import { MultiChainLinksUpdater } from "./updaters/multi-chain-links";
import { Fathom } from "./components/fathom";

dayjs.extend(localizedFormat);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1_000 * 60 * 60 * 24, // 24 hours
            networkMode: "offlineFirst",
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

interface SharedEntrypointProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: Config<any, any>;
    templateId?: number;
    enableFathom: boolean;
}

export const SharedEntrypoint = ({
    config,
    templateId,
    enableFathom,
}: SharedEntrypointProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <WagmiConfig config={config}>
                <ThemeUpdater />
                <MultiChainLinksUpdater />
                {enableFathom && <Fathom />}
                <App templateId={templateId} />
            </WagmiConfig>
        </QueryClientProvider>
    );
};
