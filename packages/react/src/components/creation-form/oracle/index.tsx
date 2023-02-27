import React from "react";
import { ReactElement } from "react";
import {
    TemplateComponent,
    TemplateComponentProps,
} from "../../template-component";
import { BigNumber } from "@ethersproject/bignumber";
import { Address } from "wagmi";

interface OracleCreationFormProps
    extends Omit<TemplateComponentProps, "entity" | "type" | "props"> {
    onDone:
        | ((to: Address, data: string, value: BigNumber) => void)
        | ((data: string, value: BigNumber) => void);
}

export function OracleCreationForm({
    onDone,
    template,
    ...rest
}: OracleCreationFormProps): ReactElement {
    return (
        <TemplateComponent
            entity="oracle"
            type="creationForm"
            template={template}
            {...rest}
            props={{ template, onDone }}
        />
    );
}
