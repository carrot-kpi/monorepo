import { Button, Loader, Typography } from "@carrot-kpi/ui";
import React from "react";
import { FeaturedCampaigns } from "../../../components/featured-campaigns";
import { CardHorizontal } from "../../../components/ui/cards-horizontal";
import { DXdaoSideLink } from "./DXdaoSideLink";
import { Link } from "react-router-dom";
import { ReactComponent as Plus } from "../../../assets/plus.svg";
import { useTranslation } from "react-i18next";
import { cva } from "class-variance-authority";
import { CreateCampaignButton } from "../../../components/create-campaign-button";
import { useFeaturedKPITokens } from "../../../hooks/useFeaturedKPITokens";

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

    return (
        <div className="relative bg-orange bg-grid-light min-h-[65vh]">
            {loading ? (
                <div className="flex justify-center items-center w-full h-full">
                    <Loader />
                </div>
            ) : kpiTokens.length === 0 ? (
                <div className="px-6 md:px-14 lg:px-36 relative space-y-12 pt-7 pb-16 md:pt-24 md:pb-32">
                    <div className="flex flex-col md:flex-row justify-around items-center gap-10 md:gap-0">
                        <div className="flex flex-col items-center md:items-start gap-10 w-full md:w-2/5">
                            <Typography variant="h1">
                                {t("home.noFeatured.title")}
                            </Typography>
                            <Typography>
                                {t("home.noFeatured.description")}
                            </Typography>
                            <CreateCampaignButton primary />
                        </div>
                        <video
                            className="w-full md:w-1/2 aspect-video rounded-xl bg-gray-500"
                            autoPlay
                            loop
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
                <div className="relative space-y-12 pt-7 pb-16 md:pt-24 md:pb-32">
                    <Typography
                        variant="h1"
                        className={{
                            root: "px-6 md:px-10 lg:px-32 dark:text-black",
                        }}
                    >
                        {t("home.featuredCampaigns")}
                    </Typography>
                    <CardHorizontal className="h-96 px-6 md:px-10 lg:px-32 dark">
                        <FeaturedCampaigns />
                    </CardHorizontal>
                    <div className="px-6 md:px-10 lg:px-32 flex flex-col space-x-0 md:space-x-8 space-y-4 md:space-y-0 md:flex-row">
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
