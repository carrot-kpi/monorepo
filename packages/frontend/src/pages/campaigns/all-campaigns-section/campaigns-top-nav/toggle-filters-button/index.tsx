import { Button } from "@carrot-kpi/ui";
import React from "react";
import { ReactComponent as FiltersIcon } from "../../../../../assets/filters-icon.svg";

interface ToggleButtonProps {
    toggle: () => void;
    active: boolean;
}

export const ToggleFiltersButton = ({ toggle, active }: ToggleButtonProps) => (
    <Button
        variant="secondary"
        onClick={toggle}
        size="xsmall"
        icon={FiltersIcon}
        active={active}
    />
);
