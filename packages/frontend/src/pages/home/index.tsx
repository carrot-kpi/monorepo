import React from "react";
import { GridPatternBg } from "../../components/ui/grid-pattern-bg";
import { PageWrapper } from "../../components/ui/page-wrapper";
import { Hero } from "./hero";
import { LatestCampaignsSection } from "./latest-campaigns-section";
import { TemplatesSection } from "./templates-section";

export const Home = () => {
    return (
        <>
            <Hero />
            <div className="relative py-32 dark:bg-black">
                <GridPatternBg bg="white" fullSize />
                <PageWrapper className="space-y-32">
                    <LatestCampaignsSection />
                    <TemplatesSection />
                </PageWrapper>
            </div>
        </>
    );
};
