import React, { ChangeEvent, useCallback, useState } from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Checkbox as CheckboxComponent, CheckboxProps } from ".";

export default {
    title: "Input/Checkbox",
    component: CheckboxComponent,
} as ComponentMeta<typeof CheckboxComponent>;

const Template: Story<CheckboxProps> = (props: CheckboxProps) => {
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

export const Checkbox: Story<CheckboxProps> = Template.bind({
    label: "Checkbox",
});
