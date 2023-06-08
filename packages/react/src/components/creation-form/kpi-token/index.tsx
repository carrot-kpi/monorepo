import React from "react";
import type { ReactElement } from "react";
import type { KPITokenCreationFormProps } from "../../../types/templates";
import { TemplateComponent } from "../../template-component";

export function KPITokenCreationForm({
    template,
    fallback,
    error,
    i18n,
    className,
    ...additionalProps
}: KPITokenCreationFormProps): ReactElement {
    return (
        <TemplateComponent
            entity="kpiToken"
            type="creationForm"
            template={template}
            fallback={fallback}
            error={error}
            i18n={i18n}
            className={className}
            additionalProps={additionalProps}
        />
    );
}
