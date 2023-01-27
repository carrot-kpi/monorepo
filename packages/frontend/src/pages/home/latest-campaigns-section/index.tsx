import { useKpiTokens } from "@carrot-kpi/react";
import { Button, Typography } from "@carrot-kpi/ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CampaignCard } from "../../../components/ui/campaign-card";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";

export const LatestCampaignsSection = () => {
    const { t } = useTranslation();
    const { loading, kpiTokens } = useKpiTokens();

    return (
        <div className="relative space-y-16">
            <Typography variant="h2">Latest Campaigns</Typography>
            {loading ? (
                <>{t("loading")}</>
            ) : (
                <div className="space-y-6">
                    <CardHorizontal>
                        {Object.values(kpiTokens).map((kpiToken) => (
                            <CampaignCard
                                key={kpiToken.address}
                                title={kpiToken.specification.title}
                                question={kpiToken.specification.description}
                                templateName={`${kpiToken.template.specification.name} v${kpiToken.template.version}`}
                                tags={kpiToken.specification.tags}
                                expiration={kpiToken.expiration}
                            />
                        ))}
                    </CardHorizontal>
                </div>
            )}
            <Link to="/campaigns">
                <Button>View all campaings</Button>
            </Link>
        </div>
    );
};
