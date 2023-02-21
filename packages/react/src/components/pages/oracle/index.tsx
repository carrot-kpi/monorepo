import React from "react";
import { ReactElement } from "react";
import {
    TemplateComponent,
    TemplateComponentProps,
} from "../../template-component";
import { Oracle } from "@carrot-kpi/sdk";

interface OraclePageProps
    extends Omit<TemplateComponentProps, "type" | "template" | "props"> {
    oracle?: Oracle;
}

export function OraclePage({ oracle, ...rest }: OraclePageProps): ReactElement {
    return (
        <TemplateComponent
            type="page"
            template={oracle?.template}
            {...rest}
            props={{ oracle }}
        />
    );
}
