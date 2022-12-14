import React, { ReactNode } from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../template-component";
import { useKpiToken } from "../../hooks";
import { i18n } from "i18next";

interface CampaignProps {
    address?: string;
    i18n: i18n;
    fallback: ReactNode;
    customBaseUrl?: string;
}

export function Campaign({
    address,
    fallback,
    i18n,
    customBaseUrl,
}: CampaignProps): ReactElement {
    const { loading, kpiToken } = useKpiToken(address);

    if (loading || !kpiToken) return <>{fallback}</>;
    return (
        <TemplateComponent
            type="page"
            template={kpiToken.template}
            customBaseUrl={customBaseUrl}
            fallback={fallback}
            i18n={i18n}
            props={{ kpiToken }}
        />
    );
}
