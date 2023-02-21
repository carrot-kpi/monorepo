import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Switch as SwitchComponent, SwitchProps } from ".";

export default {
    title: "Input/Switch",
    component: SwitchComponent,
} as ComponentMeta<typeof SwitchComponent>;

const Template: Story<SwitchProps> = (props: SwitchProps) => (
    <SwitchComponent {...props} />
);

export const Switch: Story<SwitchProps> = Template.bind({});
Switch.args = {};
