import React from "react";
import { ReactElement } from "react";
import { AdditionalKPITokenCreationFormProps } from "../../../types/templates";
import {
    TemplateComponent,
    TemplateComponentProps,
} from "../../template-component";

type KPITokenCreationFormProps = Omit<
    TemplateComponentProps,
    "entity" | "type" | "additionalProps"
> &
    AdditionalKPITokenCreationFormProps;

export function KPITokenCreationForm({
    template,
    fallback,
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
            i18n={i18n}
            className={className}
            additionalProps={additionalProps}
        />
    );
}
