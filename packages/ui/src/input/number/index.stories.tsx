import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { NumberInput as NumberInputComponent, NumberInputProps } from ".";

export default {
    title: "NumberInput",
    component: NumberInputComponent,
} as ComponentMeta<typeof NumberInputComponent>;

const Template: Story<NumberInputProps> = (props: NumberInputProps) => (
    <NumberInputComponent {...props} />
);

export const NumberInput: Story<NumberInputProps> = Template.bind({});
NumberInput.args = {
    size: "md",
    label: "Number input",
    placeholder: "Number input",
};
