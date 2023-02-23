import React from "react";
import { ReactElement } from "react";
import {
    TemplateComponent,
    TemplateComponentProps,
} from "../../template-component";
import { BigNumber } from "@ethersproject/bignumber";
import { Address } from "wagmi";

interface KPITokenCreationFormProps
    extends Omit<TemplateComponentProps, "entity" | "type" | "props"> {
    onDone:
        | ((to: Address, data: string, value: BigNumber) => void)
        | ((data: string, value: BigNumber) => void);
}

export function KPITokenCreationForm({
    onDone,
    template,
    ...rest
}: KPITokenCreationFormProps): ReactElement {
    return (
        <TemplateComponent
            entity="kpiToken"
            type="creationForm"
            template={template}
            {...rest}
            props={{ template, onDone }}
        />
    );
}
