import { Typography } from "@carrot-kpi/ui";
import React from "react";
import { GridPatternBg } from "../../components/ui/grid-pattern-bg";
// import { Hero } from "./hero";
import { AllCampaignsSection } from "./all-campaigns-section";

export const Campaigns = () => {
    return (
        <div>
            {/* <Hero /> */}
            <div className="relative pt-32 dark:bg-black">
                <GridPatternBg bg="white" fullSize />
                <div className="relative">
                    <div className="px-6 mb-24 md:px-12">
                        <Typography variant="h1">All Campaigns</Typography>
                    </div>
                    <AllCampaignsSection />
                </div>
            </div>
        </div>
    );
};
