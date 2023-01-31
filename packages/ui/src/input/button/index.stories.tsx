import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { ReactComponent as TickIcon } from "../../assets/tick.svg";
import { Button as ButtonComponent, ButtonProps } from ".";

export default {
    title: "Input/Button",
    component: ButtonComponent,
} as ComponentMeta<typeof ButtonComponent>;

const Template: Story<ButtonProps> = (props) => <ButtonComponent {...props} />;

export const Button: Story<ButtonProps> = Template.bind({});
Button.args = {
    children: "Button",
    icon: TickIcon,
};
