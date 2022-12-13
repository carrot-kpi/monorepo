import React from "react";
import { Campaign as RemoteCampaignComponent } from "@carrot-kpi/react";
import { useParams } from "react-router-dom";

export const Campaign = () => {
    const { address } = useParams();

    return (
        <RemoteCampaignComponent
            address={address}
            // TODO: use a proper fallback component
            fallback="Loading..."
        />
    );
};
