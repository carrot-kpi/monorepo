import { Template } from "@carrot-kpi/sdk";

export const CARROT_DEFAULT_TEMPLATE_ID = 1;
export const CARROT_DEFAULT_ORACLE_TEMPLATE = 1;

type CheckboxProp = {
    id: number;
    name: string;
    checked: boolean;
};

export type CheckboxesObj = Record<number, CheckboxProp>;

export const generateGroupId = (group: string, id: number | string) =>
    `${group}-${id}`;

export const getDefaultCheckboxes = (
    list: Template[],
    isChecked: (item: Template) => boolean
) =>
    list.reduce<CheckboxesObj>((accumulator, item) => {
        accumulator[item.id] = {
            id: item.id,
            name: item.specification.name,
            checked: isChecked(item),
        };
        return accumulator;
    }, {});

export const getDefaultSelected = (checkboxes: CheckboxesObj) => {
    const defaultSelectedTemplates = new Set<number>();
    Object.values(checkboxes).forEach((checkbox) => {
        if (checkbox.checked) {
            defaultSelectedTemplates.add(Number(checkbox.id));
        }
    });
    return defaultSelectedTemplates;
};
