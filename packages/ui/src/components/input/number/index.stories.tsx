import { Meta, StoryObj } from "@storybook/react";

import { NumberInput as NumberInputComponent } from ".";

export default {
    title: "Input/Number",
    component: NumberInputComponent,
} as Meta<typeof NumberInputComponent>;

export const Number: StoryObj<typeof NumberInputComponent> = {
    args: {
        variant: "md",
        label: "Number input",
        placeholder: "Number input",
        error: false,
    },
};
