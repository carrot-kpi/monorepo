import React, { useState } from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Select as SelectComponent, SelectOption, SelectProps } from ".";

export default {
    title: "Input/Select",
    component: SelectComponent,
} as ComponentMeta<typeof SelectComponent>;

const Template: Story<SelectProps> = (props: SelectProps) => {
    const [value, setValue] = useState<SelectOption | null>(null);

    return <SelectComponent {...props} value={value} onChange={setValue} />;
};

export const Select: Story<SelectProps> = Template.bind({});
Select.args = {
    label: "Select input",
    placeholder: "Pick an option",
    options: [
        {
            label: "Item 1",
            value: "1",
        },
        {
            label: "Item 2",
            value: 2,
        },
        {
            label: "Item 3",
            value: 3,
        },
        {
            label: "Item 4",
            value: 4,
        },
        {
            label: "Item 5",
            value: 5,
        },
    ],
};
