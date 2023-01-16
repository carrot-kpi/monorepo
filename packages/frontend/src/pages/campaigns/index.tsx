import { Title } from "@carrot-kpi/ui";
import React from "react";
import { GridPatternBg } from "../../components/ui/grid-pattern-bg";
import { Hero } from "./hero";
import { AllCampaignsSection } from "./all-campaigns-section";

export const Campaigns = () => {
    return (
        <div>
            <Hero />
            <div className="relative pt-32 dark:bg-black">
                <GridPatternBg bg="white" fullSize />
                <div className="relative">
                    <div className="px-6 md:px-12">
                        <Title size="7xl" className="mb-24">
                            All Campaigns
                        </Title>
                    </div>
                    <AllCampaignsSection />
                </div>
            </div>
        </div>
    );
};
