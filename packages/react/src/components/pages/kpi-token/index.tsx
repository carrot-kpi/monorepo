import React from "react";
import { ReactElement } from "react";
import {
    TemplateComponent,
    TemplateComponentProps,
} from "../../template-component";
import { AdditionalKPITokenPageProps } from "../../../types";

type KPITokenPageProps = Omit<
    TemplateComponentProps,
    "entity" | "type" | "additionalProps"
> &
    AdditionalKPITokenPageProps;

export function KPITokenPage({
    template,
    fallback,
    i18n,
    className,
    ...additionalProps
}: KPITokenPageProps): ReactElement {
    return (
        <TemplateComponent
            entity="kpiToken"
            type="page"
            template={template}
            fallback={fallback}
            i18n={i18n}
            className={className}
            additionalProps={additionalProps}
        />
    );
}
