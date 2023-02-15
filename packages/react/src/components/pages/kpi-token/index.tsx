import React, { ReactNode } from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../../template-component";
import { i18n } from "i18next";
import { KPIToken } from "@carrot-kpi/sdk";

interface KPITokenPageProps {
    kpiToken?: KPIToken;
    i18n: i18n;
    fallback: ReactNode;
    customBaseURL?: string;
}

export function KPITokenPage({
    kpiToken,
    fallback,
    i18n,
    customBaseURL,
}: KPITokenPageProps): ReactElement {
    if (!kpiToken) return <>{fallback}</>;
    return (
        <TemplateComponent
            type="page"
            template={kpiToken.template}
            customBaseURL={customBaseURL}
            fallback={fallback}
            i18n={i18n}
            props={{ kpiToken }}
        />
    );
}
