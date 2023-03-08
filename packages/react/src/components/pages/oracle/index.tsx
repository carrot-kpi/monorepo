import React from "react";
import { ReactElement } from "react";
import {
    TemplateComponent,
    TemplateComponentProps,
} from "../../template-component";
import { AdditionalOraclePageProps } from "../../../types/templates";

type OraclePageProps = Omit<
    TemplateComponentProps,
    "entity" | "type" | "additionalProps" | "template"
> &
    AdditionalOraclePageProps;

export function OraclePage({
    fallback,
    i18n,
    className,
    oracle,
    ...rest
}: OraclePageProps): ReactElement {
    return (
        <TemplateComponent
            entity="oracle"
            type="page"
            template={oracle?.template}
            fallback={fallback}
            i18n={i18n}
            className={className}
            additionalProps={{ oracle, ...rest }}
        />
    );
}
