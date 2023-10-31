import React from "react";
import type { ReactElement } from "react";
import type {
    KPITokenCreationFormProps,
    SerializableObject,
} from "../types/templates";
import { TemplateComponent } from "./template-component";

export function KPITokenCreationForm<S extends SerializableObject<S>>({
    template,
    fallback,
    error,
    i18n,
    className,
    ...additionalProps
}: KPITokenCreationFormProps<S>): ReactElement {
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
