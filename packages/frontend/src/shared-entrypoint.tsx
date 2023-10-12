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
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import { ThemeUpdater } from "./updaters/theme";
import { MultiChainLinksUpdater } from "./updaters/multi-chain-links";
import { Fathom } from "./components/fathom";

dayjs.extend(localizedFormat);

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
        <WagmiConfig config={config}>
            <ThemeUpdater />
            <MultiChainLinksUpdater />
            {enableFathom && <Fathom />}
            <App templateId={templateId} />
        </WagmiConfig>
    );
};
