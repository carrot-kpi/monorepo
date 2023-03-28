import React from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../../template-component";
import { OraclePageProps } from "../../../types/templates";

export function OraclePage({
    fallback,
    error,
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
            error={error}
            i18n={i18n}
            className={className}
            additionalProps={{ oracle, ...rest }}
        />
    );
}
