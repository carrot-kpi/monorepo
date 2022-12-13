import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { CARROT_KPI_FRONTEND_I18N_NAMESPACE } from "../constants";
import { resources } from "./resources";

i18next.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    ns: CARROT_KPI_FRONTEND_I18N_NAMESPACE,
    defaultNS: CARROT_KPI_FRONTEND_I18N_NAMESPACE,
    resources,
    interpolation: {
        escapeValue: false,
    },
});

export default i18next;
