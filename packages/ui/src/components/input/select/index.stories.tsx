import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Select as SelectComponent, SelectOption, SelectProps } from ".";

export default {
    title: "Input/Select",
    component: SelectComponent,
} as Meta<typeof SelectComponent>;

const Component = (props: SelectProps) => {
    const [value, setValue] = useState<SelectOption | null>(null);

    return <SelectComponent {...props} value={value} onChange={setValue} />;
};

export const Select: StoryObj<typeof SelectComponent> = {
    render: Component,
    args: {
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
    },
};
