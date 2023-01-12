import React from "react";
import { CampaignsFilters } from "../campaigns-filters";
import { TemplatesGrid } from "../templates-grid";
import { TemplatesTopNav } from "./templates-top-nav";

export const AllTemplatesSection = () => {
    return (
        <div>
            <TemplatesTopNav />
            <div className="flex">
                <CampaignsFilters />
                <TemplatesGrid />
            </div>
        </div>
    );
};
