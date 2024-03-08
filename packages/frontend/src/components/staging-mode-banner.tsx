import React from "react";
import { FeedbackBox, Typography } from "@carrot-kpi/ui";
import { useTranslation } from "react-i18next";

export const StagingModeBanner = () => {
    const { t } = useTranslation();

    return (
        <FeedbackBox
            border="none"
            variant="warning"
            className={{ root: "text-center px-4 py-2" }}
        >
            <Typography data-testid="staging-banner-text" variant="sm">
                {t("templatePreviewMode.warning")}
            </Typography>
        </FeedbackBox>
    );
};
