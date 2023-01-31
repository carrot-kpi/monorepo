import React from "react";
import { KPITokenPage } from "@carrot-kpi/react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Page = () => {
    const { address } = useParams();
    const { i18n } = useTranslation();

    return (
        <KPITokenPage
            address={address}
            i18n={i18n}
            // TODO: use a proper fallback component
            fallback="Loading..."
        />
    );
};
