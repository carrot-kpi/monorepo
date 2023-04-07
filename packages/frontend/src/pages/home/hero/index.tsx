import { Button, Loader, Typography } from "@carrot-kpi/ui";
import React, { useEffect, useRef } from "react";
import { FeaturedCampaigns } from "../../../components/featured-campaigns";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";
import { DXdaoSideLink } from "./DXdaoSideLink";
import { Link } from "react-router-dom";
import { ReactComponent as Plus } from "../../../assets/plus.svg";
import { useTranslation } from "react-i18next";
import { cva } from "class-variance-authority";
import { CreateCampaignButton } from "../../../components/create-campaign-button";
import { useFeaturedKPITokens } from "../../../hooks/useFeaturedKPITokens";
import { useSelector } from "../../../state/connector";
import { HostState } from "../../../state";

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
    const modalIsOpen = useSelector<HostState>((state) => state.modals.isOpen);

    useEffect(() => {
        if (!videoRef || !videoRef.current) return;
        const currentRef = videoRef.current;
        modalIsOpen ? currentRef.pause() : currentRef.play();
    }, [modalIsOpen]);

    return (
        <div className="relative bg-orange bg-grid-light min-h-[65vh]">
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
                        <video
                            ref={videoRef}
                            className="w-full bg-gray-500 md:w-1/2 aspect-video rounded-xl"
                            autoPlay
                            muted
                            controls
                        >
                            <source
                                src="https://carrot-kpi.dev/hero.mp4"
                                type="video/mp4"
                            />
                            {t("video.notSupported")}
                        </video>
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
                    <CardHorizontal className="px-6 h-96 md:px-10 lg:px-32 dark">
                        <FeaturedCampaigns />
                    </CardHorizontal>
                    <div className="flex flex-col px-6 space-x-0 space-y-4 md:px-10 lg:px-32 md:space-x-8 md:space-y-0 md:flex-row">
                        <Button variant="primary" size="big">
                            <Link to="/campaigns">{t("campaign.all")}</Link>
                        </Button>
                        {!__PREVIEW_MODE__ && <CreateCampaignButton />}
                    </div>
                </div>
            )}
            <div className="absolute invisible left-4 top-1/3 lg:visible ">
                <DXdaoSideLink />
            </div>
            <Plus className={plusIconStyles({ y: "top", x: "left" })} />
            <Plus className={plusIconStyles({ y: "top", x: "right" })} />
            <Plus className={plusIconStyles({ y: "bottom", x: "left" })} />
            <Plus className={plusIconStyles({ y: "bottom", x: "right" })} />
        </div>
    );
};
