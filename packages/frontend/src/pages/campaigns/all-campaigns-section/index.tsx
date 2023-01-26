import React, { useState } from "react";
import { CampaignsFilters } from "../campaigns-filters";
import { CampaignsGrid } from "../campaigns-grid";
import { CampaignsTopNav } from "./campaigns-top-nav";

export const AllCampaignsSection = () => {
    const [filtersOpen, setFilterOpen] = useState(true);

    const toggleFilters = () => setFilterOpen(!filtersOpen);

    return (
        <div>
            <CampaignsTopNav toggleFilters={toggleFilters} />
            <div className="flex">
                <CampaignsFilters filtersOpen={filtersOpen} />
                <CampaignsGrid />
            </div>
        </div>
    );
};
