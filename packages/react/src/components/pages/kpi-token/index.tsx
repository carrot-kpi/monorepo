import React from "react";
import { ReactElement } from "react";
import {
    TemplateComponent,
    TemplateComponentProps,
} from "../../template-component";
import { AdditionalKPITokenPageProps } from "../../../types";

type KPITokenPageProps = Omit<
    TemplateComponentProps,
    "entity" | "type" | "additionalProps" | "template"
> &
    AdditionalKPITokenPageProps;

export function KPITokenPage({
    fallback,
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
            i18n={i18n}
            className={className}
            additionalProps={{ kpiToken, ...rest }}
        />
    );
}
