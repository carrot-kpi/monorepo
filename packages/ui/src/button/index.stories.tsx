import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Button as ButtonComponent, CarrotButtonProps } from ".";

export default {
    title: "Input/Button",
    component: ButtonComponent,
} as ComponentMeta<typeof ButtonComponent>;

const Template: Story<CarrotButtonProps> = (props) => (
    <ButtonComponent {...props} />
);

export const Button: Story<CarrotButtonProps> = Template.bind({});
Button.args = {
    children: "Button",
};
