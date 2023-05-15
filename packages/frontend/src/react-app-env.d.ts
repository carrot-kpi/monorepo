import "react-scripts";
import "react-i18next";

import { resources } from "./i18n/resources";
import { CARROT_KPI_FRONTEND_I18N_NAMESPACE } from "./constants";

declare global {
    const __LIBRARY_MODE__: boolean;
    const __STAGING_MODE__: boolean;
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
