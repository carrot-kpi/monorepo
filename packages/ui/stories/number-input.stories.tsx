import type { Meta, StoryObj } from "@storybook/react";

import { NumberInput as NumberInputComponent } from "../src/components/number-input";

export default {
    title: "Input/Number",
    component: NumberInputComponent,
} as Meta<typeof NumberInputComponent>;

export const Number: StoryObj<typeof NumberInputComponent> = {
    args: {
        variant: "base",
        label: "Number input",
        placeholder: "Number input",
        error: false,
    },
};
