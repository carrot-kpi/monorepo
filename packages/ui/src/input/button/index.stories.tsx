import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { ReactComponent as TickIcon } from "../../assets/tick.svg";
import { Button as ButtonComponent, ButtonProps } from ".";

export default {
    title: "Input/Button",
    component: ButtonComponent,
} as ComponentMeta<typeof ButtonComponent>;

const Template: Story<ButtonProps> = (props) => <ButtonComponent {...props} />;

export const Default: Story<ButtonProps> = Template.bind({});
Default.args = {
    children: "just a button",
};

export const WithIcon: Story<ButtonProps> = Template.bind({});
WithIcon.args = {
    children: "Button",
    icon: TickIcon,
    iconPlacement: "left",
};

export const IconOnly: Story<ButtonProps> = Template.bind({});
IconOnly.args = {
    icon: TickIcon,
    size: "xsmall",
};

export const Secondary: Story<ButtonProps> = Template.bind({});
Secondary.args = {
    children: "Secondary",
    variant: "secondary",
    icon: TickIcon,
    size: "xsmall",
};

export const Active: Story<ButtonProps> = Template.bind({});
Active.args = {
    children: "I'm active",
    icon: TickIcon,
    iconPlacement: "left",
    size: "xsmall",
    active: true,
};

export const ActiveSecondary: Story<ButtonProps> = Template.bind({});
ActiveSecondary.args = {
    children: "secondary with active",
    icon: TickIcon,
    iconPlacement: "left",
    size: "xsmall",
    active: true,
};
