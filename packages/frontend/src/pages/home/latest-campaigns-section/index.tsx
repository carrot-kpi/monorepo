import { Button, Title } from "@carrot-kpi/ui";
import React from "react";
import { LatestCampaigns } from "../../../components/latest-campaings";
import { GridPatternBg } from "../../../components/ui/grid-pattern-bg";
import { PageWrapper } from "../../../components/ui/page-wrapper";

export const LatestCampaignsSection = () => {
    return (
        <div className="relative">
            <GridPatternBg bg="white" fullSize />
            <PageWrapper className="relative py-32 space-y-16">
                <Title size="6xl">Latest Campaigns</Title>
                <LatestCampaigns category="Defi" />
                <LatestCampaigns category="Token price" />
                <LatestCampaigns category="Predictions" />
                <Button>View all campaings</Button>
            </PageWrapper>
        </div>
    );
};
