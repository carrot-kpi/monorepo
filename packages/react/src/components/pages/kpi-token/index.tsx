import React from "react";
import { ReactElement } from "react";
import {
    TemplateComponent,
    TemplateComponentProps,
} from "../../template-component";
import { KPIToken } from "@carrot-kpi/sdk";

interface KPITokenPageProps
    extends Omit<TemplateComponentProps, "type" | "template" | "props"> {
    kpiToken?: KPIToken;
}

export function KPITokenPage({
    kpiToken,
    ...rest
}: KPITokenPageProps): ReactElement {
    return (
        <TemplateComponent
            type="page"
            template={kpiToken?.template}
            {...rest}
            props={{ kpiToken }}
        />
    );
}
