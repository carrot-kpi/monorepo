import { Button, Loader, Typography } from "@carrot-kpi/ui";
import React, { useEffect, useRef } from "react";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";
import { Link } from "react-router-dom";
import Plus from "../../../icons/plus";
import { useTranslation } from "react-i18next";
import { cva } from "class-variance-authority";
import { CreateCampaignButton } from "../../../components/create-campaign-button";
import { useFeaturedKPITokens } from "../../../hooks/useFeaturedKPITokens";
import { useSelector } from "../../../state/connector";
import type { HostState } from "../../../state";
import { KPITokenCard } from "../../../components/ui/kpi-token-card";

const plusIconStyles = cva(["invisible", "md:visible", "absolute"], {
    variants: {
        x: {
            left: ["left-4"],
            right: ["right-4"],
        },
        y: {
            top: ["top-10"],
            middle: ["top-1/3"],
            bottom: ["bottom-10"],
        },
    },
});

export const Hero = () => {
    const { t } = useTranslation();
    const { loading, kpiTokens } = useFeaturedKPITokens();
    const videoRef = useRef<HTMLVideoElement>(null);
    const modalOpen = useSelector<HostState>((state) => state.modals.open);

    useEffect(() => {
        if (!videoRef || !videoRef.current) return;
        const currentRef = videoRef.current;
        if (modalOpen) currentRef.pause();
    }, [modalOpen]);

    return (
        <div className="relative bg-orange bg-grid-light">
            {loading ? (
                <div className="flex items-center justify-center w-full h-full">
                    <Loader />
                </div>
            ) : kpiTokens.length === 0 ? (
                <div className="relative px-6 pb-16 space-y-12 md:px-14 lg:px-36 pt-7 md:pt-24 md:pb-32">
                    <div className="flex flex-col items-center justify-around gap-10 md:flex-row md:gap-0">
                        <div className="flex flex-col items-center w-full gap-10 md:items-start md:w-2/5">
                            <Typography variant="h1">
                                {t("home.noFeatured.title")}
                            </Typography>
                            <Typography>
                                {t("home.noFeatured.description")}
                            </Typography>
                            <CreateCampaignButton primary />
                        </div>
                        <div className="w-full md:w-1/2 aspect-video rounded-xl bg-gray-500">
                            <video
                                ref={videoRef}
                                controls
                                className="w-full h-full rounded-xl"
                            >
                                <source
                                    src="https://d2l3j8l4t44bvz.cloudfront.net/hero-video.webm"
                                    type="video/webm"
                                />
                                <source
                                    src="https://d2l3j8l4t44bvz.cloudfront.net/hero-video.mp4"
                                    type="video/mp4"
                                />
                                {t("video.notSupported")}
                            </video>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative pb-16 space-y-12 pt-7 md:pt-24 md:pb-32">
                    <Typography
                        variant="h1"
                        className={{
                            root: "px-6 md:px-10 lg:px-32 dark:text-black",
                        }}
                    >
                        {t("home.featuredCampaigns")}
                    </Typography>
                    <CardHorizontal className="h-96 px-6 md:px-10 lg:px-32 dark">
                        {kpiTokens.map((kpiToken) => (
                            <KPITokenCard
                                key={kpiToken.address}
                                kpiToken={kpiToken}
                                noBorder
                            />
                        ))}
                    </CardHorizontal>
                    <div className="flex flex-col px-6 space-x-0 space-y-4 md:px-10 lg:px-32 md:space-x-8 md:space-y-0 md:flex-row">
                        <Button variant="primary" size="big">
                            <Link to="/campaigns">{t("campaign.all")}</Link>
                        </Button>
                        {!__LIBRARY_MODE__ && <CreateCampaignButton />}
                    </div>
                </div>
            )}
            <Plus className={plusIconStyles({ y: "top", x: "left" })} />
            <Plus className={plusIconStyles({ y: "top", x: "right" })} />
            <Plus className={plusIconStyles({ y: "bottom", x: "left" })} />
            <Plus className={plusIconStyles({ y: "bottom", x: "right" })} />
        </div>
    );
};
