import React from "react";
import { ReactElement } from "react";
import {
    TemplateComponent,
    TemplateComponentProps,
} from "../../template-component";
import { AdditionalOraclePageProps } from "../../../types";

type OraclePageProps = Omit<
    TemplateComponentProps,
    "entity" | "type" | "additionalProps"
> &
    AdditionalOraclePageProps;

export function OraclePage({
    template,
    fallback,
    i18n,
    className,
    ...additionalProps
}: OraclePageProps): ReactElement {
    return (
        <TemplateComponent
            entity="oracle"
            type="page"
            template={template}
            fallback={fallback}
            i18n={i18n}
            className={className}
            additionalProps={additionalProps}
        />
    );
}
