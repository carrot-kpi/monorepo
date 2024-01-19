import React, { type ChangeEvent, useCallback, useState } from "react";
import {
    TextInput,
    type SelectOption,
    ButtonGroup,
    Button,
} from "@carrot-kpi/ui";
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

    const handleOrderingChange = useCallback(
        (value: SelectOption<number>) => {
            onOrderingChange(value);
        },
        [onOrderingChange],
    );

    const handleStateChange = useCallback(
        (value: SelectOption<number>) => {
            onStateChange(value);
        },
        [onStateChange],
    );

    return (
        <div className="flex justify-center px-6 py-6 bg-white border-t border-b border-black md:px-12 dark:bg-black">
            <div className="w-full max-w-screen-2xl flex flex-col items-center justify-between md:flex-row">
                <div className="flex flex-col w-full justify-between md:items-end md:flex-row gap-5">
                    {/* <ToggleFiltersButton
                            active={filtersOpen}
                            toggle={onToggleFilters}
                        /> */}
                    <div className="flex flex-col md:flex-row gap-5">
                        <ButtonGroup
                            size="small"
                            label={t("campaigns.filters.time")}
                        >
                            {sortOptions.map((sortOption) => (
                                <Button
                                    key={sortOption.value}
                                    variant="secondary"
                                    onClick={() =>
                                        handleOrderingChange(sortOption)
                                    }
                                    active={sortOption.value === sort.value}
                                >
                                    {sortOption.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                        <ButtonGroup
                            size="small"
                            label={t("campaigns.filters.status")}
                        >
                            {stateOptions.map((stateOption) => (
                                <Button
                                    key={stateOption.value}
                                    variant="secondary"
                                    onClick={() =>
                                        handleStateChange(stateOption)
                                    }
                                    active={stateOption.value === state.value}
                                >
                                    {stateOption.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </div>
                    <TextInput
                        data-testid="search-bar-field"
                        icon={MagnifyingLens}
                        iconPlacement="left"
                        type="search"
                        placeholder={t("search")}
                        onChange={handleSearchChange}
                        value={searchInputValue}
                        className={{
                            root: "w-full md:w-fit",
                            input: "py-4 w-full",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
