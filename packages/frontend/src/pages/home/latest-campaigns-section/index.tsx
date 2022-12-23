import { Button, Title } from "@carrot-kpi/ui";
import React from "react";
import { LatestCampaigns } from "../../../components/latest-campaings";

export const LatestCampaignsSection = () => {
    return (
        <div className="relative space-y-16">
            <Title size="6xl">Latest Campaigns</Title>
            <LatestCampaigns category="Defi" />
            <LatestCampaigns category="Token price" />
            <LatestCampaigns category="Predictions" />
            <Button>View all campaings</Button>
        </div>
    );
};
