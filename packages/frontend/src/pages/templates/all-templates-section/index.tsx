import React, { useState } from "react";
import { CampaignsFilters } from "../campaigns-filters";
import { TemplatesGrid } from "../templates-grid";
import { TemplatesTopNav } from "./templates-top-nav";

export const AllTemplatesSection = () => {
    const [filtersOpen, setFilterOpen] = useState(true);

    const toggleFilters = () => {
        console.log("filtersOpen:", filtersOpen);
        setFilterOpen(!filtersOpen);
    };

    return (
        <div>
            <TemplatesTopNav toggleFilters={toggleFilters} />
            <div className="flex">
                <CampaignsFilters filtersOpen={filtersOpen} />
                <TemplatesGrid />
            </div>
        </div>
    );
};
