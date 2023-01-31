import React, { ReactNode } from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../../template-component";
import { useKPIToken } from "../../../hooks";
import { i18n } from "i18next";

interface KPITokenPageProps {
    address?: string;
    i18n: i18n;
    fallback: ReactNode;
    customBaseUrl?: string;
}

export function KPITokenPage({
    address,
    fallback,
    i18n,
    customBaseUrl,
}: KPITokenPageProps): ReactElement {
    const { loading, kpiToken } = useKPIToken(address);

    if (loading || !kpiToken) return <>{fallback}</>;
    return (
        <TemplateComponent
            type="page"
            template={kpiToken.template}
            customBaseUrl={customBaseUrl}
            fallback={fallback}
            i18n={i18n}
            props={{ kpiToken }}
        />
    );
}
