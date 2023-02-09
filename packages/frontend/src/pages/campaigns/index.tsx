import React from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../../components/layout";
import { GridPatternBg } from "../../components/ui/grid-pattern-bg";
import { ResponsiveHeader } from "../../components/ui/responsive-header";
import { AllCampaignsSection } from "./all-campaigns-section";

export const Campaigns = () => {
    const { t } = useTranslation();

    return (
        <Layout>
            <div className="relative pt-32 dark:bg-black">
                <GridPatternBg fullSize />
                <div className="relative">
                    <div className="px-6 mb-24 md:px-12">
                        <ResponsiveHeader autoAlign variant="h1">
                            {t("campaign.all")}
                        </ResponsiveHeader>
                    </div>
                    <AllCampaignsSection />
                </div>
            </div>
        </Layout>
    );
};
