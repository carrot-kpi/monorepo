import React, { ChangeEvent, useCallback, useState } from "react";
import { TextInput, Select, SelectOption } from "@carrot-kpi/ui";
import { ToggleFiltersButton } from "./toggle-filters-button";
import { ReactComponent as MagnifyingLens } from "../../../assets/magnifying-lens.svg";
import { t } from "i18next";

interface CampaignsTopNavProps {
    ordering: SelectOption;
    orderingOptions: SelectOption[];
    onOrderingChange: (option: SelectOption) => void;
    state: SelectOption;
    stateOptions: SelectOption[];
    onStateChange: (option: SelectOption) => void;
    onToggleFilters: () => void;
    filtersOpen: boolean;
    setSearchQuery: (searchQuery: string) => void;
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
    setSearchQuery,
}: CampaignsTopNavProps) => {
    const [searchInputValue, setSearchInputValue] = useState<
        string | undefined
    >();

    const handleSearchChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            const inputValue = event.target.value;
            setSearchQuery(inputValue);
            setSearchInputValue(inputValue);
        },
        [setSearchQuery]
    );

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
                            className={{
                                root: "w-full",
                                wrapper: "w-full",
                                input: "w-full",
                            }}
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
                            className={{
                                root: "w-full",
                                wrapper: "w-full",
                                input: "w-full",
                            }}
                        />
                    </div>
                </div>
                <TextInput
                    icon={MagnifyingLens}
                    iconPlacement="left"
                    type="search"
                    placeholder={t("search")}
                    id="search-input-campaigns"
                    onChange={handleSearchChange}
                    value={searchInputValue}
                />
            </div>
        </div>
    );
};
