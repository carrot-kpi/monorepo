import type { Meta, StoryObj } from "@storybook/react";

import { Loader as LoaderComponent } from "../src/components/loader";

export default {
    title: "Feedback/Loader",
    component: LoaderComponent,
} as Meta<typeof LoaderComponent>;

export const Loader: StoryObj<typeof LoaderComponent> = {
    args: {
        className: "cui-w-24",
    },
};
