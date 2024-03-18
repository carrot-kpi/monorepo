import { Button, Typography } from "@carrot-kpi/ui";
import React /* , { useCallback, useEffect, useRef, useState } */ from "react";
import { CardHorizontal } from "../../components/ui/cards-horizontal";
import { Link } from "react-router-dom";
import Plus from "../../icons/plus";
import { useTranslation } from "react-i18next";
import { cva } from "class-variance-authority";
import { CreateCampaignButton } from "../../components/create-campaign-button";
// import { useSelector } from "../../state/hooks";
// import type { HostState } from "../../state";
import { KPITokenCard } from "../../components/ui/kpi-token-card";
import { NAVBAR_LINKS } from "../../constants";
// import PlayVideo from "../../icons/play-video";
import VideoPoster from "../../images/video-poster.png";
import type { KPIToken } from "@carrot-kpi/sdk";
import { Navbar } from "../../components/ui/navbar";
import { Environment } from "@carrot-kpi/shared-state";

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

export interface HeroProps {
    featuredKPITokens: KPIToken[];
}

export const Hero = ({ featuredKPITokens }: HeroProps) => {
    const { t } = useTranslation();
    // const videoRef = useRef<HTMLVideoElement>(null);
    // const modalOpen = useSelector<HostState>((state) => state.modals.open);

    // const [showVideo, setShowVideo] = useState(false);

    // const handleClick = useCallback(() => {
    //     setShowVideo(true);
    //     if (!videoRef || !videoRef.current) return;
    //     videoRef.current.play();
    // }, []);

    // const handleDismiss = useCallback(() => {
    //     setShowVideo(false);
    //     if (!videoRef || !videoRef.current) return;
    //     videoRef.current.pause();
    //     setTimeout(() => {
    //         if (!videoRef || !videoRef.current) return;
    //         videoRef.current.currentTime = 0;
    //     }, 300);
    // }, []);

    // useEffect(() => {
    //     if (!videoRef || !videoRef.current) return;
    //     if (modalOpen) videoRef.current.pause();
    // }, [modalOpen]);

    return (
        <div className="flex flex-col items-center bg-orange bg-grid-light dark:bg-grid-dark bg-left-top">
            <div className="w-full">
                <Navbar bgColor="orange" links={NAVBAR_LINKS} />
            </div>
            <div className="w-full relative">
                {featuredKPITokens.length === 0 ? (
                    <div className="px-4 md:px-10 lg:px-14 xl:px-40 pb-6 w-full flex justify-center">
                        <div className="w-full max-w-screen-2xl flex flex-col items-center lg:flex-row lg:justify-center gap-20 md:gap-36 pb-16 pt-7 md:pt-24 md:pb-32">
                            <div className="flex flex-col gap-10 flex-1 w-full max-w-xl lg:max-w-none">
                                <Typography
                                    data-testid="hero-section-title-text"
                                    variant="h1"
                                    className={{
                                        root: "text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]",
                                    }}
                                >
                                    {t("home.noFeatured.title")}
                                </Typography>
                                <div className="flex flex-col gap-14">
                                    <Typography
                                        data-testid="hero-section-description-text"
                                        variant="lg"
                                        data-aos="fade-up"
                                    >
                                        {t("home.noFeatured.description")}
                                    </Typography>
                                    <CreateCampaignButton primary />
                                </div>
                            </div>
                            <div
                                className="flex-1 flex justify-center max-w-xl w-full md:max-w-lg lg:w-60 aspect-9/12 relative"
                                data-aos="fade-up"
                            >
                                <img
                                    className="border border-black rounded-xl"
                                    src={VideoPoster}
                                    alt="poster"
                                />
                                {/* <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                                    <Button
                                        data-testid="how-it-works-button"
                                        onClick={handleClick}
                                        className={{
                                            contentWrapper:
                                                "flex gap-3 items-center whitespace-nowrap",
                                        }}
                                        size="small"
                                    >
                                        <PlayVideo />
                                        How it works
                                    </Button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mb-16 space-y-12 mt-7 md:mt-24 md:mb-32">
                        <div className="w-[100px] md:w-full">
                            <Typography
                                variant="h1"
                                className={{
                                    root: "px-6 md:px-10 lg:px-32 dark:text-black",
                                }}
                            >
                                {t("home.featuredCampaigns")}
                            </Typography>
                        </div>
                        <CardHorizontal className="h-96 px-6 md:px-10 lg:px-32 dark">
                            {featuredKPITokens.map((kpiToken) => (
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
                            {__ENVIRONMENT__ !== Environment.Local && (
                                <CreateCampaignButton />
                            )}
                        </div>
                    </div>
                )}
                <Plus className={plusIconStyles({ y: "top", x: "left" })} />
                <Plus className={plusIconStyles({ y: "top", x: "right" })} />
                <Plus className={plusIconStyles({ y: "bottom", x: "left" })} />
                <Plus className={plusIconStyles({ y: "bottom", x: "right" })} />
            </div>
        </div>
    );
};
