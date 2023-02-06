import React, { useEffect, useState } from "react";
import { CampaignsFiltersOptions } from "../campaigns-filters-options";
import { CampaignsGrid } from "../campaigns-grid";
import { CampaignsTopNav } from "./campaigns-top-nav";

export const AllCampaignsSection = () => {
    const [filtersOpen, setFilterOpen] = useState(false);

    // set default filter open on tablet and up
    useEffect(() => {
        if (window.innerWidth > 600) {
            setFilterOpen(true);
        }
    }, []);

    const toggleFilters = () => setFilterOpen(!filtersOpen);

    return (
        <div>
            <CampaignsTopNav
                toggleFilters={toggleFilters}
                filtersOpen={filtersOpen}
            />
            <div className="flex">
                <CampaignsFiltersOptions
                    toggleFilters={toggleFilters}
                    filtersOpen={filtersOpen}
                />
                <CampaignsGrid />
            </div>
        </div>
    );
};
