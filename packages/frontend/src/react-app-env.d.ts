import "react-scripts";
import "react-i18next";

import { resources } from "./i18n/resources";
import { CARROT_KPI_FRONTEND_I18N_NAMESPACE } from "./constants";
import { IPFS } from "ipfs-core";

declare global {
    function __webpack_init_sharing__(arg: string): void;

    interface WorkerGlobalScope {
        ipfs: IPFS;
        ipfsGateway: string | undefined;
    }
}

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof CARROT_KPI_FRONTEND_I18N_NAMESPACE;
        resources: typeof resources["en"];
    }
}
