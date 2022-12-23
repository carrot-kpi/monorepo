import { Button, Title } from "@carrot-kpi/ui";
import React from "react";
import { FeaturedTemplates } from "../../../components/featured-templates";

export const TemplatesSection = () => {
    return (
        <div className="relative space-y-16">
            <Title size="6xl">Templates</Title>
            <FeaturedTemplates />
            <Button>Create campaign</Button>
        </div>
    );
};
