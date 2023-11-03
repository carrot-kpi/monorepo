import { Button } from "@carrot-kpi/ui";
import React from "react";
import Filters from "../../../icons/filters";

interface ToggleButtonProps {
    toggle: () => void;
    active: boolean;
}

export const ToggleFiltersButton = ({ toggle, active }: ToggleButtonProps) => (
    <Button
        variant="secondary"
        onClick={toggle}
        size="xsmall"
        icon={Filters}
        active={active}
    />
);
