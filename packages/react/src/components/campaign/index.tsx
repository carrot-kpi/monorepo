import React, { ReactNode } from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../template-component";
import { useKpiToken } from "../../hooks";

interface CampaignProps {
    address?: string;
    fallback: ReactNode;
    customBaseUrl?: string;
}

export function Campaign({
    address,
    fallback,
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
            props={{ kpiToken }}
        />
    );
}
