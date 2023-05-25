import React from "react";
import { WarningBanner } from "../ui/warning-banner";
import { Typography } from "@carrot-kpi/ui";
import { useTranslation } from "react-i18next";

export const StagingModeBanner = () => {
    const { t } = useTranslation();

    return (
        <WarningBanner>
            <Typography>{t("stagingMode.warning")}</Typography>
        </WarningBanner>
    );
};
