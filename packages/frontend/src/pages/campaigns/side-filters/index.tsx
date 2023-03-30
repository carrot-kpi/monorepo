import React from "react";
import { Button } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import { TemplatesFilter } from "./templates";
import { OraclesFilter } from "./oracles";
import { useTranslation } from "react-i18next";

const campaignsFiltersStyles = cva(
    [
        "absolute lg:relative z-10",
        "shadow md:shadow-none",
        "w-full lg:w-fit",
        "p-12",
        "bg-white dark:bg-black",
        "border-r border-gray-400",
    ],
    {
        variants: {
            open: {
                false: ["hidden"],
            },
        },
    }
);

interface FiltersProps {
    open: boolean;
    toggleFilters: () => void;
    selectedTemplates: Set<string>;
    setSelectedTemplates: (newSelectedTemplates: Set<string>) => void;
    selectedOracles: Set<string>;
    setSelectedOracles: (newSelectedOracles: Set<string>) => void;
}

export const SideFilters = ({
    open,
    toggleFilters,
    selectedTemplates,
    setSelectedTemplates,
    setSelectedOracles,
    selectedOracles,
}: FiltersProps) => {
    const { t } = useTranslation();

    return (
        <div className={campaignsFiltersStyles({ open })}>
            <div className="space-y-6 md:w-64">
                <TemplatesFilter
                    setSelectedTemplates={setSelectedTemplates}
                    selectedTemplates={selectedTemplates}
                />
                <div className="w-full h-0.5 bg-gray-200"></div>
                <OraclesFilter
                    setSelectedOracles={setSelectedOracles}
                    selectedOracles={selectedOracles}
                />
            </div>
            <Button
                className={{
                    root: "w-full p-1 mt-12 md:hidden",
                }}
                onClick={toggleFilters}
            >
                {t("filters.close")}
            </Button>
        </div>
    );
};
