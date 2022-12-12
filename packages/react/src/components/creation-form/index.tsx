import React from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../template-component";
import { Template } from "@carrot-kpi/sdk";
import { BigNumber } from "ethers";
import { Address } from "wagmi";

interface CreationFormProps {
    template?: Template;
    customBaseUrl?: string;
    onDone:
        | ((to: Address, data: string, value: BigNumber) => void)
        | ((data: string, value: BigNumber) => void);
}

export function CreationForm({
    template,
    customBaseUrl,
    onDone,
}: CreationFormProps): ReactElement {
    return (
        <TemplateComponent
            type="creationForm"
            template={template}
            customBaseUrl={customBaseUrl}
            props={{ template, onDone }}
        />
    );
}
