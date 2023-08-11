import type { Meta, StoryObj } from "@storybook/react";

import { Radio as RadioComponent } from "../src/components/radio";

export default {
    title: "Input/Radio",
    component: RadioComponent,
} as Meta<typeof RadioComponent>;

export const Radio: StoryObj<typeof RadioComponent> = {};
