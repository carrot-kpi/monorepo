import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Chip as ChipComponent } from "../src/components/chip";

export default {
    title: "Data display/Chip",
    component: (props) => (
        <div className="cui-flex cui-gap-2">
            <ChipComponent {...props} />
            <ChipComponent {...props} />
        </div>
    ),
} as Meta<typeof ChipComponent>;

export const Chip: StoryObj<typeof ChipComponent> = {
    args: {
        children: "Chip example",
    },
};
