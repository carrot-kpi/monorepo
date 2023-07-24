import React from "react";
import { Button } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import { TemplatesFilter } from "./templates";
import { OraclesFilter } from "./oracles";
import { useTranslation } from "react-i18next";

const campaignsFiltersStyles = cva(
    [
        "z-10",
        "absolute lg:relative",
        "shadow md:shadow-none",
        "w-full lg:w-fit",
        "py-12",
        "bg-white dark:bg-black",
        "border-b md:border-r border-black",
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
            <div className="space-y-6 min-w-max">
                <div className="px-12">
                    <TemplatesFilter
                        setSelectedTemplates={setSelectedTemplates}
                        selectedTemplates={selectedTemplates}
                    />
                </div>
                <div className="w-full h-px bg-black"></div>
                <div className="px-12">
                    <OraclesFilter
                        setSelectedOracles={setSelectedOracles}
                        selectedOracles={selectedOracles}
                    />
                </div>
            </div>
            <Button
                className={{
                    root: "w-full p-1 mt-12 md:hidden",
                }}
                onClick={toggleFilters}
            >
                {t("sideFilters.close")}
            </Button>
        </div>
    );
};
