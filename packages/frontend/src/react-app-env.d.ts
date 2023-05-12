import "react-scripts";
import "react-i18next";

import { resources } from "./i18n/resources";
import { CARROT_KPI_FRONTEND_I18N_NAMESPACE } from "./constants";

declare global {
    const __LIBRARY_MODE__: boolean;
    const __STAGING_MODE__: boolean;

    interface Window {
        fathom?: Fathom;
    }

    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_INFURA_PROJECT_ID: string;
            REACT_APP_WALLETCONNECT_PROJECT_ID?: string;
            REACT_APP_FATHOM_SITE_ID?: string;
        }
    }
}

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof CARROT_KPI_FRONTEND_I18N_NAMESPACE;
        resources: (typeof resources)["en"];
    }
}
