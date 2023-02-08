import { Button, Typography } from "@carrot-kpi/ui";
import React from "react";
import { Link } from "react-router-dom";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";
import { KPITokenCard } from "../../../components/ui/kpi-token-card";
import { useLatestKPITokens } from "../../../hooks/useLatestKPITokens";

const LATEST_TOKEN_AMOUNTS = 5;

const placeholder = new Array(LATEST_TOKEN_AMOUNTS)
    .fill(null)
    .map((_, index) => <KPITokenCard key={index} />);

export const LatestCampaignsSection = () => {
    const { loading, kpiTokens } = useLatestKPITokens(LATEST_TOKEN_AMOUNTS);

    return (
        <div className="relative flex flex-col gap-16">
            <Typography variant="h2">Latest Campaigns</Typography>
            <CardHorizontal>
                {loading
                    ? placeholder
                    : Object.values(kpiTokens).map((kpiToken) => (
                          <KPITokenCard
                              key={kpiToken.address}
                              kpiToken={kpiToken}
                          />
                      ))}
            </CardHorizontal>
            <Link to="/campaigns">
                <Button>View all campaings</Button>
            </Link>
        </div>
    );
};
