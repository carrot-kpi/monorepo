import { Typography } from "@carrot-kpi/ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as EmptyIllustration } from "../../../assets/empty.svg";

export const Empty = () => {
    const { t } = useTranslation();

    return (
        <div className="flex items-center gap-10">
            <EmptyIllustration className="h-50 text-gray-500" />
            <div className="flex flex-col gap-6">
                <Typography variant="h3">{t("empty.title")}</Typography>
                <Typography variant="lg">{t("empty.description")}</Typography>
            </div>
        </div>
    );
};
