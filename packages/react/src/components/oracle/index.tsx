import React from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../template-component";
import { useTranslation } from "react-i18next";
import { useOracle } from "../../hooks/useOracle";
import { CARROT_KPI_REACT_I18N_NAMESPACE } from "../../i18n";

interface OracleProps {
    address?: string;
}

export function Oracle({ address }: OracleProps): ReactElement {
    const { t } = useTranslation(CARROT_KPI_REACT_I18N_NAMESPACE);
    const { loading, oracle } = useOracle(address);

    if (loading || !oracle) return <>{t("loading")}...</>;
    return (
        <TemplateComponent
            type="page"
            template={oracle.template}
            props={{ oracle }}
        />
    );
}
