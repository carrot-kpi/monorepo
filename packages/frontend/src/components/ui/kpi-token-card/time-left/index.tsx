import React from "react";
import { Timer, Typography } from "@carrot-kpi/ui";
import { ResolvedKPIToken } from "@carrot-kpi/sdk";
import { useTranslation } from "react-i18next";

interface TimeLeftProps {
    kpiToken: ResolvedKPIToken;
}

export const TimeLeft = ({ kpiToken }: TimeLeftProps) => {
    const { t } = useTranslation();

    if (kpiToken.finalized)
        return (
            <Typography uppercase className={{ root: "text-orange" }}>
                {t("stateOptions.finalized")}
            </Typography>
        );
    if (kpiToken.expired)
        return (
            <Typography uppercase className={{ root: "text-red" }}>
                {t("stateOptions.expired")}
            </Typography>
        );
    return <Timer to={kpiToken.expiration} countdown />;
};
