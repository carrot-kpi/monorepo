import React, { ChangeEvent, useCallback, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Checkbox as CheckboxComponent, CheckboxProps } from ".";

export default {
    title: "Input/Checkbox",
    component: CheckboxComponent,
} as Meta<typeof CheckboxComponent>;

const Component = (props: CheckboxProps) => {
    const [checked, setChecked] = useState(false);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }, []);

    return (
        <CheckboxComponent
            {...props}
            checked={checked}
            onChange={handleChange}
        />
    );
};

export const Checkbox: StoryObj<typeof CheckboxComponent> = {
    render: Component,
    args: {
        label: "Checkbox",
    },
};
