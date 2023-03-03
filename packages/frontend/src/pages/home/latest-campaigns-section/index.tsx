import { Button, Typography } from "@carrot-kpi/ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";
import { KPITokenCard } from "../../../components/ui/kpi-token-card";
import { useLatestKPITokens } from "../../../hooks/useLatestKPITokens";
import { ReactComponent as Empty } from "../../../assets/empty.svg";

const LATEST_TOKEN_AMOUNTS = 5;

const placeholder = new Array(LATEST_TOKEN_AMOUNTS)
    .fill(null)
    .map((_, index) => <KPITokenCard key={index} />);

export const LatestCampaignsSection = () => {
    const { t } = useTranslation();
    const { loading, kpiTokens } = useLatestKPITokens(LATEST_TOKEN_AMOUNTS);

    return (
        <div className="relative flex flex-col gap-16">
            {/* TODO: add i18n */}
            <Typography variant="h2">{t("home.latestCampaigns")}</Typography>
            <CardHorizontal className="h-96">
                {loading ? (
                    placeholder
                ) : Object.values(kpiTokens).length > 0 ? (
                    Object.values(kpiTokens).map((kpiToken) => (
                        <KPITokenCard
                            key={kpiToken.address}
                            kpiToken={kpiToken}
                        />
                    ))
                ) : (
                    <Empty />
                )}
            </CardHorizontal>
            <Link to="/campaigns">
                <Button>View all campaigns</Button>
            </Link>
        </div>
    );
};
