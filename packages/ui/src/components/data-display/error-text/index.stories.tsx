import type { Meta, StoryObj } from "@storybook/react";

import { ErrorText as ErrorTextComponent } from ".";

export default {
    title: "Data display/Error Text",
    component: ErrorTextComponent,
} as Meta<typeof ErrorTextComponent>;

export const ErrorText: StoryObj<typeof ErrorTextComponent> = {
    args: {
        children: "Error text",
    },
};
