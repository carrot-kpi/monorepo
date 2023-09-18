import React from "react";
import { FeedbackBox, Typography } from "@carrot-kpi/ui";
import { useTranslation } from "react-i18next";

export const StagingModeBanner = () => {
    const { t } = useTranslation();

    return (
        <FeedbackBox
            border="none"
            variant="warning"
            className={{ root: "text-center" }}
        >
            <Typography>{t("stagingMode.warning")}</Typography>
        </FeedbackBox>
    );
};
