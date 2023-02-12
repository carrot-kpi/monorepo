import { SearchInput } from "@carrot-kpi/ui";
import { Select, SelectOption } from "@carrot-kpi/ui";
import React /* , { ChangeEvent } */ from "react";
import { ToggleFiltersButton } from "./toggle-filters-button";

interface CampaignsTopNavProps {
    ordering: SelectOption;
    orderingOptions: SelectOption[];
    onOrderingChange: (option: SelectOption) => void;
    state: SelectOption;
    stateOptions: SelectOption[];
    onStateChange: (option: SelectOption) => void;
    onToggleFilters: () => void;
    filtersOpen: boolean;
    // onSearchQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CampaignsTopNav = ({
    ordering,
    orderingOptions,
    onOrderingChange,
    state,
    stateOptions,
    onStateChange,
    onToggleFilters,
    filtersOpen,
}: // onSearchQueryChange,
CampaignsTopNavProps) => {
    return (
        <div className="flex px-6 py-6 bg-white border-t border-b border-gray-400 md:px-12 dark:bg-black">
            <div className="flex flex-col items-center justify-between w-full md:flex-row">
                <div className="flex flex-col w-full gap-5 mb-5 md:mb-0 md:flex-row">
                    <div className="flex gap-5">
                        <ToggleFiltersButton
                            active={filtersOpen}
                            toggle={onToggleFilters}
                        />
                        <Select
                            label=""
                            id="campaigns-filter-order"
                            onChange={onOrderingChange}
                            options={orderingOptions}
                            placeholder="Latest"
                            value={ordering}
                            className={{ root: "w-full", input: "w-full" }}
                        />
                    </div>
                    <div className="flex flex-row-reverse gap-5 md:flex-row">
                        <Select
                            label=""
                            id="campaigns-filter-state"
                            onChange={onStateChange}
                            options={stateOptions}
                            placeholder="Latest"
                            value={state}
                            className={{ root: "w-full", input: "w-full" }}
                        />
                    </div>
                </div>
                <SearchInput
                    id="search-input-campaigns"
                    onChange={() => {
                        // avoid linting error
                    }}
                />
            </div>
        </div>
    );
};