import React from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../../template-component";
import { KPITokenPageProps } from "../../../types/templates";

export function KPITokenPage({
    fallback,
    error,
    i18n,
    className,
    kpiToken,
    ...rest
}: KPITokenPageProps): ReactElement {
    return (
        <TemplateComponent
            entity="kpiToken"
            type="page"
            template={kpiToken?.template}
            fallback={fallback}
            error={error}
            i18n={i18n}
            className={className}
            additionalProps={{ kpiToken, ...rest }}
        />
    );
}
