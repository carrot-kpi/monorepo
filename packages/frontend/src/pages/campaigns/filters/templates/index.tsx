import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Checkbox, Typography } from "@carrot-kpi/ui";
import { useKPITokenTemplates } from "@carrot-kpi/react";
import { FiltersLoading } from "./loading";
import { Template } from "@carrot-kpi/sdk";

const CARROT_DEFAULT_TEMPLATE = "ERC20 KPI token";

type CheckboxProp = {
    id: string;
    name: string;
    checked: boolean;
};

type CheckboxesObj = Record<number, CheckboxProp>;

const getDefaultCheckboxes = (templates: Template[]) =>
    templates.reduce<CheckboxesObj>((accumulator, template) => {
        accumulator[template.id] = {
            id: template.id.toString(),
            name: template.specification.name,
            checked: template.specification.name === CARROT_DEFAULT_TEMPLATE,
        };
        return accumulator;
    }, {});

const getDefaultSelectedTemplates = (checkboxes: CheckboxesObj) => {
    const defaultSelectedTemplates = new Set<number>();
    Object.values(checkboxes).forEach((checkbox) => {
        if (checkbox.checked) {
            defaultSelectedTemplates.add(Number(checkbox.id));
        }
    });
    return defaultSelectedTemplates;
};

export const TemplatesFilter = ({
    selectedTemplates,
    setSelectedTemplates,
}: {
    selectedTemplates: Set<number>;
    setSelectedTemplates: (newSelectedTemplates: Set<number>) => void;
}) => {
    const { loading, templates } = useKPITokenTemplates();
    const [checkboxes, setCheckboxes] = useState<CheckboxesObj>({});

    const handleCheckedChange = (e: ChangeEvent<HTMLInputElement>) => {
        const element = e.target;
        const elementId = Number(e.target.id);
        const newCheckboxes = { ...checkboxes };
        newCheckboxes[elementId] = {
            ...newCheckboxes[elementId],
            checked: element.checked,
        };
        setCheckboxes(newCheckboxes);
        const newSelectedTemplates = selectedTemplates;

        if (element.checked === true) newSelectedTemplates.add(elementId);

        if (element.checked === false && selectedTemplates.has(elementId)) {
            newSelectedTemplates.delete(elementId);
        }
        setSelectedTemplates(newSelectedTemplates);
    };

    const initializeCheckboxes = useCallback(() => {
        const hasTemplates = templates.length !== 0;
        const hasCheckboxes = Object.keys(checkboxes).length !== 0;

        if (hasTemplates && !hasCheckboxes) {
            const defaultCheckboxes = getDefaultCheckboxes(templates);
            setCheckboxes(defaultCheckboxes);
            setSelectedTemplates(
                getDefaultSelectedTemplates(defaultCheckboxes)
            );
        }
    }, [checkboxes, templates, setSelectedTemplates]);

    useEffect(() => {
        initializeCheckboxes();
    }, [initializeCheckboxes]);

    return (
        <div className="w-full">
            <Typography variant="lg" weight="medium" uppercase>
                Templates
            </Typography>
            <div className="py-6 space-y-4 border-gray-400">
                {loading ? (
                    <FiltersLoading />
                ) : (
                    Object.values(checkboxes).map((checkbox) => {
                        return (
                            <Checkbox
                                onChange={handleCheckedChange}
                                key={checkbox.id}
                                id={checkbox.id}
                                label={checkbox.name}
                                checked={checkbox.checked}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};
