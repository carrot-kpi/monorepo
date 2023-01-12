import { Title } from "@carrot-kpi/ui";
import React from "react";
import { GridPatternBg } from "../../components/ui/grid-pattern-bg";
import { Hero } from "./hero";
import { AllTemplatesSection } from "./all-templates-section";

export const Templates = () => {
    return (
        <div>
            <Hero />
            <div className="relative pt-32 dark:bg-black">
                <GridPatternBg bg="white" fullSize />
                <div className="relative">
                    <div className="px-6 md:px-12">
                        <Title size="7xl" className="mb-24">
                            Template in use
                        </Title>
                    </div>
                    <AllTemplatesSection />
                </div>
            </div>
        </div>
    );
};
