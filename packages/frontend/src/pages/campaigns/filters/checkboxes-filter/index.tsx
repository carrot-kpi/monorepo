import { Template } from "@carrot-kpi/sdk";
import { Checkbox, Typography } from "@carrot-kpi/ui";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FiltersLoading } from "../loading";
import {
    CheckboxesObj,
    generateGroupId,
    getDefaultCheckboxes,
    getDefaultSelected,
} from "../utils";

interface CheckboxesFilterProps {
    items: Template[];
    groupId: string;
    title: string;
    loading: boolean;
    selected: Set<number>;
    setSelected: (newSelected: Set<number>) => void;
    defaultChecked: (item: Template) => boolean;
}

export const CheckboxesFilter = ({
    items,
    title,
    loading,
    selected,
    setSelected,
    defaultChecked,
    groupId,
}: CheckboxesFilterProps) => {
    const [checkboxes, setCheckboxes] = useState<CheckboxesObj>({});

    const initializeCheckboxes = useCallback(() => {
        const hasItems = items.length !== 0;
        const hasCheckboxes = Object.keys(checkboxes).length !== 0;

        if (hasItems && !hasCheckboxes) {
            const defaultCheckboxes = getDefaultCheckboxes(
                items,
                defaultChecked
            );
            setCheckboxes(defaultCheckboxes);
            setSelected(getDefaultSelected(defaultCheckboxes));
        }
    }, [checkboxes, defaultChecked, items, setSelected]);

    const handleCheckedChange = (e: ChangeEvent<HTMLInputElement>) => {
        const element = e.target;
        const elementId = Number(e.target.getAttribute("data-id"));

        const newCheckboxes = { ...checkboxes };
        newCheckboxes[elementId] = {
            ...newCheckboxes[elementId],
            checked: element.checked,
        };
        setCheckboxes(newCheckboxes);

        const newSelected = selected;

        if (element.checked === true) newSelected.add(elementId);
        if (element.checked === false && selected.has(elementId))
            newSelected.delete(elementId);

        setSelected(newSelected);
    };

    useEffect(() => {
        initializeCheckboxes();
    }, [initializeCheckboxes]);

    return (
        <div className="w-full">
            <Typography variant="lg" weight="medium" uppercase>
                {title}
            </Typography>
            <div className="py-6 space-y-4 border-gray-400">
                {loading ? (
                    <FiltersLoading />
                ) : (
                    Object.values(checkboxes).map((checkbox) => {
                        return (
                            <Checkbox
                                key={checkbox.id}
                                onChange={handleCheckedChange}
                                id={generateGroupId(groupId, checkbox.id)}
                                label={checkbox.name}
                                checked={checkbox.checked}
                                data-id={checkbox.id}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};
