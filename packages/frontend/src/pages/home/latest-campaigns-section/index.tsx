import { Button, Typography } from "@carrot-kpi/ui";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";
import { Empty } from "../../../components/ui/empty";
import { KPITokenCard } from "../../../components/ui/kpi-token-card";
import { useLatestKPITokens } from "../../../hooks/useLatestKPITokens";
import {
    ChainId,
    type FeaturedBlacklistedKPITokens,
    type FeaturedBlacklistedKPITokensInChain,
} from "@carrot-kpi/sdk";
import { useChainId, usePublicClient } from "wagmi";
import { usePreferDecentralization } from "@carrot-kpi/react";

const LATEST_TOKEN_AMOUNTS = 5;

const placeholder = new Array(LATEST_TOKEN_AMOUNTS)
    .fill(null)
    .map((_, index) => <KPITokenCard key={index} />);

interface LatestCampaignsSectionProps {
    featuredBlacklistedKPITokenAddresses?: FeaturedBlacklistedKPITokens;
}

export const LatestCampaignsSection = ({
    featuredBlacklistedKPITokenAddresses,
}: LatestCampaignsSectionProps) => {
    const { t } = useTranslation();
    const publicClient = usePublicClient();
    const preferDecentralization = usePreferDecentralization();
    const chainId = useChainId();
    const [
        featuredBlacklistedKPITokensInChain,
        setFeaturedBlacklistedKPITokensInChain,
    ] = useState<FeaturedBlacklistedKPITokensInChain | null>(null);

    const { isLoading: loading, data: kpiTokens } = useLatestKPITokens({
        publicClient,
        preferDecentralization,
        blacklistedAddresses: featuredBlacklistedKPITokensInChain?.blacklisted,
        limit: LATEST_TOKEN_AMOUNTS,
    });

    useEffect(() => {
        if (!featuredBlacklistedKPITokenAddresses || !(chainId in ChainId))
            return;
        setFeaturedBlacklistedKPITokensInChain(
            featuredBlacklistedKPITokenAddresses[chainId as ChainId],
        );
    }, [chainId, featuredBlacklistedKPITokenAddresses]);

    return (
        <div className="w-full max-w-screen-2xl relative flex flex-col gap-16">
            <Typography variant="h1">{t("home.latestCampaigns")}</Typography>
            <CardHorizontal className="h-96">
                {loading || !kpiTokens ? (
                    placeholder
                ) : Object.values(kpiTokens).length > 0 ? (
                    Object.values(kpiTokens).map((kpiToken) => (
                        <KPITokenCard
                            key={kpiToken.address}
                            kpiToken={kpiToken}
                        />
                    ))
                ) : (
                    <div className="w-full flex justify-center">
                        <Empty vertical />
                    </div>
                )}
            </CardHorizontal>
            <div className="w-fit">
                <Link to="/campaigns">
                    <Button>{t("home.allCampaigns")}</Button>
                </Link>
            </div>
        </div>
    );
};
