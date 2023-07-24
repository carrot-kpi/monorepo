import React, { type ChangeEvent, useCallback, useState } from "react";
import { TextInput, Select, type SelectOption } from "@carrot-kpi/ui";
// import { ToggleFiltersButton } from "./toggle-filters-button";
import MagnifyingLens from "../../../icons/magnifying-lens";
import { t } from "i18next";

interface CampaignsTopNavProps {
    sort: SelectOption<number>;
    sortOptions: SelectOption<number>[];
    onOrderingChange: (option: SelectOption<number>) => void;
    state: SelectOption<number>;
    stateOptions: SelectOption<number>[];
    onStateChange: (option: SelectOption<number>) => void;
    onToggleFilters: () => void;
    filtersOpen: boolean;
    setSearchQuery: (searchQuery: string) => void;
}

export const CampaignsTopNav = ({
    sort,
    sortOptions,
    onOrderingChange,
    state,
    stateOptions,
    onStateChange,
    // onToggleFilters,
    // filtersOpen,
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
        [setSearchQuery],
    );

    return (
        <div className="flex px-6 py-6 bg-white border-t border-b border-black md:px-12 dark:bg-black">
            <div className="flex flex-col items-center justify-between w-full md:flex-row">
                <div className="flex flex-col w-full gap-5 md:flex-row">
                    <div className="flex gap-5">
                        {/* <ToggleFiltersButton
                            active={filtersOpen}
                            toggle={onToggleFilters}
                        /> */}
                        <Select
                            label=""
                            onChange={onOrderingChange}
                            options={sortOptions}
                            placeholder="Latest"
                            value={sort}
                            className={{
                                root: "w-full",
                                wrapper: "w-full",
                                input: "w-full",
                            }}
                        />
                    </div>
                    <Select
                        label=""
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
                    <TextInput
                        icon={MagnifyingLens}
                        iconPlacement="left"
                        type="search"
                        placeholder={t("search")}
                        onChange={handleSearchChange}
                        value={searchInputValue}
                    />
                </div>
            </div>
        </div>
    );
};
