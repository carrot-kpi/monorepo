import React from "react";
import { Campaign as RemoteCampaignComponent } from "@carrot-kpi/react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Campaign = () => {
    const { address } = useParams();
    const { i18n } = useTranslation();

    return (
        <RemoteCampaignComponent
            address={address}
            i18n={i18n}
            // TODO: use a proper fallback component
            fallback="Loading..."
        />
    );
};
