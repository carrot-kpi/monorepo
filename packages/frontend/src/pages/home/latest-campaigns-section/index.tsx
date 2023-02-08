import { useKPITokens } from "@carrot-kpi/react";
import { Button, Typography } from "@carrot-kpi/ui";
import React from "react";
import { Link } from "react-router-dom";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";
import { KPITokenCard } from "../../../components/ui/kpi-token-card";

export const LatestCampaignsSection = () => {
    const { loading, kpiTokens } = useKPITokens();

    return (
        <div className="relative flex flex-col gap-16">
            <Typography variant="h2">Latest Campaigns</Typography>
            <CardHorizontal>
                {loading ? (
                    <>
                        <KPITokenCard />
                        <KPITokenCard />
                        <KPITokenCard />
                        <KPITokenCard />
                        <KPITokenCard />
                    </>
                ) : (
                    Object.values(kpiTokens).map((kpiToken) => (
                        <KPITokenCard
                            key={kpiToken.address}
                            kpiToken={kpiToken}
                        />
                    ))
                )}
            </CardHorizontal>
            <Link to="/campaigns">
                <Button>View all campaings</Button>
            </Link>
        </div>
    );
};
