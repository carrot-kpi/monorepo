import React from "react";
import { ReactElement } from "react";
import { AdditionalOracleCreationFormProps } from "../../../types/templates";
import {
    TemplateComponent,
    TemplateComponentProps,
} from "../../template-component";

type OracleCreationFormProps<S> = Omit<
    TemplateComponentProps,
    "entity" | "type" | "additionalProps"
> &
    AdditionalOracleCreationFormProps<S>;

export function OracleCreationForm<S>({
    template,
    fallback,
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
            i18n={i18n}
            className={className}
            additionalProps={additionalProps}
        />
    );
}
