import React from "react";
import { ReactElement } from "react";
import {
    TemplateComponent,
    TemplateComponentProps,
} from "../template-component";
import { BigNumber } from "@ethersproject/bignumber";
import { Address } from "wagmi";

interface CreationFormProps
    extends Omit<TemplateComponentProps, "type" | "props"> {
    onDone:
        | ((to: Address, data: string, value: BigNumber) => void)
        | ((data: string, value: BigNumber) => void);
}

export function CreationForm({
    onDone,
    template,
    ...rest
}: CreationFormProps): ReactElement {
    return (
        <TemplateComponent
            type="creationForm"
            template={template}
            {...rest}
            props={{ template, onDone }}
        />
    );
}
