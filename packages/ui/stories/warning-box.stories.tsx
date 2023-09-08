import type { Meta, StoryObj } from "@storybook/react";

import { WarningBox as WarningBoxComponent } from "../src/components/warning-box";
import { Typography } from "../src";
import React from "react";

export default {
    title: "Data display/Warning Box",
    component: WarningBoxComponent,
} as Meta<typeof WarningBoxComponent>;

export const WarningBox: StoryObj<typeof WarningBoxComponent> = {
    args: {
        messages: {
            title: "Warning",
        },
        children: <Typography>Comprehensive warning text</Typography>,
    },
};
