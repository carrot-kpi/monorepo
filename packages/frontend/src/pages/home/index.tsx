import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { Hero } from "./hero";
import { LatestCampaignsSection } from "./latest-campaigns-section";
import { TemplatesSection } from "./templates-section";
import { useFeaturedKPITokens } from "../../hooks/useFeaturedKPITokens";
import { CarrotMarquee } from "../../components/ui/carrot-marquee";
import { useDebounce } from "react-use";
import { useFeaturedBlacklistedKPITokenAddresses } from "../../hooks/useFeaturedBlacklistedKPITokenAddresses";
import {
    useTransition,
    config as springConfig,
    animated,
} from "@react-spring/web";
import Loader from "../../icons/loader";

interface HomeProps {
    templateId?: number;
}

export const Home = ({ templateId }: HomeProps) => {
    const {
        isLoading: loadingFeaturedBlacklistedKPITokenAddresses,
        data: featuredBlacklistedKPITokenAddresses,
    } = useFeaturedBlacklistedKPITokenAddresses();
    const { isLoading: loadingFeaturedKPITokens, data: featuredKPITokens } =
        useFeaturedKPITokens(featuredBlacklistedKPITokenAddresses);

    const [debouncedLoading, setDebouncedLoading] = useState(
        loadingFeaturedBlacklistedKPITokenAddresses || loadingFeaturedKPITokens,
    );

    const transition = useTransition(debouncedLoading, {
        config: { ...springConfig.default, duration: 100 },
        from: { opacity: 1 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    useDebounce(
        () => {
            setDebouncedLoading(
                loadingFeaturedBlacklistedKPITokenAddresses ||
                    loadingFeaturedKPITokens,
            );
        },
        500,
        [loadingFeaturedBlacklistedKPITokenAddresses, loadingFeaturedKPITokens],
    );

    useEffect(() => {
        const bodyElement = window.document.getElementById("__app_body");
        if (!bodyElement) return;
        bodyElement.scroll({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    return (
        <>
            {transition((style, show) => {
                return (
                    show && (
                        <animated.div
                            style={style}
                            className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-grid-dark bg-left-top z-10"
                        >
                            <Loader className="w-36 h-36 animate-pulse text-orange" />
                        </animated.div>
                    )
                );
            })}
            <Layout noNavbar>
                <Hero featuredKPITokens={featuredKPITokens || []} />
                <CarrotMarquee />
                <div className="relative py-16 md:py-20 lg:py-32 dark:bg-black">
                    <div className="space-y-32 md:space-y-20 lg:space-y-32 flex flex-col items-center mx-6 md:mx-10 lg:mx-32">
                        <LatestCampaignsSection
                            featuredBlacklistedKPITokenAddresses={
                                featuredBlacklistedKPITokenAddresses
                            }
                        />
                        <TemplatesSection templateId={templateId} />
                    </div>
                </div>
            </Layout>
        </>
    );
};
