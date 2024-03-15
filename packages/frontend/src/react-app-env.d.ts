import "react-scripts";
import "react-i18next";

import { resources } from "./i18n/resources";
import {
    CARROT_KPI_FRONTEND_I18N_NAMESPACE,
    type CarrotChain,
} from "./constants";
import type { Config } from "wagmi";
import type { Environment } from "@carrot-kpi/shared-state";

declare global {
    const __ENVIRONMENT__: Environment;
    const __INFURA_PROJECT_ID__: string;
    const __WALLETCONNECT_PROJECT_ID__: string | undefined;
    const __FATHOM_SITE_ID__: string | undefined;

    interface Window {
        fathom?: Fathom;
    }
}

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof CARROT_KPI_FRONTEND_I18N_NAMESPACE;
        resources: (typeof resources)["en"];
    }
}

declare module "wagmi" {
    interface Register {
        config: Config<readonly [CarrotChain, ...CarrotChain[]]>;
    }
}
