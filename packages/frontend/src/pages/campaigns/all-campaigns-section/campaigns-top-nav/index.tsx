import { Select, SelectOption } from "@carrot-kpi/ui";
import React, { useState } from "react";
import { ToggleIconButton } from "../../campaigns-filters/toggle-icon-button";
import { ToggleFiltersButton } from "./toggle-filters-button";

interface CampaignsTopNavProps {
    toggleFilters: () => void;
    filtersOpen: boolean;
}

export const CampaignsTopNav = ({
    toggleFilters,
    filtersOpen,
}: CampaignsTopNavProps) => {
    const [campaignsOrder, setCampaignsOrder] = useState<SelectOption>({
        value: 1,
        label: "Latest",
    });
    const [campaignsState, setCampaignState] = useState<SelectOption>({
        value: 1,
        label: "Active",
    });

    return (
        <div className="flex px-6 py-6 bg-white border-t border-b border-gray-400 md:px-12 dark:bg-black">
            <div className="flex flex-col items-center justify-between w-full md:flex-row">
                <div className="flex flex-col w-full gap-5 mb-5 md:mb-0 md:flex-row">
                    <div className="flex gap-5">
                        <ToggleFiltersButton
                            toggle={toggleFilters}
                            active={filtersOpen}
                        />
                        <Select
                            fullWidth
                            label=""
                            id="campaigns-filter-order"
                            onChange={setCampaignsOrder}
                            options={[
                                {
                                    label: "Latest",
                                    value: 1,
                                },
                                {
                                    label: "Newest",
                                    value: 2,
                                },
                            ]}
                            placeholder="Latest"
                            value={campaignsOrder}
                        />
                    </div>
                    <div className="flex flex-row-reverse gap-5 md:flex-row">
                        <Select
                            fullWidth
                            label=""
                            id="campaigns-filter-state"
                            onChange={setCampaignState}
                            options={[
                                {
                                    label: "Active",
                                    value: 1,
                                },
                                {
                                    label: "Inactive",
                                    value: 2,
                                },
                            ]}
                            placeholder="Latest"
                            value={campaignsState}
                        />
                        <ToggleIconButton
                            toggle={() => console.log("Toggled MY")}
                            active={false}
                        >
                            MY
                        </ToggleIconButton>
                    </div>
                </div>
                <input
                    type="search"
                    className="w-full p-2 border rounded md:w-auto"
                    placeholder="Search by name"
                />
            </div>
        </div>
    );
};
