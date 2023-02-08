import { useKPITokens } from "@carrot-kpi/react";
import { Button } from "@carrot-kpi/ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";
import { KPITokenCard } from "../../../components/ui/kpi-token-card";
import { ResponsiveHeader } from "../../../components/ui/responsive-header";

export const LatestCampaignsSection = () => {
    const { loading, kpiTokens } = useKPITokens();
    const { t } = useTranslation();

    return (
        <div className="relative flex flex-col gap-16">
            {/* TODO: add i18n */}
            <ResponsiveHeader autoAlign variant="h2">
                {t("home.latestCampaigns")}
            </ResponsiveHeader>
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
                        <div key={kpiToken.address} className="snap-center">
                            <KPITokenCard kpiToken={kpiToken} />
                        </div>
                    ))
                )}
            </CardHorizontal>
            <Link to="/campaigns">
                <Button>View all campaings</Button>
            </Link>
        </div>
    );
};
