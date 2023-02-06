import React, { ReactNode } from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../template-component";
import { Template } from "@carrot-kpi/sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { Address } from "wagmi";
import { i18n } from "i18next";

interface CreationFormProps {
    template?: Template;
    customBaseURL?: string;
    i18n: i18n;
    fallback: ReactNode;
    onDone:
        | ((to: Address, data: string, value: BigNumber) => void)
        | ((data: string, value: BigNumber) => void);
}

export function CreationForm({
    template,
    customBaseURL,
    i18n,
    fallback,
    onDone,
}: CreationFormProps): ReactElement {
    return (
        <TemplateComponent
            type="creationForm"
            template={template}
            customBaseURL={customBaseURL}
            i18n={i18n}
            fallback={fallback}
            props={{ template, onDone }}
        />
    );
}
