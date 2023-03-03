import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { NumberInput as NumberInputComponent, NumberInputProps } from ".";

export default {
    title: "Input/Number",
    component: NumberInputComponent,
} as ComponentMeta<typeof NumberInputComponent>;

const Template: Story<NumberInputProps> = (props: NumberInputProps) => (
    <NumberInputComponent {...props} />
);

export const Number: Story<NumberInputProps> = Template.bind({});
Number.args = {
    variant: "md",
    label: "Number input",
    placeholder: "Number input",
    error: false,
};
