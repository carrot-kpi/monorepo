import React from "react";
import type { ReactElement } from "react";
import type { OracleCreationFormProps } from "../../../types/templates";
import { TemplateComponent } from "../../template-component";

export function OracleCreationForm<S>({
    template,
    fallback,
    error,
    i18n,
    className,
    ...additionalProps
}: OracleCreationFormProps<S>): ReactElement {
    return (
        <TemplateComponent
            entity="oracle"
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
