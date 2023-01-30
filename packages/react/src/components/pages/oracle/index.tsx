import React, { ReactNode } from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../../template-component";
import { useOracle } from "../../../hooks/useOracle";
import { i18n } from "i18next";
import { useOracleData } from "../../../hooks/useOracleData";

interface OraclePageProps {
    i18n: i18n;
    fallback: ReactNode;
    address?: string;
}

export function Oracle({
    address,
    i18n,
    fallback,
}: OraclePageProps): ReactElement {
    const { loading: loadingOracle, oracle } = useOracle(address);
    const { loading: loadingOracleData, data } = useOracleData(address);

    if (loadingOracle || loadingOracleData || !oracle || !data)
        return <>{fallback}</>;
    return (
        <TemplateComponent
            type="page"
            template={oracle.template}
            i18n={i18n}
            fallback={fallback}
            props={{ oracle }}
        />
    );
}
