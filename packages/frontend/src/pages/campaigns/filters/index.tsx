import React from "react";
import { Button } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import { TemplatesFilter } from "./templates";

const campaignsFiltersStyles = cva(
    [
        "absolute lg:relative",
        "shadow md:shadow-none",
        "w-full lg:w-fit",
        "p-12",
        "bg-white",
        "border-r border-gray-400 dark:bg-black",
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
    selectedTemplates: Set<number>;
    setSelectedTemplates: (newSelectedTemplates: Set<number>) => void;
}

export const Filters = ({
    open,
    toggleFilters,
    selectedTemplates,
    setSelectedTemplates,
}: FiltersProps) => (
    <div className={campaignsFiltersStyles({ open })}>
        <div className="space-y-6 md:w-64">
            <TemplatesFilter
                setSelectedTemplates={setSelectedTemplates}
                selectedTemplates={selectedTemplates}
            />
        </div>
        <Button
            className={{
                root: "w-full p-1 mt-12 md:hidden",
            }}
            onClick={toggleFilters}
        >
            Close filters
        </Button>
    </div>
);
