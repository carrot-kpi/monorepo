import "react-scripts";
import "react-i18next";

import { CARROT_KPI_FRONTEND_I18N_NAMESPACE } from "./i18n";
import { resources } from "./i18n/resources";

declare global {
    function __webpack_init_sharing__(arg: string): void;
}
declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof CARROT_KPI_FRONTEND_I18N_NAMESPACE;
        resources: typeof resources["en"];
    }
}
