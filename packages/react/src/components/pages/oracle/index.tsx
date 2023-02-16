import React, { ReactNode } from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../../template-component";
import { i18n } from "i18next";
import { Oracle } from "@carrot-kpi/sdk";

interface OraclePageProps {
    oracle?: Oracle;
    i18n: i18n;
    fallback: ReactNode;
    customBaseURL?: string;
}

export function OraclePage({
    oracle,
    i18n,
    fallback,
    customBaseURL,
}: OraclePageProps): ReactElement {
    if (!oracle) return <>{fallback}</>;
    return (
        <TemplateComponent
            type="page"
            template={oracle.template}
            customBaseURL={customBaseURL}
            fallback={fallback}
            i18n={i18n}
            props={{ oracle }}
        />
    );
}
