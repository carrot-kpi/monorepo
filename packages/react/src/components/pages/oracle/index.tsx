import React, { ReactNode } from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../../template-component";
import { useOracle } from "../../../hooks/useOracle";
import { i18n } from "i18next";

interface OraclePageProps {
    i18n: i18n;
    fallback: ReactNode;
    address?: string;
    customBaseUrl?: string;
}

export function OraclePage({
    address,
    i18n,
    fallback,
    customBaseUrl,
}: OraclePageProps): ReactElement {
    const { loading: loading, oracle } = useOracle(address);

    if (loading || !oracle) return <>{fallback}</>;
    return (
        <TemplateComponent
            type="page"
            template={oracle.template}
            customBaseUrl={customBaseUrl}
            fallback={fallback}
            i18n={i18n}
            props={{ oracle }}
        />
    );
}
