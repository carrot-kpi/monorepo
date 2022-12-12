import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export const CARROT_KPI_REACT_I18N_NAMESPACE = "@carrot-kpi/react";

i18next.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export interface TemplateBundle {
    [language: string]: { [key: string]: string };
}

export const addBundleForTemplate = (
    namespace: string,
    bundle: TemplateBundle
) => {
    Object.entries(bundle).forEach(([language, keys]) => {
        i18next.addResourceBundle(language, namespace, keys);
    });
};

export { i18next };
