import React from "react";
import { Layout } from "../../components/layout";
import { GridPatternBg } from "../../components/ui/grid-pattern-bg";
import { Hero } from "./hero";
import { LatestCampaignsSection } from "./latest-campaigns-section";
import { TemplatesSection } from "./templates-section";

interface HomeProps {
    templateId?: number;
}

export const Home = ({ templateId }: HomeProps) => {
    return (
        <Layout>
            <Hero />
            <div className="relative py-16 md:py-20 lg:py-32 dark:bg-black">
                <GridPatternBg fullSize />
                <div className="space-y-32 md:space-y-20 lg:space-y-32">
                    <LatestCampaignsSection />
                    <TemplatesSection templateId={templateId} />
                </div>
            </div>
        </Layout>
    );
};
