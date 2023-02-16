import { Button, Typography, SwiperCarousel } from "@carrot-kpi/ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { HorizontalSpacing } from "../../../components/ui/horizontal-spacing";
import { KPITokenCard } from "../../../components/ui/kpi-token-card";
import { useLatestKPITokens } from "../../../hooks/useLatestKPITokens";

const LATEST_TOKEN_AMOUNTS = 5;

const placeholder = new Array(LATEST_TOKEN_AMOUNTS)
    .fill(null)
    .map((_, index) => <KPITokenCard key={index} />);

export const LatestCampaignsSection = () => {
    const { t } = useTranslation();
    const { loading, kpiTokens } = useLatestKPITokens(LATEST_TOKEN_AMOUNTS);

    return (
        <div className="relative flex flex-col gap-16">
            <HorizontalSpacing>
                <Typography variant="h2">
                    {t("home.latestCampaigns")}
                </Typography>
            </HorizontalSpacing>
            <SwiperCarousel>
                {loading
                    ? placeholder
                    : Object.values(kpiTokens).map((kpiToken) => (
                          <KPITokenCard
                              key={kpiToken.address}
                              kpiToken={kpiToken}
                          />
                      ))}
            </SwiperCarousel>
            <HorizontalSpacing>
                <Link to="/campaigns">
                    <Button>{t("home.viewAllCampaigns")}</Button>
                </Link>
            </HorizontalSpacing>
        </div>
    );
};
