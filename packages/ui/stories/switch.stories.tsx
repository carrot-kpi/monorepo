import type { Meta, StoryObj } from "@storybook/react";

import { Switch as SwitchComponent } from "../src/components/switch";

export default {
    title: "Input/Switch",
    component: SwitchComponent,
} as Meta<typeof SwitchComponent>;

export const Switch: StoryObj<typeof SwitchComponent> = { args: {} };
