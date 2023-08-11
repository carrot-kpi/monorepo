import type { Meta, StoryObj } from "@storybook/react";

import { Timer as TimerComponent } from "../src/components/timer";

export default {
    title: "Data display/Timer",
    component: TimerComponent,
} as Meta<typeof TimerComponent>;

export const Timer: StoryObj<typeof TimerComponent> = {
    args: {
        to: Math.floor(Date.now() + (86_400 * 2) / 1000),
    },
};
