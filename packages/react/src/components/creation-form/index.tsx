import React, { ReactNode } from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../template-component";
import { Template } from "@carrot-kpi/sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { Address } from "wagmi";

interface CreationFormProps {
    template?: Template;
    customBaseUrl?: string;
    fallback: ReactNode;
    onDone:
        | ((to: Address, data: string, value: BigNumber) => void)
        | ((data: string, value: BigNumber) => void);
}

export function CreationForm({
    template,
    customBaseUrl,
    fallback,
    onDone,
}: CreationFormProps): ReactElement {
    return (
        <TemplateComponent
            type="creationForm"
            template={template}
            customBaseUrl={customBaseUrl}
            fallback={fallback}
            props={{ template, onDone }}
        />
    );
}
