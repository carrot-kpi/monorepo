import React, { useEffect } from "react";
import { Layout } from "../../components/layout";
import { Hero } from "./hero";
import { LatestCampaignsSection } from "./latest-campaigns-section";
import { TemplatesSection } from "./templates-section";

interface HomeProps {
    templateId?: number;
}

export const Home = ({ templateId }: HomeProps) => {
    useEffect(() => {
        const bodyElement = window.document.getElementById("__app_body");
        if (!bodyElement) return;
        bodyElement.scroll({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    return (
        <Layout>
            <Hero />
            <div className="relative py-16 md:py-20 lg:py-32 bg-grid-light dark:bg-grid-dark dark:bg-black">
                <div className="space-y-32 md:space-y-20 lg:space-y-32">
                    <LatestCampaignsSection />
                    <TemplatesSection templateId={templateId} />
                </div>
            </div>
        </Layout>
    );
};
