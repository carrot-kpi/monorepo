import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
    Select as SelectComponent,
    type SelectOption,
    type SelectProps,
} from "../src/components/select";

export default {
    title: "Input/Select",
    component: SelectComponent,
} as Meta<typeof SelectComponent>;

const Component = (props: SelectProps<SelectOption<number>>) => {
    const [value, setValue] = useState<SelectOption<number> | null>(null);

    return <SelectComponent {...props} value={value} onChange={setValue} />;
};

export const Select: StoryObj<typeof SelectComponent<SelectOption<number>>> = {
    render: Component,
    args: {
        label: "Select input",
        placeholder: "Pick an option",
        options: [
            {
                label: "Item 1",
                value: 1,
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
