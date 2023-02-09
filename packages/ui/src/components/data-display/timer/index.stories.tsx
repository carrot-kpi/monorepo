import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Timer as TimerComponent, TimerProps } from ".";
import { DAY_MS } from "../../../utils/formatting";

export default {
    title: "Data display/Timer",
    component: TimerComponent,
} as ComponentMeta<typeof TimerComponent>;

const Template: Story<TimerProps> = (props: TimerProps) => {
    return <TimerComponent {...props} />;
};

export const Timer: Story<TimerProps> = Template.bind({});
Timer.args = {
    to: Date.now() + DAY_MS * 2,
};
