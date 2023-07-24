import { ResolvedTemplate } from "@carrot-kpi/sdk";
import { Checkbox, Typography } from "@carrot-kpi/ui";
import React, { type ChangeEvent } from "react";
import { FiltersLoading } from "../loading";

interface CheckboxesFilterProps {
    items: ResolvedTemplate[] | null;
    groupId: string;
    title: string;
    loading: boolean;
    selected: Set<string>;
    setSelected: (newSelected: Set<string>) => void;
}

export const CheckboxesFilter = ({
    items,
    title,
    loading,
    selected,
    setSelected,
    groupId,
}: CheckboxesFilterProps) => {
    const handleCheckedChange = (e: ChangeEvent<HTMLInputElement>) => {
        const elementAddress = e.target.dataset.address;
        if (!elementAddress) return;

        const newSelected = selected;
        if (e.target.checked) newSelected.add(elementAddress);
        else if (selected.has(elementAddress))
            newSelected.delete(elementAddress);

        setSelected(newSelected);
    };

    return (
        <div className="w-full">
            <Typography variant="lg" weight="medium" uppercase>
                {title}
            </Typography>
            <div className="py-6 space-y-4 border-black">
                {loading ? (
                    <FiltersLoading />
                ) : (
                    items &&
                    items.map((item) => {
                        return (
                            <Checkbox
                                key={`${groupId}-${item.id}`}
                                label={item.specification.name}
                                checked={selected.has(item.address)}
                                data-address={item.address}
                                onChange={handleCheckedChange}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};
